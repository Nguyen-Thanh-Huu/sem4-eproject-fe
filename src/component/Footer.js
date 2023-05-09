import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CopyrightOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MailOutlined,
  PhoneOutlined,
  TwitterSquareFilled,
} from '@ant-design/icons';
import { Col, Row, Spin, Typography } from 'antd';

import { getAllContacts } from '../feature/admin_contact/AdminContactSlice';
import logoImage from '../images/logo.png';

import styles from '../css/Footer.module.css';
const { Title } = Typography;
const Footer = () => {
  const dispatch = useDispatch();
  const contactPairs = useSelector((state) => state.adminContactReducer.contacts);
  React.useEffect(() => {
    dispatch(getAllContacts());
  }, []);

  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };
  const handleClickNews = () => {
    navigate('news');
  };
  const handleClickProduct = () => {
    navigate('product');
    window.scrollTo(0, 0);
  };
  const handleClickFaq = () => {
    navigate('faq');
    window.scrollTo(0, 0);
  };
  const handleClickAboutus = () => {
    navigate('aboutus');
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.footerContainer}>
      <Row className={styles.footerSpace} justify="center">
        <Col span={9}>
          <Row>
            <p>
              <img src={logoImage} style={{ width: '190px', height: '90px' }} />
            </p>
          </Row>
          <Row>
            <p className={styles.footerContent}>
              Copyright <CopyrightOutlined /> 2023 by TEAM
            </p>
          </Row>
          <Row justify="start" gutter={10}>
            <Col>
              <p>
                <a className={styles.footerContent}>Terms</a>
              </p>
            </Col>
            <Col>
              <p>
                <a className={styles.footerContent}>Privacy</a>
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Title level={4} style={{ color: '#FFFFFF' }}>
            Contact
          </Title>
          {contactPairs ? (
            contactPairs.map((pair) => (
              <div key={pair.key}>
                <p className={styles.footerContent}>
                  <PhoneOutlined style={{ fontSize: '15px', color: '#FFFFFF' }} /> {pair.phone}
                </p>
                <p className={styles.footerContent}>
                  <MailOutlined style={{ fontSize: '15px', color: '#FFFFFF' }} /> {pair.email}
                </p>
                <p className={styles.footerContent}>{pair.address + ', ' + pair.district}</p>
                <p className={styles.footerContent}>{pair.city}</p>
              </div>
            ))
          ) : (
            <Row justify="center">
              <Spin size="large" />
            </Row>
          )}
        </Col>
        <Col span={5}>
          <Title level={4} style={{ color: '#FFFFFF' }}>
            Pages
          </Title>

          <p>
            <a onClick={handleClickHome} className={styles.footerContent}>
              Home
            </a>
          </p>
          <p>
            <a onClick={handleClickNews} className={styles.footerContent}>
              News
            </a>
          </p>
          <p>
            <a onClick={handleClickProduct} className={styles.footerContent}>
              Product
            </a>
          </p>
          <p>
            <a onClick={handleClickFaq} className={styles.footerContent}>
              Faq
            </a>
          </p>
          <p>
            <a onClick={handleClickAboutus} className={styles.footerContent}>
              About Us
            </a>
          </p>
        </Col>
        <Col span={4}>
          <Title level={4} style={{ color: '#FFFFFF' }}>
            Follow Us
          </Title>
          <Row gutter={10}>
            <Col>
              <a>
                <FacebookFilled style={{ fontSize: '35px', color: '#076678' }} />
              </a>
            </Col>
            <Col>
              <a>
                <InstagramFilled style={{ fontSize: '35px', color: '#076678' }} />
              </a>
            </Col>
            <Col>
              <a>
                <TwitterSquareFilled style={{ fontSize: '35px', color: '#076678' }} />
              </a>
            </Col>
            <Col>
              <a>
                <LinkedinFilled style={{ fontSize: '35px', color: '#076678' }} />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';

import partner1Image from '../images/home/partner_1.png';
import partner2Image from '../images/home/partner_2.png';
import partner3Image from '../images/home/partner_3.png';
import partner4Image from '../images/home/partner_4.png';

const { Title } = Typography;

//=====Partner Component=====
const PartnerItemComponent = ({ imgurl, title, text }) => {
  return (
    <Card hoverable style={{ backgroundColor: '#faf1e2' }}>
      <img height="150px" width="150px" src={imgurl} />
      <Title
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bolder',
        }}
      >
        {title}
      </Title>
      <p>{text}</p>
    </Card>
  );
};

//=====Partner Component=====
const PartnerComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('product');
  };
  return (
    <div style={{ backgroundColor: '#faf1e2', minHeight: '900px' }}>
      <div align="middle" style={{ margin: 'auto', width: '80%', padding: '10rem 0' }}>
        <Title
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bolder',
            color: '#023a21',
          }}
        >
          PROFESSIONAL PARTNER
        </Title>
        <Row
          style={{
            marginBottom: '5rem',
          }}
        >
          <Col span={6}>
            <img src={partner1Image} />
          </Col>
          <Col span={6}>
            <img src={partner2Image} />
          </Col>
          <Col span={6}>
            <img src={partner3Image} />
          </Col>
          <Col span={6}>
            <img src={partner4Image} />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={12}>
            <div align="left">
              <Title
                style={{
                  color: '#023a21',
                  fontSize: '4rem',
                  fontWeight: 'bolder',
                }}
              >
                QUALITY FOR THE BEST
              </Title>
              <p
                style={{
                  color: '#023a21',
                  fontSize: '1rem',
                }}
              >
                We are an independent wine merchant in beautiful West London with shops in Kew, Chiswick, Richmond Hill
                and Teddington. Trading now for nearly 20 years, we pride ourselves on our customer service delivered by
                our passionate and knowledgeable team of wine experts and enthusiasts.
              </p>
            </div>
            <div align="left">
              <Button
                type="primary"
                size="large"
                onClick={handleClick}
                style={{ background: '#d06539', borderColor: '#d06539' }}
              >
                SHOP NOW
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <Row gutter={20} style={{ margin: '10px' }}>
              <Col span={12}>
                <PartnerItemComponent
                  imgurl={partner1Image}
                  title={'BEST WINEMAKER'}
                  text={'Lorem Ipsum has been the industry standard dummy text ever since the 1500s '}
                />
              </Col>
              <Col span={12}>
                <PartnerItemComponent
                  imgurl={partner2Image}
                  title={'FULL OF TASTE'}
                  text={'When an unknown printer took a galley of type and scrambled it to make a type specimen book. '}
                />
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <PartnerItemComponent
                  imgurl={partner3Image}
                  title={'HIGH QUALITY'}
                  text={
                    ' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.'
                  }
                />
              </Col>
              <Col span={12}>
                <PartnerItemComponent
                  imgurl={partner4Image}
                  title={'FRESH FRUIT'}
                  text={
                    'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages '
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PartnerComponent;

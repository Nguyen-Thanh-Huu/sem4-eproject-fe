import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Typography } from 'antd';

import introHomeImage from '../images/home/vineyard_green_hills_intro.jpg';
import wineIntroImage from '../images/home/wine_intro.png';

import styles from '../css/HomePage.module.css';

const { Title } = Typography;

//=====Render Home Page Introduction Component=====
const IntroductionComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('product');
  };
  return (
    <div>
      <Row
        align="middle"
        style={{
          margin: 'auto',
          backgroundImage: `url(${introHomeImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
          height: '65rem',
        }}
      >
        <Col span={14}>
          <div className={styles.introductionContent}>
            <Title
              style={{
                color: '#faf1e2',
                fontSize: '4rem',
                fontWeight: 'bolder',
              }}
            >
              BEST QUALITY WINE SERVE FOR YOU
            </Title>
            <p
              style={{
                color: '#faf1e2',
                fontSize: '1rem',
              }}
            >
              We are an independent wine merchant in beautiful West London with shops in Kew, Chiswick, Richmond Hill
              and Teddington. Trading now for nearly 20 years, we pride ourselves on our customer service delivered by
              our passionate and knowledgeable team of wine experts and enthusiasts.
            </p>
          </div>
          <div className={styles.introductionButton}>
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
        <Col span={10}>
          <div>
            <img height="620px" width="450px" src={wineIntroImage} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IntroductionComponent;

import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

import statistic1Image from '../images/home/statistic_1.png';
import statistic2Image from '../images/home/statistic_2.png';
import statistic3Image from '../images/home/statistic_3.png';
import statistic4Image from '../images/home/statistic_4.png';
import vineyardImage from '../images/home/vineyard.jpg';

const { Title } = Typography;

//=====Statistics Component=====
const StatisticItemComponent = ({ imgurl, statistic, text }) => {
  return (
    <Card hoverable style={{ backgroundColor: '#023a21', borderColor: '#023a21' }}>
      <img height="100px" width="100px" src={imgurl} />
      <Title
        style={{
          fontSize: '3rem',
          fontWeight: 'bolder',
          color: '#faf1e2',
        }}
      >
        {statistic}
      </Title>
      <p
        style={{
          color: '#faf1e2',
          fontSize: '1rem',
        }}
      >
        {text}
      </p>
    </Card>
  );
};

const StatisticsComponent = () => {
  return (
    <div style={{ backgroundColor: '#023a21', minHeight: '900px' }}>
      <div align="middle" style={{ margin: 'auto', width: '80%', padding: '10rem 0' }}>
        <Title
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bolder',
            color: '#faf1e2',
          }}
        >
          THE WINEMAKING
        </Title>
        <p
          style={{
            color: '#faf1e2',
            marginBottom: '2rem',
          }}
        >
          The brand was formed and developed by the founders love and passion for wine through years of experience and
          attachment to the product. we committed to bringing to the community the best quality, premium, healthy and
          delicate wine products on each meal, table full of closeness and health.
        </p>
        <img width="100%" src={vineyardImage} />
        <Row gutter={50} style={{ marginTop: '2rem' }}>
          <Col span={6}>
            <StatisticItemComponent imgurl={statistic1Image} statistic={'15+'} text={'Year Of Experience'} />
          </Col>
          <Col span={6}>
            <StatisticItemComponent imgurl={statistic2Image} statistic={'900K'} text={'Regular Customer'} />
          </Col>
          <Col span={6}>
            <StatisticItemComponent imgurl={statistic3Image} statistic={'350+'} text={'Worldwide Partner'} />
          </Col>
          <Col span={6}>
            <StatisticItemComponent imgurl={statistic4Image} statistic={'270+'} text={'Wine Store'} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StatisticsComponent;

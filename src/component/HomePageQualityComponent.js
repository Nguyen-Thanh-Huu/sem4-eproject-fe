import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RightCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';

import qualityCustomerImage from '../images/home/quality_customer_intro.png';

const { Title } = Typography;

//=====HomePage Quality Component=====
const QualityForCustomerComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('product');
  };
  return (
    <div style={{ backgroundColor: '#faf1e2', minHeight: '800px' }}>
      <Row align="middle" style={{ margin: 'auto', width: '80%', padding: '5rem 0' }}>
        <Col span={12}>
          <img src={qualityCustomerImage} />
        </Col>
        <Col span={12}>
          <div>
            <Title
              style={{
                fontSize: '3.5rem',
                fontWeight: 'bolder',
              }}
            >
              QUALITY FOR THE BEST CUSTOMER
            </Title>
            <p>
              As one of the first and only brands in the wine import and distribution market, organizes methodical
              classes on wine knowledge and customer care culture in organizations for the entire staff to understand
              the needs of our partners and customers.
            </p>
            <p>
              <RightCircleOutlined /> Support people in extreme need
            </p>
            <p>
              <RightCircleOutlined /> Largest global crowdfunding community
            </p>
            <p>
              <RightCircleOutlined /> Make the world a better place
            </p>
            <p>
              <RightCircleOutlined /> Share your love for community
            </p>
            <Button type="primary" size="large" onClick={handleClick}>
              SHOP NOW
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default QualityForCustomerComponent;

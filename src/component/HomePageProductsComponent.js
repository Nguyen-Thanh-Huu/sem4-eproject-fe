import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Typography } from 'antd';

import otherWineProductImage from '../images/home/other_wine.png';
import redWineProductImage from '../images/home/red_wine.png';
import whiteWineProductImage from '../images/home/white_wine.png';

const { Title } = Typography;

//=====Products Component=====
const ProductItemComponent = ({ imgurl, title }) => {
  return (
    <Card hoverable style={{ backgroundColor: '#023a21', borderColor: '#023a21' }}>
      <img height="420px" width="200px" src={imgurl} />
      <Title
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bolder',
          color: '#faf1e2',
          marginTop: '15px',
        }}
      >
        {title}
      </Title>
    </Card>
  );
};

const ProductsComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('product');
  };
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
          FINELY SERVED
        </Title>
        <p
          style={{
            color: '#faf1e2',
          }}
        >
          The brand was formed and developed by the founders love and passion for wine through years of experience and
          attachment to the product. we committed to bringing to the community the best quality, premium, healthy and
          delicate wine products on each meal, table full of closeness and health.
        </p>

        <Row gutter={50} style={{ marginBottom: '28px' }}>
          <Col span={8}>
            <ProductItemComponent imgurl={redWineProductImage} title={'RED WINE'} />
          </Col>
          <Col span={8}>
            <ProductItemComponent imgurl={whiteWineProductImage} title={'WHITE WINE'} />
          </Col>
          <Col span={8}>
            <ProductItemComponent imgurl={otherWineProductImage} title={'OTHER WINE'} />
          </Col>
        </Row>
        <Button
          type="primary"
          size="large"
          onClick={handleClick}
          style={{ background: '#d06539', borderColor: '#d06539' }}
        >
          LOOK MORE
        </Button>
      </div>
    </div>
  );
};

export default ProductsComponent;

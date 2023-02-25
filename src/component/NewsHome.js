import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Col, Image, Row, Typography } from 'antd';

import { store } from '../app/store';
import { getAllNews } from '../feature/news/NewsSlice';
const { Title } = Typography;

function NewsHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedNews = useSelector((state) => state.newsReducer.news);

  React.useEffect(() => {
    dispatch(getAllNews());
  }, []);

  return (
    <Col style={{ margin: 'auto', width: '80%', marginBottom: '8rem' }}>
      <Row justify="start" style={{ marginTop: '2rem', marginBottom: '0rem' }}>
        <Col>
          <Title
            style={{
              color: 'black',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
            }}
          >
            News
          </Title>
        </Col>
      </Row>

      {/* carousel */}

      <Row>
        <Col span={24}>
          {storedNews.map((news, index) => {
            <div key={index}>
              <p> {news.content}</p>
            </div>;
          })}
        </Col>
      </Row>

      {/* list news */}

      <Row style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        {storedNews.map((news, index) => (
          <Col span={24} key={index}>
            <Row style={{ marginBottom: '-1.2rem' }}>
              <Col span={6}>
                <div style={{ width: '200px', height: '150px' }}>
                  <Image width={240} src={news.image} />
                </div>
              </Col>
              <Col span={18}>
                <Card
                  bordered={false}
                  style={{
                    width: 810,
                    height: 127,
                  }}
                >
                  <Button
                    onClick={() => navigate(news.id)}
                    style={{
                      color: 'black',
                      fontSize: '1rem',
                      fontWeight: 'bolder',
                      display: 'block',
                      marginBottom: '0.2rem',
                      marginTop: '-0.9rem',
                      border: 'none',
                    }}
                  >
                    {news.title}
                  </Button>
                  <div style={{ marginBottom: '0.3rem' }}>
                    <FieldTimeOutlined /> <span> {news.createat} </span>
                  </div>
                  <p>{news.content}</p>
                </Card>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Col>
  );
}

export default NewsHome;

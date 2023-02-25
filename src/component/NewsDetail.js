import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Image, Row, Typography } from 'antd';

import styles from '../css/Project.module.css';

const { Title } = Typography;
import { getNewsById } from '../feature/news/NewsSlice';

const NewsDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const newsDetailItem = useSelector((state) => state.newsReducer.newsDetail);

  React.useEffect(() => {
    dispatch(getNewsById({ id: params.newsId }));
  }, []);

  return (
    <Col style={{ margin: 'auto', width: '80%', marginBottom: '8rem' }}>
      <Row justify="start" style={{ marginTop: '2rem', marginBottom: '0rem' }}>
        <Col>
          <Title
            style={{
              color: '#076678',
              fontSize: '4rem',
              fontWeight: 'bolder',
              textAlign: 'left',
              textShadow: '5px 5px 0px rgba(131,165,152,0.7)',
            }}
          >
            News Detail
          </Title>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        {newsDetailItem && (
          <div>
            <p> {newsDetailItem.content}</p>
          </div>
        )}

        {/* {newsDetailItem.map((item, index) => {
          <Col key={index}>
            <Row>
              <Title
                style={{
                  color: '#076678',
                  fontSize: '2rem',
                  fontWeight: 'bolder',
                  textAlign: 'left',
                }}
              >
                {item.title}
              </Title>
            </Row>
            <Row>
              <Image src={item.image} />
            </Row>
            <Row>{item.content}</Row>
          </Col>;
        })} */}
      </Row>
    </Col>
  );
};

export default NewsDetail;

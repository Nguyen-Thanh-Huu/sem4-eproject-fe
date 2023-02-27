import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Col, Image, Row, Typography } from 'antd';

const { Title } = Typography;

// import { getAllNews } from '../feature/admin_news/AdminNewsSlice';
import { getNewsById } from '../feature/news/NewsSlice';
const NewsDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const newsDetailItem = useSelector((state) => state.newsReducer.newsDetail);
  // const allNews = useSelector((state) => state.adminNewsReducer.news);

  React.useEffect(() => {
    dispatch(getNewsById({ id: params.newsId }));
    // dispatch(getAllNews());
  }, []);
  return (
    <Col style={{ margin: 'auto', width: '60%', marginBottom: '8rem' }}>
      <Row justify="center" align="middle" style={{ marginTop: '2rem' }}>
        {newsDetailItem && (
          <div>
            <Title
              style={{
                color: 'black',
                fontSize: '2rem',
                fontWeight: 'bolder',
                textAlign: 'left',
              }}
            >
              {newsDetailItem.title}
            </Title>
            <p>
              <FieldTimeOutlined />
              <span>{new Date(newsDetailItem.createat).toLocaleString()}</span>
            </p>
            <p>
              Wine is a fermented beverage made from grapes or other fruits, such as apples or berries. The process of
              winemaking involves crushing and pressing the grapes, then fermenting the juice with yeast to convert the
              sugars into alcohol. Different types of wine are produced by using different grape varieties, fermentation
              techniques, and aging methods. Wine has been enjoyed for thousands of years and is an integral part of
              many cultures around the world. It is often associated with celebrations, fine dining, and social
              gatherings. Wine is also known for its health benefits when consumed in moderation, as it contains
              antioxidants and can help lower the risk of heart disease.
            </p>
            <p>{newsDetailItem.content}</p>

            <Image style={{ display: 'block' }} src={newsDetailItem.image} />
          </div>
        )}
      </Row>
    </Col>
  );
};

export default NewsDetail;

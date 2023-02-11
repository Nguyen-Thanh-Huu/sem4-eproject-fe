import React from 'react';
import { Col } from 'antd';

import IntroductionComponent from './HomePageIntroductionComponent';
import PartnerComponent from './HomePagePartnerComponent';
import ProductsComponent from './HomePageProductsComponent';
import QualityForCustomerComponent from './HomePageQualityComponent';
import ReviewComponent from './HomePageReviewComponent';
import StatisticsComponent from './HomePageStatisticsComponent';

//=====Render Home Page=====
const HomePage = () => {
  return (
    <Col span={24}>
      <IntroductionComponent />
      <QualityForCustomerComponent />
      <ProductsComponent />
      <PartnerComponent />
      <StatisticsComponent />
      <ReviewComponent />
    </Col>
  );
};

export default HomePage;

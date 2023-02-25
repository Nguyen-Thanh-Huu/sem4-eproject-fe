import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

// const newsMenu = [{ label: <Link to="/news">Home News</Link>, key: 'newsHome', icon: <HomeOutlined /> }];

const NewsPage = () => {
  return (
    <div style={{ background: 'rgb(250, 241, 226)' }}>
      <Row justify="center" style={{ width: '80%', margin: 'auto' }}>
        <Col span={24}>
          <Content>
            <Outlet />
          </Content>
        </Col>
      </Row>
    </div>
  );
};

export default NewsPage;

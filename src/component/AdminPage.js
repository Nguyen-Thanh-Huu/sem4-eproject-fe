import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  CommentOutlined,
  IdcardOutlined,
  ScheduleOutlined,
  ShopOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

const adminMenu = [
  { label: <Link to="/admin/user">Users</Link>, key: 'user', icon: <TeamOutlined /> },
  { label: <Link to="/admin/product">Products</Link>, key: 'product', icon: <ShopOutlined /> },
  { label: <Link to="/admin/invoice">Invoices</Link>, key: 'invoice', icon: <ScheduleOutlined /> },
  { label: <Link to="/admin/contact">Contact</Link>, key: 'contact', icon: <IdcardOutlined /> },
  { label: <Link to="/admin/faq">Faq</Link>, key: 'faq', icon: <CommentOutlined /> },
  { label: <Link to="/admin/feedback">Feedback</Link>, key: 'feedback', icon: <StarOutlined /> },
  { label: <Link to="/admin/category">Category</Link>, key: 'category', icon: <StarOutlined /> },
  { label: <Link to="/admin/news">News</Link>, key: 'news', icon: <StarOutlined /> },
];

const AdminPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const userRole = localStorage.getItem('userrole');
    if (userRole !== 'admin') {
      navigate('/unauthorized');
    }
  }, []);

  return (
    <Row gutter={16}>
      <Col style={{ backgroundColor: '#001529' }} span={4}>
        <Sider width={240}>
          <Menu theme="dark" items={adminMenu} />
        </Sider>
      </Col>
      <Col span={20}>
        <Content>
          <Outlet />
        </Content>
      </Col>
    </Row>
  );
};

export default AdminPage;

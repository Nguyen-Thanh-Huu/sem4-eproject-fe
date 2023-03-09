import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Image,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';

import { getAllProducts } from '../feature/admin_product/AdminProductSlice';
import { addToCart } from '../feature/cart/CartSlice';
import { getAllCategories } from '../feature/category/CategorySlice';
import { getAllByLeverAlcohol, getAllProductsByCategoryId, getProductByName } from '../feature/product/ProductSlice';

const { Title } = Typography;
const { Search } = Input;

const ProductHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const allCate = useSelector((state) => state.categoryReducer.categories);
  const [alcoholLevel, setAlcoholLevel] = React.useState('all');
  const [categoryId, setCategoryId] = React.useState('');

  React.useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, []);

  const handleAddToCartClick = (product) => {
    dispatch(addToCart(product));
  };

  const filterAlcohol = (e) => {
    setAlcoholLevel(e.target.value);
    dispatch(getAllByLeverAlcohol({ alcoholLevel: e.target.value }));
  };

  const filterProductByCategory = (ex) => {
    setCategoryId(ex.target.value);
    dispatch(getAllProductsByCategoryId({ categoryId: ex.target.value }));
  };

  const handleSearch = (value) => {
    if (value) {
      dispatch(getProductByName({ name: value }));
    } else {
      dispatch(getAllProducts());
    }
  };

  return (
    <div style={{ backgroundColor: '#faf1e2' }}>
      <Col span={24}>
        <Row align="middle" style={{ paddingTop: '3rem', paddingLeft: '5rem' }}>
          <Col span={4}>
            <Title>WINE TIME</Title>
          </Col>
          <Col span={20}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row align="middle" style={{ paddingTop: '2rem', margin: 'auto', width: '47%' }}>
          <Col span={24}>
            <Search
              placeholder="Enter Product Name..."
              allowClear
              onSearch={handleSearch}
              enterButton="Search"
              size="large"
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 40, marginBottom: 40 }}>
          <Col span={6}>
            <Row style={{ marginLeft: '8rem', marginTop: '0.7rem' }}>
              <Col>
                <p>
                  <Title style={{ fontSize: '1rem', display: 'block' }}> Alcohol concentration </Title>
                </p>
                <p>
                  <Radio.Group onChange={filterAlcohol} value={alcoholLevel}>
                    <Space direction="vertical">
                      <Radio value="all"> All products </Radio>
                      <Radio value="3"> Less than 3% </Radio>
                      <Radio value="5"> Less than 5% </Radio>
                      <Radio value="12"> Less than 12% </Radio>
                      <Radio value="15"> Less than 15% </Radio>
                    </Space>
                  </Radio.Group>
                </p>
              </Col>
            </Row>
            <Row style={{ marginLeft: '8rem', marginTop: '0.7rem' }}>
              <Col>
                <p>
                  <Title style={{ fontSize: '1rem', display: 'block' }}> Category </Title>
                </p>
                <p>
                  <Radio.Group onChange={filterProductByCategory} value={categoryId}>
                    <Space direction="vertical">
                      {allCate
                        ? allCate.map((category) => (
                            <Radio key={category.id} value={category.id}>
                              {category.name}
                            </Radio>
                          ))
                        : null}
                    </Space>
                  </Radio.Group>
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <Row align="middle">
              {products ? (
                products.map((product) => (
                  <Col
                    align="middle"
                    span={7}
                    key={product.id}
                    style={{
                      margin: 16,
                      padding: 8,
                      borderRadius: 10,
                      backgroundColor: 'white',
                    }}
                  >
                    <div style={{ minHeight: '100px' }}>
                      <Title level={3} style={{ color: '#023a21', marginTop: 16 }}>
                        {product.name}
                      </Title>
                    </div>

                    <Image height="340px" width="150px" src={product.image} />

                    <Row justify="space-evenly" style={{ marginTop: 16, marginBottom: 16 }}>
                      <Col span={16}>
                        <a
                          onClick={() => navigate(product.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#d06539' }}
                        >
                          Click to view Details
                        </a>
                      </Col>
                    </Row>
                    <Divider />
                    <Row style={{ marginBottom: 16 }}>
                      <Col span={14}>
                        <Title level={4} style={{ color: '#D65D0E' }}>
                          {product.price} USD
                        </Title>
                      </Col>
                      <Col span={10}>
                        <Button
                          block
                          type="primary"
                          shape="round"
                          style={{ background: '#d06539', borderColor: '#d06539' }}
                          onClick={() => handleAddToCartClick(product)}
                        >
                          Add to Cart
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                ))
              ) : (
                <Row justify="center">
                  <Spin size="large" />
                </Row>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default ProductHome;

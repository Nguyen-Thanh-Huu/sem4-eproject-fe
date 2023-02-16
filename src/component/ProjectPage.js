import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Col, Image, Row, Typography } from 'antd';

import { getAllProjects } from '../feature/project/ProjectSlice';
import comingProjectSideImage from '../images/project/coming_project_side_pic.webp';
import finishProjectSideImage from '../images/project/finish_project_side_pic.webp';
import goingProjectSideImage from '../images/project/ongoing_project_sie_pic.webp';

import styles from '../css/Project.module.css';

const { Title } = Typography;

function ProjectPage() {
  const dispatch = useDispatch();
  const storedProjects = useSelector((state) => state.projectReducer.projects);

  React.useEffect(() => {
    dispatch(getAllProjects());
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
            News
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Row>
            <Col span={12}>
              <div style={{ height: '280px' }}>
                <Image
                  width={400}
                  src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                />
              </div>
            </Col>
            <Col span={12}>
              <Card
                bordered={false}
                style={{
                  width: 400,
                  height: 280,
                }}
              >
                <a
                  href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                  style={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '0.2rem',
                    marginTop: '-0.9rem',
                  }}
                >
                  Can diabetics drink wine?
                </a>
                <div style={{ marginBottom: '0.3rem' }}>
                  <FieldTimeOutlined /> <span> 04/10/2023 </span>
                </div>
                <p>
                  Alcohol is relatively high in calories, with no nutritional value. In a 148 ml glass of red wine there
                  are about 128 calories. If drinking too much (several glasses of wine a day) increases calorie intake,
                  there is the potential for weight gain.
                </p>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={12}>
              <div>
                <Image
                  width={200}
                  src="https://i0.wp.com/salt.tikicdn.com/cache/200x280/ts/product/45/67/ea/4f69e969378876b0daf83d84b13bf878.jpg"
                />
              </div>
            </Col>
            <Col span={12}>
              <Card
                bordered={false}
                style={{
                  width: 200,
                  height: 280,
                }}
              >
                <a
                  href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                  style={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '0.2rem',
                    marginTop: '-0.9rem',
                  }}
                >
                  The secret to making wine a meaningful gift during Tet
                </a>
                <div style={{ marginBottom: '0.3rem' }}>
                  <FieldTimeOutlined /> <span> 05/11/2023 </span>
                </div>
                <p>Ripe grapes naturally contain sugar, so during fermentation it is converted into alcohol.</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* list news */}

      <Row justify="center" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <Col span={18}>
          <Row>
            <Col span={24}>
              <Row style={{ marginBottom: '0.1rem' }}>
                <Col span={4}>
                  <div style={{ width: '200px', height: '150px' }}>
                    <Image
                      width={150}
                      src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                    />
                  </div>
                </Col>
                <Col span={20}>
                  <Card
                    bordered={false}
                    style={{
                      width: 750,
                      height: 150,
                    }}
                  >
                    <a
                      href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                      style={{
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.2rem',
                        marginTop: '-0.9rem',
                      }}
                    >
                      Making wine from the vineyard on the old castle terrace
                    </a>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <FieldTimeOutlined /> <span> 06/05/2023 </span>
                    </div>
                    <p>
                      Writer Ernest Hemingway once said, Wine is the most civilized thing in the world and offers a
                      degree of enjoyment greater than anything we can buy in the world.
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ marginBottom: '0.1rem' }}>
                <Col span={4}>
                  <div style={{ width: '200px', height: '150px' }}>
                    <Image
                      width={150}
                      src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                    />
                  </div>
                </Col>
                <Col span={20}>
                  <Card
                    bordered={false}
                    style={{
                      width: 750,
                      height: 150,
                    }}
                  >
                    <a
                      href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                      style={{
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.2rem',
                        marginTop: '-0.9rem',
                      }}
                    >
                      Red wine can relieve respiratory disease
                    </a>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <FieldTimeOutlined /> <span> 23/03/2023 </span>
                    </div>
                    <p>
                      Wine is used a lot in Europe and America and is becoming more and more familiar to Vietnamese
                      people, becoming an indispensable drink in many important events and festivals. Wine is also a
                      gift that more and more people as well as businesses choose to give partners and VIP customers
                      during Tet.
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ marginBottom: '0.1rem' }}>
                <Col span={4}>
                  <div style={{ width: '200px', height: '150px' }}>
                    <Image
                      width={150}
                      src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                    />
                  </div>
                </Col>
                <Col span={20}>
                  <Card
                    bordered={false}
                    style={{
                      width: 750,
                      height: 150,
                    }}
                  >
                    <a
                      href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                      style={{
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.2rem',
                        marginTop: '-0.9rem',
                      }}
                    >
                      Crystal glasses increase the level of wine experience
                    </a>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <FieldTimeOutlined /> <span> 11/08/2023 </span>
                    </div>
                    <p>
                      Giving Tet gifts is an art in communication, so when giving wine, the selection of gift boxes is
                      of special interest to many people. On the market today there are many models of wine gift boxes
                      to meet a variety of budget requirements as well as tastes.
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ marginBottom: '0.1rem' }}>
                <Col span={4}>
                  <div style={{ width: '200px', height: '150px' }}>
                    <Image
                      width={150}
                      src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                    />
                  </div>
                </Col>
                <Col span={20}>
                  <Card
                    bordered={false}
                    style={{
                      width: 750,
                      height: 150,
                    }}
                  >
                    <a
                      href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                      style={{
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.2rem',
                        marginTop: '-0.9rem',
                      }}
                    >
                      A 1,700-year-old bottle of wine can still be drinkable
                    </a>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <FieldTimeOutlined /> <span> 08/02/2023 </span>
                    </div>
                    <p>
                      It can be classic, sophisticated and luxurious wooden box models; are leather boxes with luxury -
                      class style; or lacquer box exudes aristocracy, mystery, increasing the class of the gift.
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ marginBottom: '0.1rem' }}>
                <Col span={4}>
                  <div style={{ width: '200px', height: '150px' }}>
                    <Image
                      width={150}
                      src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                    />
                  </div>
                </Col>
                <Col span={20}>
                  <Card
                    bordered={false}
                    style={{
                      width: 750,
                      height: 150,
                    }}
                  >
                    <a
                      href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                      style={{
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.2rem',
                        marginTop: '-0.9rem',
                      }}
                    >
                      Red wine can relieve respiratory disease
                    </a>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <FieldTimeOutlined /> <span> 04/10/2023 </span>
                    </div>
                    <p>
                      Many stores also support customers to engrave business logos or wishes on request - adding to the
                      thoughtfulness and sophistication, making the gift recipient feel like he has been given a gift of
                      his own design.
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col>
              <div style={{ width: '300px', height: '150px' }}>
                <Image
                  width={250}
                  src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ width: '300px', height: '150px' }}>
                <Image
                  width={250}
                  src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ width: '300px', height: '150px' }}>
                <Image
                  width={250}
                  src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ width: '300px', height: '150px' }}>
                <Image
                  width={250}
                  src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ width: '300px', height: '150px' }}>
                <Image
                  width={250}
                  src="https://tptwinehouse.com/wp-content/uploads/2020/11/ruou-vang-y-vung-Veneto-2.jpg"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default ProjectPage;

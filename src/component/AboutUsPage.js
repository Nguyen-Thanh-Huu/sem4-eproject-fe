import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Carousel, Col, Row, Typography } from 'antd';

import { getAllContacts } from '../feature/admin_contact/AdminContactSlice';
import { getAllAboutUs } from '../feature/AdminAboutUs/AdminAboutUsSlice';
import contactUsImage from '../images/aboutus/contactus.png';
import aboutUsImage from '../images/aboutus/mission.jpg';
import whoWeAreImage from '../images/aboutus/whoweare.jpg';

import styles from '../css/AboutUS.module.css';
const { Title } = Typography;
const AboutUsPage = () => {
  const dispatch = useDispatch();
  const aboutUsPairs = useSelector((state) => state.adminAboutUsReducer.aboutUs);
  const contactPairs = useSelector((state) => state.adminContactReducer.contact);

  React.useEffect(() => {
    dispatch(getAllAboutUs());
  }, []);

  React.useEffect(() => {
    dispatch(getAllContacts());
  }, []);

  return (
    <div style={{ background: 'rgb(250, 241, 226)' }}>
      <Row
        style={{
          backgroundImage: `url(${'https://www.phanphoiruoungoai.com/images/slideshow/slide970_504/di_san_john.jpg'})`,
          height: '555px',
        }}
      ></Row>
      <div className={styles.space}></div>

      {/* introduction branch component    */}
      <Col style={{ margin: 'auto', width: '80%', marginBottom: '8rem' }}>
        <Row>
          <Col span={10} style={{ height: '300px' }}>
            <div>
              <img
                style={{ display: 'block', boxSizing: 'border-box', width: '500px' }}
                src={'https://khoruou.vn/Uploads/images/foloradi.png'}
              />
            </div>
          </Col>
          <Col span={14}>
            <Card
              bordered={false}
              style={{
                height: 292,
                background: '#023a21',
              }}
            >
              <a
                href="https://stackoverflow.com/questions/64944037/how-can-i-add-href-to-icon-for-ant-design"
                style={{
                  color: 'white',
                  fontSize: '3.5rem',
                  fontWeight: 'bolder',
                  display: 'block',
                  marginBottom: '1rem',
                  marginTop: '0.2rem',
                }}
              >
                Brach Introduction
              </a>
              <p style={{ color: 'white' }}>
                Founded in 1883 in Santiago - Chile, since ancient times Concha y Toro has been the favorite wine of the
                aristocracy. Concha y Toro is known as the most famous wine producer and exporter in Latin America and
                is one of the 10 largest famous wine brand companies in the world. The annual sales of this Chilean wine
                brand are more than 33 million cases and are distributed in 135 countries.Casillero del Diablo and Don
                Melchor wines are two of the most famous and internationally recognized wines. Concha y Toro is among
                the most expensive wines in the world, but Vendanges Tardives Sauvignon Blanc 2014 is Concha y Toro
                lowest priced wine at just $13.20.
              </p>
            </Card>
          </Col>
        </Row>

        {/* brach ambassador component  */}
        <Row justify="center" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <Title
            style={{
              color: 'black',
              fontSize: '3.5rem',
              fontWeight: 'bolder',
              textAlign: 'left',
            }}
          >
            Brand Ambassador
          </Title>
        </Row>
        <Row>
          <p>
            While France is bound by rules about the naming system and the mixing of wines is completely banned,
            Australian winemakers place more emphasis on creativity, freedom of experience and creativity. A perfect
            blend of Cabernet Sauvignon and Shiraz. This has made the name of great winemakers such as Max Schubert and
            world famous successful wine brands from Australia such as Penfold, Jacob Creek... This success has inspired
            many winemakers. winery including St Annes Winer At St Winery, we carefully select the finest quality
            vineyards to create superb Shiraz & Cabernet Sauvignon. Then blend these two wines together in a certain
            ratio to create a rich and complex Cabernet Shiraz,” shared a representative of Bluewise Business Advisory.
          </p>
        </Row>
        <Row>
          <Col span={8}>
            <div>
              <img style={{ width: '400px' }} src={'https://wewine.vn/datafiles/images/SEO/ruou-vang-hcm-3.jpg'} />
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                style={{ width: '400px', display: 'inline-block', height: '268px' }}
                src={'https://fwb.com.vn/wp-content/uploads/2020/05/dac-tinh-co-ban-ruou-yeu-thich.jpg'}
              />
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img style={{ width: '400px' }} src={'https://farm1.staticflickr.com/810/41287143141_7da382f598_z.jpg'} />
            </div>
          </Col>
        </Row>

        {/* mission component  */}
        <Row justify="center" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <Title
            style={{
              color: 'black',
              fontSize: '3.5rem',
              fontWeight: 'bolder',
              textAlign: 'left',
            }}
          >
            Mission
          </Title>
        </Row>
        <Row justify="space-around">
          <Col span={7}>
            <Card bordered={false} style={{ height: '300px', background: '#023a21' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bolder', color: 'white' }}> Vision </p>
              <p style={{ color: 'white' }}>
                Becoming the leading prestigious brand in Vietnam in importing and distributing wine nationwide. With
                the presence of showrooms in 64 provinces and cities, mentioning wine is referring to THEKEY WINE.
              </p>
            </Card>
          </Col>
          <Col span={7}>
            <Card bordered={false} style={{ height: '300px', background: '#023a21' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bolder', color: 'white' }}> Core value</p>
              <ul style={{ listStyleType: 'none', color: 'white' }}>
                <li> 1. Passion for customer service</li>
                <li> 2. See yourself as the root of all problems</li>
                <li> 4. Integrity</li>
                <li> 5. Progressive </li>
                <li> 6. Love and support teammatese</li>
              </ul>
            </Card>
          </Col>
          <Col span={7}>
            <Card bordered={false} style={{ height: '300px', background: '#023a21' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bolder', color: 'white' }}> Purpose</p>
              <p style={{ color: 'white' }}>
                THEKEY WINE is committed to bringing to the community the best quality, premium, healthful and delicate
                wine products on each meal, table full of closeness and health.
              </p>
            </Card>
          </Col>
        </Row>

        {/* Carousel image company  */}
        <div className={styles.space}></div>

        <Carousel autoplay>
          <div>
            <h3 className={styles.contentStyle1}></h3>
          </div>
          <div>
            <h3 className={styles.contentStyle2}></h3>
          </div>
          <div>
            <h3 className={styles.contentStyle3}></h3>
          </div>
          <div>
            <h3 className={styles.contentStyle4}></h3>
          </div>
        </Carousel>
      </Col>
    </div>
  );
};

export default AboutUsPage;

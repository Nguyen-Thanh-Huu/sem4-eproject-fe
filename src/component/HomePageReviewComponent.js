import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Input, Typography } from 'antd';

import AvatarImage from '../images/home/avatar.jpg';
import QuotationMarkImage from '../images/home/quotation_mark.png';
import WineVineyardImage from '../images/home/wine_vineyard.jpg';

const { Title } = Typography;

//====Email Input====
const { Search } = Input;
const onSearch = (value) => console.log(value);

//=====Render Home Page Review Component=====
const ReviewComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('aboutus');
  };

  return (
    <div style={{ backgroundColor: '#faf1e2', minHeight: '900px' }}>
      <div align="middle" style={{ margin: 'auto', width: '80%', padding: '10rem 0' }}>
        <Title
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bolder',
            color: '#023a21',
          }}
        >
          TESTIMONIAL
        </Title>
        <img width="100px" src={QuotationMarkImage} />
        <p
          style={{
            color: '#023a21',
            marginBottom: '2rem',
            fontStyle: 'italic',
          }}
        >
          The brand was formed and developed by the founders love and passion for wine through years of experience and
          attachment to the product. we committed to bringing to the community the best quality, premium, healthy and
          delicate wine products on each meal, table full of closeness and health.
        </p>
        <Avatar size={64} src={<img src={AvatarImage} />} />
        <Title
          style={{
            fontSize: '1rem',
            fontWeight: 'bolder',
            marginTop: '1rem',
          }}
        >
          JACK PATRICIA
        </Title>
        <p>Manager</p>
      </div>
      <div
        align="middle"
        style={{
          margin: 'auto',
          backgroundImage: `url(${WineVineyardImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
          height: '65rem',
        }}
      >
        <div align="middle" style={{ margin: 'auto', width: '80%', padding: '7rem 0', backgroundColor: '#023a21' }}>
          <div align="middle" style={{ margin: 'auto', width: '60%', backgroundColor: '#023a21' }}>
            <Title
              style={{
                fontSize: '3.5rem',
                fontWeight: 'bolder',
                color: '#faf1e2',
              }}
            >
              NEWSLETTER
            </Title>
            <p
              style={{
                color: '#faf1e2',
                fontSize: '1rem',
              }}
            >
              We are an independent wine merchant in beautiful West London with shops in Kew, Chiswick, Richmond Hill
              and Teddington. Trading now for nearly 20 years.
            </p>

            <Search placeholder="Email" allowClear enterButton="SIGNUP" size="large" onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;

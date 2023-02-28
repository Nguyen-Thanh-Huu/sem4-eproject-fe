import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Image, Row } from 'antd';

import styles from '../css/Unauthorized.module.css';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <Row style={{ background: '#FAF1E2' }}>
      <div className={styles.main}>
        <p className={styles.content}>
          <span className={styles.first}>401</span>
        </p>
        <p className={styles.not_found}> 401 - Unauthorized </p>
        <div className={styles.note}>This page is not publically available . </div>
        <div className={styles.note}> To access it please login first</div>
        <Button
          type="primary"
          style={{ marginLeft: '43%', marginTop: '1.5rem', display: 'inline-block' }}
          onClick={handleClick}
        >
          Back Home
        </Button>

        <Button type="primary" style={{ marginLeft: '2%', marginTop: '1.5rem' }} onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
    </Row>
  );
};

export default UnauthorizedPage;

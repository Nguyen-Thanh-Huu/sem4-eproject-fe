import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row } from 'antd';

import styles from '../css/PageNotFound.module.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Row style={{ background: '#FAF1E2' }}>
      <div className={styles.main}>
        <p className={styles.content}>
          <span className={styles.first}>404</span>
        </p>
        <p className={styles.not_found}>404 - PAGE NOT FOUND </p>
        <div className={styles.note}>
          The page you are looking for might have been removed had its name change or is temporerily unavaiable
        </div>
        <Button type="primary" style={{ marginLeft: '46%', marginTop: '1.5rem' }} onClick={handleClick}>
          Back Home
        </Button>
      </div>
    </Row>
  );
};

export default PageNotFound;

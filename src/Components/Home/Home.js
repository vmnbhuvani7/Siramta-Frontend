import React from 'react';
import { Row, Col } from 'antd';
import { useHistory } from "react-router-dom";

import mongodb from '../../images/mongodb.png';
import mysql from '../../images/mysql.png';
import PostgreSqlCluster from '../../images/postgreSql.png';

const Home = () => {
  let history = useHistory();

  const onRedirect = (url) => {
    history.push(url)
  }

  return (
    <>
      <Row style={{ marginTop: 20 }}>
        <Col span={2}></Col>
        <Col span={8} onClick={() => onRedirect('/mongodb-cluster')}><img src={mongodb} alt={mongodb} style={{ height: "20%" }} /></Col>
        <Col span={7} onClick={() => onRedirect('/mysql-cluster')}><img src={mysql} alt={mysql} style={{ height: "20%" }} /></Col>
        <Col span={7} onClick={() => onRedirect('/postgreSql-cluster')}> <img src={PostgreSqlCluster} alt={PostgreSqlCluster} style={{ height: "20%" }} /> </Col>
      </Row>
    </>
  );
};

export default Home;
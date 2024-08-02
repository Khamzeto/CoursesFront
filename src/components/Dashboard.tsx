import React from 'react';
import { Card, Col, Row } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Панель управления</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Курсы" bordered={false}>
            Обзор курсов и модулей
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Пользователи" bordered={false}>
            Обзор пользователей и ролей
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Прогресс" bordered={false}>
            Обзор прогресса студентов
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

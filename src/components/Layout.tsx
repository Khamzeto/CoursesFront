import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  EditOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Боковая панель для больших экранов */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="0"
        className="sider-desktop"
      >
        <div
          className="logo"
          style={{
            height: '32px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '16px',
          }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Панель управления</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<EditOutlined />}>
            <Link to="/courses">Редактор курсов</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/users">Управление пользователями</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            <Link to="/progress">Отслеживание прогресса</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <Link to="/settings">Настройки</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Основной контент */}
      <Layout className="site-layout">
        {/* Шапка */}
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-content">
            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item>Главная</Breadcrumb.Item>
              <Breadcrumb.Item>Панель управления</Breadcrumb.Item>
            </Breadcrumb>
            <Button
              className="menu-button"
              type="primary"
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          </div>
        </Header>

        {/* Контент */}
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>

        {/* Футер */}
        <Footer style={{ textAlign: 'center' }}>© 2024 MyApp. Все права защищены.</Footer>
      </Layout>

      {/* Drawer для мобильных устройств */}
      <Drawer title="Меню" placement="left" onClose={onClose} visible={drawerVisible}>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/" onClick={onClose}>
              Панель управления
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<EditOutlined />}>
            <Link to="/courses" onClick={onClose}>
              Редактор курсов
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/users" onClick={onClose}>
              Управление пользователями
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            <Link to="/progress" onClick={onClose}>
              Отслеживание прогресса
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            <Link to="/settings" onClick={onClose}>
              Настройки
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default AppLayout;

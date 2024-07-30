import React, { useState } from 'react';
import { Menu, Dropdown, Button, Layout, Drawer } from 'antd';
import { UserOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Header } = Layout;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleMenuClick = (e) => {
    if (e.key === 'home') {
      navigate('/home'); // Navigate to Home page
    } else if (e.key === 'addproduct') {
      navigate('/addproduct'); // Navigate to Add Products page
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<LoginOutlined />}>
        Login
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px #f0f1f2',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ marginRight: '20px', fontSize: '20px' }}
          />
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>E-commerce</div>
        </div>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Button icon={<UserOutlined />} shape="circle" />
        </Dropdown>
      </Header>

      {/* Drawer for sidebar menu */}
      <Drawer title="Menu" placement="left" onClose={onClose} visible={drawerVisible} width="200px">
        <Menu mode="vertical" onClick={handleMenuClick} style={{ backgroundColor: '#fff' }}>
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="addproduct">Add Products</Menu.Item>
        </Menu>
      </Drawer>

      <style jsx>{`
        @media (min-width: 768px) {
          .ant-menu-horizontal {
            display: flex !important;
          }
        }

        @media (max-width: 767px) {
          .ant-menu-horizontal {
            display: none !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Navbar;

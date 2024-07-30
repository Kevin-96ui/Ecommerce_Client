import React from 'react';
import { Form, Input, InputNumber, Button, Layout, Card, Row, Col } from 'antd';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate

const { Content } = Layout;

const AddProducts = () => {
  const navigate = useNavigate(); // Initialize navigate

  const onFinish = async (values) => {
    try {
      // POST request to add a new product
      await axios.post('http://localhost:5000/product', values);
      navigate('/home'); // Redirect to home page after successful addition
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row justify="center" style={{ width: '100%' }}>
          <Col xs={22} sm={20} md={16} lg={12}>
            <Card
              hoverable
              style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              title="Add New Product"
            >
              <Form
                name="add_product"
                layout="vertical"
                onFinish={onFinish}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="productname"
                      label="Product Name"
                      rules={[{ required: true, message: 'Please input the product name!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="quantity"
                      label="Quantity"
                      rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="description"
                      label="Description"
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                      <Input type="email" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Add Product
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AddProducts;

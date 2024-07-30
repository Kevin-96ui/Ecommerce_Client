import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Layout, Button, Modal, Form, Input, InputNumber } from 'antd';
import Navbar from './Navbar';

const { Content } = Layout;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product'); // Update API URL
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const showModal = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

  const handleEdit = async (values) => {
    try {
      await axios.put(`http://localhost:5000/product/${currentProduct._id}`, values);
      fetchProducts(); // Refresh product list
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={product.productname}
                hoverable
                style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                actions={[
                  <Button type="primary" onClick={() => showModal(product)}>Edit</Button>,
                  <Button type="danger" onClick={() => handleDelete(product._id)}>Delete</Button>,
                ]}
              >
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Email:</strong> {product.email}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {currentProduct && (
        <Modal
          title="Edit Product"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            initialValues={currentProduct}
            onFinish={handleEdit}
            layout="vertical"
          >
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
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Layout>
  );
};

export default Home;

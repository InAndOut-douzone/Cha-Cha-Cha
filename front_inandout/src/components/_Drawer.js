import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const _Drawer = () => {
  const [state1, setState1] = useState(false);

  const showDrawer = () => {
    setState1({
      visible: true,
    });
  };

  const onClose = () => {
    setState1({
      visible: false,
    });
  };

  return (
    <div>
      <div type="primary" onClick={showDrawer}>
      <Link to="/">휴가 등록</Link>
      </div>
      <Drawer
          title="휴가 등록"
          width="40%"
          onClose={onClose}
          visible={state1.visible} 
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                취소
              </Button>
              <Button onClick={onClose} type="primary">
                등록
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="구분"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">휴가</Option>
                    <Option value="mao">출장</Option>
                    <Option value="mao">외출</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="구분2"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">A</Option>
                    <Option value="public">B</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="구분3"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">A</Option>
                    <Option value="tom">B</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="기간 선택"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="사유?"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
    </div>
  );
};

export default _Drawer;
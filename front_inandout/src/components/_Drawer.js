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
                name="leave_type"
                label="휴가 구분"
                rules={[{ required: true, message: '휴가 구분을 선택해주세요' }]}
              >
                <Select placeholder="휴가 구분을 선택해주세요">
                  <Option value="a_leave">연차</Option>
                  <Option value="a_h_leave">오전 반차</Option>
                  <Option value="p_h_leave">오후 반차</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="담당의사"
                rules={[{ required: true, message: '담당의사를 선택해주세요' }]}
              >
                <Select placeholder="담당의사를 선택해주세요">
                  <Option value="private">의사 1</Option>
                  <Option value="public">의사 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="user"
                label="대상"
                // rules={[{ required: true, message: 'Please choose the user' }]}
              >
                {/* 로그인 한사람 이름, 직책 받아오기 */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Number_of_days"
                label="남은 휴가 일수"
                rules={[{ required: true, message: 'Please choose the Number of days' }]}
              >
                {/* 로그인 한사람 이름, 직책 받아오기 */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="dateTime"
                label="기간 선택"
                rules={[{ required: true, message: '기간을 입력해주세요' }]}
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
                label="휴가 사유"
                rules={[
                  {
                    required: true,
                    message: '휴가 사유를 입력해주세요',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="휴가 사유를 입력해주세요" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default _Drawer;
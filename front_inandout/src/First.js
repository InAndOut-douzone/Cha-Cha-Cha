import React from 'react';
import { Layout, Menu, Checkbox, Divider } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['내 일정', '휴가', '출장', '외근'];
const defaultCheckedList = ['내 일정'];

export default function First() {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">프로필</Menu.Item>
        {/* <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="보기 설정">
              <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                모두 보기
              </Checkbox>
              <Divider />
              <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            {/* <Menu.Item key="1">내 일정</Menu.Item>
            <Menu.Item key="2">휴가</Menu.Item>
            <Menu.Item key="3">출장</Menu.Item>
            <Menu.Item key="4">외근</Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="내 정보">
            <Menu.Item key="5">프로필 수정</Menu.Item>
            {/* <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="내 근무">
            <Menu.Item key="9">휴가 등록</Menu.Item>
            <Menu.Item key="10">근무 현황</Menu.Item>
            {/* <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item> */}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          내용
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}
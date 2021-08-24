import React from 'react';
import Highlighter from 'react-highlight-words';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Input, Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import SiteLayout from './SiteLayout';

const data = [
  {
    key: '1',
    name: '이재성',
    position: '간호사',
    hire_date: '0000-00-00',
    use_leave: 5,
    a_leave: 5,
  },
  {
    key: '2',
    name: '김정현',
    position: '간호사',
    hire_date: '0000-00-00',
    use_leave: 5,
    a_leave: 5,
  },
  {
    key: '3',
    name: '김정인',
    position: '간호사',
    hire_date: '0000-00-00',
    use_leave: 5,
    a_leave: 5,
  },
  {
    key: '4',
    name: '안대혁',
    position: '간호사',
    hire_date: '0000-00-00',
    use_leave: 5,
    a_leave: 5,
  },
];

export default class Add_Notice extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        width: '20%',
        ...this.getColumnSearchProps('position'),
      },
      {
        title: 'Hire_date',
        dataIndex: 'hire_date',
        key: 'hire_date',
        ...this.getColumnSearchProps('hire_date'),
        sorter: (a, b) => a.hire_date.length - b.hire_date.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Use_leave',
        dataIndex: 'use_leave',
        key: 'use_leave',
        ...this.getColumnSearchProps('use_leave'),
        sorter: (a, b) => a.use_leave.length - b.use_leave.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'A_leave',
        dataIndex: 'a_leave',
        key: 'a_leave',
        ...this.getColumnSearchProps('a_leave'),
        sorter: (a, b) => a.a_leave.length - b.a_leave.length,
        sortDirections: ['descend', 'ascend'],
      },
    ];
    return (
      <SiteLayout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <br />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
          <Breadcrumb.Item>휴가 관리</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ borderTop: "1px solid #eee" }} />
        <br /><br />
        [휴가 관리 화면]
        <br />
        <Table columns={columns} dataSource={data} />
      </Layout>
      </SiteLayout>
    );
  }
}
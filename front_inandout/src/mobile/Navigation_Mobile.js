import React, { useEffect, useState } from 'react';
import { Menu, Image } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DefaultProfile from '../assets/images/defaultProfile.png';
import Drawer from '../components/_Drawer';
import axios from 'axios';

// import Nstate from '../components/Nstate';
// import { Provider } from 'react-redux';
// import store from '../redux/store';

const { SubMenu } = Menu;

const Navigation = (name) => {

    const role = sessionStorage.getItem('userRole');

    // const [collapsed, setCollapsed] = useState();
    const [user,setUser] = useState();
    const [profileState, setProfileState] = useState();

    // const toggleCollapsed = () => {
    //     setCollapsed(!collapsed)
    // };

    const header = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
        },
      };

    useEffect(()=>{
        axios.get("http://localhost:8080/api/user", header).then(res=>{            
            setUser(res.data);
            setProfileState(!!res.data.profile)
        }).catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // const [openKeys, setOpenkeys] = useState(); //펼쳐져 있을 메뉴
    // sessionStorage.setItem('ok', JSON.stringify(openKeys));
    // const ok2 = JSON.parse(sessionStorage.getItem('ok'));
    // const ok2 = sessionStorage.getItem('ok');
    // const ok = JSON.parse(ok2) || "";

    // const [selectedKeys, setSelectedKeys] = useState(); //키

    return (
        role === "ROLE_ADMIN" ?
            // <Provider store={store}>
            <div>
                {/* <Image style={{ borderRadius: "0%", width: '100%', height: '100%', padding: '10px', marginTop: '-10px' }} */}
                {/* <Image style={{ borderRadius: "70%", width: '100%', height: '100%'}}
                    width={50} height={50}
                    src={profileState ? '/images/'+user.profile : DefaultProfile}
                /> */}
                {/* <div style={{ backgroundColor:'#001529', color:'#fff', marginTop: '-6px', textAlign: 'center' }} className="profile_name">이재성</div> */}
                {/* <div style={{ marginTop: '-6px', textAlign: 'center' }} className="profile_name">{user && user.name}</div> */}

                {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button> */}

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="horizontal"
                    theme="dark"
                    inlineCollapsed={true}
                >
                    {/* <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/"></Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="" >
                        <Menu.Item key="5"><Link to="/mypage">프로필 수정</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<LaptopOutlined />} title="">
                        <Menu.Item key="6"><Drawer /></Menu.Item>
                        <Menu.Item key="7"><Link to="/work">근무 현황</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<FileSearchOutlined />} title="">
                        <Menu.Item key="8"><Link to="/him">의원 정보 수정</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/wtm">근무시간 관리</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<IdcardOutlined />} title="">
                        <Menu.Item key="10"><Link to="/addEmployee">사원 등록</Link></Menu.Item>
                        <Menu.Item key="11"><Link to="/employeeManagement">사원 관리</Link></Menu.Item>
                        <Menu.Item key="12"><Link to="/leaveManagement">휴가 관리</Link></Menu.Item>
                    </SubMenu> */}
                    <SubMenu key="sub6" icon={<NotificationOutlined />} title="">
                        <Menu.Item key="13"><Link to="/addNotice">공지사항 등록</Link></Menu.Item>
                        <Menu.Item key="14"><Link to="/notice">공지사항</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
            // </Provider>
            :
            <div>
                <Image style={{ borderRadius: "0%", width: '100%', height: '100%'}}
                    width={200} height={220}
                    src={profileState ? 'images/'+user.profile : DefaultProfile}
                />
                {/* <div style={{ backgroundColor:'#001529', color:'#fff', marginTop: '-6px', textAlign: 'center' }} className="profile_name">이재성</div> */}
                <div style={{ marginTop: '-6px', textAlign: 'center' }} className="profile_name">{user && user.name}</div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1', 'sub2', 'sub3', 'sub4', '2']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<LaptopOutlined />}>
                        <Link to="/">홈화면</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="내 정보">
                        <Menu.Item key="5"><Link to="/mypage">프로필 수정</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="내 근무">
                        <Menu.Item key="6"><Drawer /></Menu.Item>
                        <Menu.Item key="7"><Link to="/work">근무 현황</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<FileSearchOutlined />} title="의원 정보">
                        <Menu.Item key="8"><Link to="/hi">의원 정보</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/wtm">근무 시간</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2" icon={<LaptopOutlined />}>
                        <Link to="/notice">공지사항</Link>
                    </Menu.Item>
                </Menu>
            </div>
    );
};

export default Navigation;
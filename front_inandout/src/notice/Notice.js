/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import { Layout, Breadcrumb, Descriptions, Button, Modal } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Media from 'react-media';

const Container = styled.div`
    padding: 30px;
    width: 800px;
    height: 80%;
    `;

const Cell = styled.div`
    padding: 5px;
    text-Align: left;
    width: 420px;
    `;
const header = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const Notice = (props) => {

    const { no } = props.match.params;
    const [user, setUser] = useState();
    const [notice, setNotice] = useState({});
    var moment = require('moment');
    const date = moment(notice.regDate).format('YY년 MM월 DD일');
    const [prev, setPrev] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        ab();
        bb();

        setUser(localStorage.getItem('username'));
    }, [no])

    const ab = async () => { // 페이지 로딩시작하면 공지사항 가져오기
        await axios.get("http://localhost:8080/api/notice/" + no, header).then((res) => {
            setNotice(res.data);
            // setHtmlToEditor(`${res.data.contents}`);
            // console.log(notice.user.username);
        })
    }

    const bb = async () => { // 페이지로딩 시작하면 이전글, 다음글 목록 가져오기
        await axios.get("http://localhost:8080/api/notice/prev/" + no, header).then((res) => {
            setPrev(res.data);
        })
    }

    const nextReturn = () => { // 다음글이 없을 경우 처리
        if (prev[1] == null) {
            return (<Cell></Cell>)
        } else {
            return (<Cell><Link to={"/notice/" + prev[1].no}>{prev[1].title}</Link></Cell>);
        }
    }

    const prevReturn = () => { // 이전글이 없을 경우 처리
        if (prev[0] == null) {
            return (<Cell></Cell>)
        } else {
            return (<Cell><Link to={"/notice/" + prev[0].no}>{prev[0].title}</Link></Cell>);
        }
    }

    const isModal = () => { // 삭제버튼 클릭하면 모달 보여줌
        setIsModalVisible(true);
    }

    const handleOk = () => { // 모달 ok  버튼 누를 시 공지사항 삭제
        axios.get("http://localhost:8080/api/notice/delete/" + no, header).then((res) => {

        })
        window.location.href = "/notice";
    }

    const handleCancel = () => { // 모달 취소버튼 누를 시 삭제취소
        setIsModalVisible(false);
    }


    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />
                <Descriptions title="" bordered style={{ padding: '20px 0 20px 0' }}>
                    <Descriptions.Item label="제목" span={4} style={{ width: '100px', textAlign: 'center' }}>
                        <Cell>{notice.title}</Cell>
                    </Descriptions.Item>
                    <Descriptions.Item label="날짜" span={2} style={{ textAlign: 'center' }}>
                        <Cell>{date}</Cell>
                    </Descriptions.Item>
                    <Descriptions.Item label="작성자" span={2} style={{ width: '100px', textAlign: 'center' }}>
                        <Cell>{notice.user && notice.user.name}</Cell>
                    </Descriptions.Item>
                </Descriptions>
                <br />

                <Media query="(max-width: 600px)" render={() =>
                (
                    <>
                       <div dangerouslySetInnerHTML={{__html:notice.contents}}></div>
                    </>
                )}
                />
                <Media query="(min-width: 601px)" render={() =>
                (
                    <Container>
                        <div dangerouslySetInnerHTML={{__html:notice.contents}}></div>
                    </Container>
                )}
                />
                <br /><br /><br />
                <Descriptions title="" bordered>
                    <Descriptions.Item label="이전 글" span={4} style={{ width: '120px', textAlign: 'center' }}>
                        {prevReturn()}
                    </Descriptions.Item>
                    <Descriptions.Item label="다음 글" span={4} style={{ width: '120px', textAlign: 'center' }}>
                        {nextReturn()}
                    </Descriptions.Item>
                </Descriptions>
                <br /><br />
                <div style={{ textAlign: 'center', display: 'inline-block', width: '100%' }}>
                    <Button type='default' style={{ width: '60px' }}><Link to={"/notice/"}>목록</Link></Button>
                    {notice.user && notice.user.username === user ?
                        <div style={{ position: 'absolute', right: '60px' }}>

                            <Media query="(min-width: 601px)" render={() =>
                            (
                                <>
                                    <Button type='default' style={{ width: '60px' }}>
                                        <Link to={"/notice/modi/" + notice.no}>수정</Link></Button>
                                    <Button type='default' style={{ width: '60px' }} onClick={isModal}>삭제</Button>
                                </>
                            )}
                            />

                            <Modal title="delete" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <p>삭제 하시겠습니까?</p>
                            </Modal>
                        </div> : null
                    }
                </div>
            </Layout>
        </SiteLayout>
    );
}
export default Notice;
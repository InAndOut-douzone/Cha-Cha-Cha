import React, { useState } from 'react';
import axios from 'axios';
import SiteLayout from '../SiteLayout';
import styled from 'styled-components'
import { Layout, Breadcrumb, Descriptions, Input, Button, Form } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormItem from 'antd/lib/form/FormItem';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

const Container = styled.div`
    width: 100%;
    height: 80%;
    padding: 30px 10px 10px 100px;
    text-align: -webkit-center;
    .ant-descriptions-item-label{ width:100px };
    .ant-form-horizontal { width:1000px };
    `;

const header = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const MyBlock = styled.div`
  .wrapper-class {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editorClassName {
    height: 400px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
  }
  .rdw-fontsize-dropdown{
    width:50px;
  }
`;

const Add_Notice = () => {

    const baa = (value) => {        
        // editorState의 현재 contentState 값을 원시 JS 구조로 변환시킨뒤, HTML 태그로 변환시켜준다.
        console.log("onEditorStateChange : " +  draftToHtml(convertToRaw(editorState.getCurrentContent())));

        let notice = {
            title: value.title,
            contents: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        console.log(notice);
        axios.post("http://localhost:8080/api/notice/add", notice, header).then((res) => {
            console.log(res);
            window.location.href="/notice";
        }).catch((err) => {alert("이미지를 올릴 수 없습니다.")})
        
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        
        // editorState에 값 설정
        setEditorState(editorState);

    };

    // 처음 데이터 설정
    // const htmlToEditor = `<p><span style="color: rgb(209,72,65);"><strong>ㅁㄴㅇㅇㅇㅇ'</strong></span></p>
    // <p>ㅁㄴㅇㅁㅁㄴㅇㅇㄴㅁㅇㄹㄹㄹㅁㅁㅁㅇㄹㄹㄹ</p>
    // <p>ㄻㄴㅇㄻㄴㅇㄹ</p>`;

    // useEffect(() => {
    //     const blocksFromHtml = htmlToDraft(htmlToEditor);
    //     if (blocksFromHtml) {
    //       const { contentBlocks, entityMap } = blocksFromHtml;
    //       // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
    //       const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //       // ContentState를 EditorState기반으로 새 개체를 반환.
    //       // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
    //       const editorState = EditorState.createWithContent(contentState);
    //       setEditorState(editorState);
    //     //   setDd(editorState);
    //     }
    //   // 처음 마운트 됐을때만 실행되야 된다.
    //   // eslint-disable-next-line
    //   },[]);

    const DIV = styled.div`
    .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    }
    label {
        width: 100px;
    }
`
    return (
        <SiteLayout>
            <DIV>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항</Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항 등록</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />
                <div style={{ textAlign: "center" }}>
                    공지사항 등록 화면입니다. 공지사항 작성 시 좌측 상단에 스크롤 됩니다.<br />
                    ( 공지사항은 의사 또는 권한이 관리자인 사람만 작성할 수 있습니다. )
                    <br /><br />
                </div>

                <Container>
                    <Form onFinish={baa} style={{textAlign:'center'}}>
                        <Descriptions title="" column={1} bordered size='small' style={{textAlign:'left'}}>
                            <Descriptions.Item label="제목" style={{textAlign:'center'}}>
                                <FormItem name="title" style={{margin:'0'}}>
                                    <Input placeholder="제목을 작성해주세요."/>
                                    {/* <Input name='title' onChange={titleHandler} style={{ width: '100%'}} /> */}
                                </FormItem>
                            </Descriptions.Item>
                            <Descriptions.Item label="내용" style={{textAlign:'center'}}>
                                <MyBlock>
                                    {/* react-draft-wysiwyg (What You See Is What You Get)*/}
                                    <Editor
                                        placeholder="내용을 작성해주세요."
                                        // 한국어 설정
                                        localization={{
                                            locale: 'ko',
                                        }}
                                        // 툴바 설정
                                        // toolbar={{
                                        //     // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                                        //     list: { inDropdown: false },
                                        //     textAlign: { inDropdown: false },
                                        //     link: { inDropdown: false },
                                        //     history: { inDropdown: false },
                                        // }} 
                                        editorState={editorState} // 에디터 상태 false
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                </MyBlock>
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Button type='default' htmlType='submit' >등록</Button>
                    </Form>
                </Container>
            </Layout>
            </DIV>
        </SiteLayout>
    );
}
export default Add_Notice;
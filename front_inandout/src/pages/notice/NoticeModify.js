/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SiteLayout from '../SiteLayout';
import styled from 'styled-components'
import { Layout, Breadcrumb, Descriptions, Button, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormItem from 'antd/lib/form/FormItem';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

    

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

const NoticeModify = (props) => {

    const { no } = props.match.params;
    const [title, setTitle] = useState();
    // const [contents, setContents] = useState();
    const [noti, setNoti] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/"+no, header).then((res)=>{
            setNoti(res.data);
            setTitle(res.data.title);
            // setContents(res.data.contents);

            const htmlToEditor = `${res.data.contents}`;
        
            const blocksFromHtml = htmlToDraft(htmlToEditor);
            if (blocksFromHtml) {
            const { contentBlocks, entityMap } = blocksFromHtml;
            // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            // ContentState를 EditorState기반으로 새 개체를 반환.
            // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
            }
            })
    },[])

    // const titleHandler = (e) => {
    //     e.preventDefault();
    //     setTitle(e.target.value);
    // }

    // const contentsHandler = (e) => {
    //     e.preventDefault();
    //     setContents(e.target.value);
    // }

    const update = (value) => {

        let notice = {
            title: title,
            contents: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            regDate: noti.regDate
        }
        
        axios.post("http://localhost:8080/api/notice/update/"+no, notice, header).then((res) => {
            alert("수정 하였습니다.")
        });
        // window.location.href="/notice/"+no;
    }


    // useEffect(() => {
    
    //     // 처음 데이터 설정
    //     const htmlToEditor = `${contents}`;

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
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        
        // editorState에 값 설정
        setEditorState(editorState);

    };

    const titleChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항</Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항 수정</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />

                <Container>
                    <Form onFinish={update} style={{textAlign:'center'}}>
                        <Descriptions title="공지사항 수정" column={1} bordered size='small' style={{textAlign:'left'}}>
                            <Descriptions.Item label="제목" style={{textAlign:'center'}}>
                                <FormItem style={{margin:'0'}}>
                                    <Input name='title' value={title} onChange={titleChange} placeholder="제목을 작성해주세요." />
                                    {/* <input name='title' onChange={titleHandler} style={{ width: '100%' }} defaultValue={title} /> */}
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
                                {/* <FormItem style={{margin:'0'}}>
                                    <textarea name='contents' onChange={contentsHandler}
                                    style={{ height: '400px',width:'100%'}} defaultValue={contents}/>
                                </FormItem> */}
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Button type='default' htmlType='submit' >수정</Button>
                    </Form>
                </Container>
            </Layout>
        </SiteLayout>
    );
}
export default NoticeModify;
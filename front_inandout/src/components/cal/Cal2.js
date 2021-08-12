import React from 'react';
import { Calendar, Badge } from 'antd';
import '../../assets/css/Cal.css';
import { useHistory } from "react-router-dom";

function getListData(value) {
    let listData;
    console.log(123,value.month());
    if(value.month() === 7 && value.date() === 8){
        listData = [
        { type: 'warning', content: '김정현 휴가', no: 1, color:"#fce876" },
        { type: 'success', content: '김정인 일정', no: 2, color:"#90A9FF" },
        { type: 'error', content: '이재성 일정', no: 3, color:"#E6F7FF" }
        
        ];
        return listData || [];
    } else if(value.month() === 7 && value.date() === 9){
      listData = [
        { type: 'default', content: '안대혁 일정', no: 4, color:"#fce876" },
        { type: 'processing', content: '이재성 일정', no: 5, color:"#fce876" },
      ];
      return listData || [];
    } 
    
    else if(value.month() === 7 && value.date() === 14){
      listData = [
        { type: 'default', content: '안대혁 일정', no: 4, color:"#fce876" },
        { type: 'processing', content: '이재성 일정', no: 5, color:"#FCE876" },
      ];
      return listData || [];
    } else {

    }

    // switch (value.date()) {
    //   case 8:
    //     listData = [
    //       { type: 'warning', content: '김정현 휴가', no: 1 },
    //       { type: 'success', content: '김정인 일정', no: 2 },
    //       { type: 'error', content: '이재성 일정', no: 3 },
    //       { type: 'default', content: '안대혁 일정', no: 4 },
    //       { type: 'processing', content: '이재성 일정', no: 5 },
    //     ]; break;
    //   case 9:
    //     listData = [
    //       { type: 'warning', content: '김정현 휴가' },
    //       { type: 'success', content: '김정인 일정' },
    //     ]; break;
    //   case 10:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'success', content: 'This is usual event.' },
    //       { type: 'error', content: 'This is error event.' },
    //     ]; break;
    //   case 15:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event' },
    //       { type: 'success', content: 'This is very long usual event。。....' },
    //       { type: 'error', content: 'This is error event 1.' },
    //       { type: 'error', content: 'This is error event 2.' },
    //       { type: 'error', content: 'This is error event 3.' },
    //       { type: 'error', content: 'This is error event 4.' },
    //     ]; break;
    //   default:
    // }
    // return listData || [];
  }


  

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    console.log("monthCellRender 실행 : " + num);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

const Cal2 = () => {

  const select = () => {

    history.replace("/");
    console.log(1111);
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    
    return (
      <ul className="events">
        {
          listData && listData.map(item => (
            <li onClick={select} key={item.no}>
              <Badge style={{}} status={item.type} text={item.content} />
            </li>
          ))
        }
      </ul>
    );
  }
  
  const history = useHistory();
    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    );
};



export default Cal2;
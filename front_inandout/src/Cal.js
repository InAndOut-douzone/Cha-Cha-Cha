import React, { useState } from 'react';
import { Calendar } from 'antd';
import './assets/css/Cal.css';
import locale from "antd/es/calendar/locale/ko_KR";

const Cal = () => {

    const [state, setState] = useState(false);

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }
    const select = (e) => {
        console.log(e);
        setState(!state);
    }

    const change = (value, mode, e) => {
        console.log(66,value.date());
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    function getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: '김정현 휴가' },
              { type: 'success', content: '김정인 일정' },
              { type: 'error', content: '김정인 일정' },
              { type: 'default', content: '김정인 일정' },
              { type: 'processing', content: '김정인 일정' },
            ]; break;
          default:
        }
        return listData || [];
      }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {
              listData.map(item => (
                <li key={item.content}>
                  <div style={{backgroundColor:"red"}}>12</div>
                </li>
              ))
            }
          </ul>
        );
      }
  
    return (
        <div style={{display:'flex'}}>
            <div>  
                <Calendar
                    locale={locale} 
                    dateCellRender={dateCellRender} 
                    onChange={change} 
                    onSelect={select} 
                    onPanelChange={onPanelChange} />
            </div>
            
            {
                state &&    
                    <div style={{backgroundColor: 'blue', width: '3000px'}}>
                        일정 등록창 
                    </div>
            }
        </div>
    );
};

export default Cal;
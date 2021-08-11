import React, { useState } from 'react';
import { Calendar } from 'antd';
import './assets/css/Cal.css';

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
  


    return (
        <div style={{display:'flex'}}>
            <div>  
                <Calendar dateCellRender={(date) => <div style={{backgroundColor: "red"}}>12</div>} onChange={change} onSelect={select} onPanelChange={onPanelChange} />
            </div>
            
            {
                state &&    
                    <div style={{backgroundColor: 'blue', width: '700px'}}>
                        일정 등록창 
                    </div>
            }
        </div>
    );
};

export default Cal;
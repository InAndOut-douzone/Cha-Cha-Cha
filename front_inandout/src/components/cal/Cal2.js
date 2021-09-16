import React, { useEffect, useState } from 'react';
import { Calendar, Badge } from 'antd';
import '../../assets/css/Cal.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

// function onChange(e) {
//   console.log(`checked = ${e.target.checked}`);
// }

// function getMonthData(value) {
//   if (value.month() === 8) {
//     return 1394;
//   }
// }

// function monthCellRender(value) {
//   const num = getMonthData(value);
//   console.log("monthCellRender 실행 : " + num);
//   return num ? (
//     <div className="notes-month">
//       <section>{num}</section>
//       <span>Backlog number</span>
//     </div>
//   ) : null;
// }

const Cal2 = () => {

  const header = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
      "Content-Type": "application/json; charset=utf-8"
    },
  };

  const [holidays, setHolidays] = useState([]);

  useEffect(()=>{
    holidayAll();
  },[])

  const holidayAll = async () => {
    await axios.get("http://localhost:8080/api/holiday/all",header).then(res => {console.log(res.data); setHolidays(res.data);}).catch(err => {});
  }

  const select = () => {

    history.replace("/");
    console.log(1111);
  }

  function dateCellRender(value) {
    let listData;
    for(let i = 0; i < holidays.length; i++){
      if(value.month()+"" === moment(holidays[i]).format("M") && "0"+value.date()+"" === moment(holidays[i]).format("DD")) {
        return (
          <ul className="events">
              <li key={holidays[i].no}>
                <Badge style={{}} type="warning" text={holidays[i].content} />
              </li>
        </ul>
        )
        
      }
    }
  }
  
  // function getListData(value) {
  //   return asdf(value)
  //   // console.log(holidays.length);
  //   // for(let i = 0; i < holidays.length; i++){
  //   //   // console.log(444,value.month())
  //   //   // console.log(555,value.date())
  //   //   // console.log(666,moment(holidays[0]).format("M"))
  //   //   // console.log(777,moment(holidays[0]).format("DD"))
  //   //   // console.log(888,value.month()+"" === moment(holidays[0]).format("M"))
  //   //   // console.log("0" + 999,value.date()+"" === moment(holidays[0]).format("DD"))
  //   //   if(value.month()+"" === moment(holidays[i]).format("M") && "0"+value.date()+"" === moment(holidays[i]).format("DD")) {
  //   //       console.log(444,value.month())
  //   //       console.log(555,value.date())
  //   //       console.log(666,moment(holidays[i]).format("M"))
  //   //       console.log(777,moment(holidays[i]).format("DD"))
  //   //       console.log(888,value.month()+"" === moment(holidays[0]).format("M"))
  //   //       console.log(999,"0"+value.date()+"" === moment(holidays[0]).format("DD"))
  //   //     listData = [
  //   //       { type: 'warning', content: holidays[i].content, no: holidays[i].no, color: "#fce876" },
  //   //     ];
  //   //   return listData || [];
  //   //   }
  // }


  const history = useHistory();
  return (
    <>
      {/* <Checkbox onChange={onChange}>내 일정</Checkbox>
      <Checkbox onChange={onChange}>휴가</Checkbox>
      <Checkbox onChange={onChange}>출장</Checkbox>
      <Checkbox onChange={onChange}>외근</Checkbox> */}
      <Calendar dateCellRender={dateCellRender} />
    </>
  );
};



export default Cal2;
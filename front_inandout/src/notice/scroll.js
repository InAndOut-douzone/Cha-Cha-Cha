import React from 'react';
import { Card } from 'antd';
import '../assets/css/scroll.css';

const Scroll = () => {
  return (
    <div>
      <Card style={{ width: 450, height:40 }}>
        <div className='animation'>
          <ul>
            <li>
              <p>11111111111</p>
            </li>

            <li>
              <p>222222222222</p>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Scroll;
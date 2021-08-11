import React from 'react';
import { Progress } from 'antd';

const Work = () => {
    return (
        <div>
            [근무 현황 화면]
            <br />
            {/* <Progress type="circle" percent={25} format={percent => `${percent} Days`} />
            <Progress type="circle" percent={100} format={() => 'Done'} /> */}
            <Progress
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={99.9}
            />
            <Progress
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }}
                percent={99.9}
                status="active"
            />
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={90}
            />
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={100}
            />
        </div>
    );
};

export default Work;
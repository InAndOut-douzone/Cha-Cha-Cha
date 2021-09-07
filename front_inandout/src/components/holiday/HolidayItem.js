import React from 'react';
import moment from 'moment';

const HolidayItem = (props) => {
    const { content, holiday } = props.holiday;
    
    return (
        <div>
            {moment(holiday).format("yyyy MM")} : {content}
        </div>
    );
};

export default HolidayItem;
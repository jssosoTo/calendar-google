import React from 'react'
import { Link } from 'react-router-dom'

const LastMonthDay = ({
    tempYear, 
    thisMonth, 
    today, 
    weekDates, 
    num, 
    setQueryDate, 
    todayClass, 
    selectClass,
}) => {
    return (
        <div className='day-container'>
            <h4 className='show-week'>周{weekDates[num]}</h4>
            <h4 className='show-day'>
                <Link
                    to='/day'
                    className={`show-date ${todayClass} ${selectClass}`}
                    onClick={() => setQueryDate(tempYear, thisMonth - 1, today, true, true)}
                >{today}</Link>
            </h4>
        </div>
    )
}

export default LastMonthDay

import React from 'react'
import { Link } from 'react-router-dom'

const NextMonthDay = ({
    tempYear, 
    thisMonth, 
    today, 
    num, 
    setQueryDate, 
    todayClass, 
    selectClass,
    firstWeekDay,
    thisMonthDays
}) => {
    return (
        <div className='day-container'>
            <h4 className='show-day'>
                <Link
                    to='/day'
                    className={`show-date ${num === (firstWeekDay + thisMonthDays) && 'month-day'} ${todayClass} ${selectClass}`}
                    onClick={() => setQueryDate(tempYear, thisMonth + 1, today, true)}
                >
                    {num === (firstWeekDay + thisMonthDays) ? `${thisMonth + 1}月${today}日` : today}
                </Link>
            </h4>
        </div>
    )
}

export default NextMonthDay

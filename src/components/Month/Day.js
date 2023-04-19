import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../Providers/AppProvider'
import DetailList from '../Year/DetailList/DetailList';
import { Link } from 'react-router-dom';

const Day = ({
    tempYear, 
    thisMonth, 
    today, 
    weekDates, 
    num, 
    setQueryDate, 
    todayClass, 
    selectClass,
    firstWeekDay
}) => {
    const {lists, switchListDetailCard, filters} = useGlobalContext();
    const [thisDayList, setThisDayList] = useState([]); 

    const init = () => {
        const filterList = lists.filter(item => tempYear === item.year && thisMonth === item.month && today === item.day);
        const filterDatesList = filterList.filter(item => filters.find(select => select.id === item.type).checked);
        
        setThisDayList(filterDatesList);
    };

    useEffect(() => {
        init();
    }, [lists, today, filters])

    return (
        <div className='day-container'>
            {num < 7 && <h4 className='show-week'>周{weekDates[num]}</h4>}
            <h4 className='show-day'>
                <Link
                    to='/day'
                    className={`show-date ${num === firstWeekDay && 'month-day'} ${todayClass} ${selectClass}`}
                    onClick={() => setQueryDate(tempYear, thisMonth, today)}
                >
                    {num === firstWeekDay ? `${thisMonth}月${today}日` : today}
                </Link>
            </h4>
                {
                    thisDayList.slice(0, 2).map(item => {
                        return (
                            <div style={{width: '100%', position: 'relative'}} key={item.id} >
                                <div 
                                    className={`single-list-container ${item.isDetailOpen && 'selected-list'}`}
                                    onClick={() => switchListDetailCard(item.id)}
                                    // onClick={() => switchListDetailCard(item.id)}
                                >
                                    <span className={`${item.type}-circle`}></span>
                                    <h4 className='list-content'>
                                        <span className={`time-modal-show ${item.finish ? 'complete-state' : ''}`}>{item.time}</span>
                                        <span className={`list-content-show ${item.finish ? 'complete-state' : ''}`}>
                                            {
                                                item.content.length > 7 ? `${item.content.slice(0, 7)}...` : item.content
                                            }
                                        </span>
                                    </h4>
                                    
                                </div>
                                {item.isDetailOpen && <DetailList {...item} />}
                            </div>
                        )
                    })
                }
                {
                    thisDayList.length > 2 && (
                        <Link
                            to='/day'
                            className='single-list-container more-list'
                            onClick={() => setQueryDate(tempYear, thisMonth, today)}
                        >还有{thisDayList.length - 2}项</Link>
                    )
                }
        </div>
    )
}

export default Day

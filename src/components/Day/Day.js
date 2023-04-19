import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import Time from './Time';
import Remind from './Remind';

const Day = () => {
    const {
        timer, 
        clickQueryDate: {
            queryYear,
            queryMonth,
            queryDay,
            queryWeekDay,
        },
        date: {
            tempYear,
            thisMonth,
        }
    } = useGlobalContext();
    const weekDates = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const {lists, filters} = useGlobalContext();
    const [thisDayList, setThisDayList] = useState([]);
    const [wholeDayList, setWholeDayList] = useState([]);
    const [isHiding, setIsHiding] = useState(true);

    const init = () => {
        const filterList = lists.filter(item => queryYear === item.year && queryMonth === item.month && queryDay === item.day);
        const wholeList = filterList.filter(item => item.time === '全天');

        const filterRemindList = wholeList.filter(item => filters.find(select => select.id === item.type).checked);
        const filterDatesList = filterList.filter(item => filters.find(select => select.id === item.type).checked);
        
        setWholeDayList(filterRemindList);
        setThisDayList(filterDatesList);
    };
    const openRemindCard = () => {
        setIsHiding(false);
    };
    const closeRemindCard = () => {
        setIsHiding(true);
    };

    useEffect(() => {
        init();
        console.log(queryYear, queryMonth, queryDay);
    }, [lists, queryYear, queryMonth, queryDay, filters])

    return (
        <Wrapper>
            <div className='day-container'>
                <div className='show-day-event'>
                    <div className='exact-day'>
                        <span className='time-zone'></span>
                        <div className='day-date-container'>
                            <h6 className='show-week-day'>{weekDates[queryWeekDay]}</h6>
                            <span className='day-date'>{queryDay}</span>
                        </div>
                    </div>
                    <div className='list-container'>
                        <span className='time-zone'>GMT+08</span>
                        <div className='show-list-container'>
                            { wholeDayList.length > 0 && (
                                <>
                                    <div 
                                        className='whole-day-remind'
                                        onClick={openRemindCard}
                                    >
                                        {wholeDayList.length} 条提醒
                                    </div>
                                    {!isHiding && <Remind closeRemindCard={closeRemindCard} wholeDayList={wholeDayList} />}
                                </>
                            ) }
                        </div>
                    </div>
                </div>
                <div className='show-time-container'>
                    {
                        timer.map((time, i) => {
                            return <Time key={i} thisDayList={thisDayList} time={time} />
                        })
                    }
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    .show-time-container::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    .show-time-container::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /*定义滑块
    内阴影+圆角*/
    .show-time-container::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    .show-time-container:hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    .day-container {
        display: flex;
        flex-flow: column wrap;
        width: 100%;
        height: 100%;
    }
    .show-day-event {
        min-height: 5.5rem;
        border-bottom: 1px solid lightgray;
    }
    .list-container,
    .exact-day {
        display: flex;
    }
    .time-zone {
        font-size: 12px;
        color: gray;
        text-align: center;
        width: 4.5rem;
    }
    .list-container {
        margin-top: .5rem;
    }
    .list-container .time-zone {
        border-right: 1px solid lightgray;
    }
    .list-container .show-list-container {
        width: calc(100% - 4.5rem);
    }
    .exact-day {
        height: 4.5rem;
    }
    .show-week-day,
    .day-date {
        width: 3rem;
    }
    .show-week-day {
        height: 1.5rem;
        line-height: 2rem;
        text-align: center;
        color: #1A73E8;
    }
    .day-date-container {
        padding: 5px 0px 0px 10px;
    }
    .day-date {
        font-size: 23px;
        display: block;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        border-radius: 50%;
        color: white;
        background-color: rgb(26,115,232);
    }
    .whole-day-remind {
        cursor: pointer;
        color: white;
        border-radius: 5px;
        padding: 0 1rem;
        font-size: 13px;
        background: rgb(63, 81, 181);
    }
    .show-time-container {
        flex: 1;
        overflow: auto;
    }
    .time-list-container {
        position: relative;
        display: flex;
        height: 3.5rem;
    }
    .time-list-container .time-zone {
        border-right: 1px solid lightgray;
    }
    .this-time-list-container {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        flex: 1;
        border-left: 1px solid lightgray;
        border-top: 1px solid lightgray;
    }
    .single-list {
        cursor: pointer;
        flex: 1;
        min-width: 24%;
        color: white;
        width: 100%;
        height: 49%;
        line-height: calc(3.5rem * 0.5);
        border-radius: 5px;
        padding: 0 1rem;
        letter-spacing: .2rem;
        font-size: 13px;
        margin-right: 2px;
        margin-bottom: 1px; 
    }
    .task-type {
        background-color: rgb(212,62,4);
    }
    .remind-type {
        background: rgb(63, 81, 181);
    }
    .activity-type {
        background: rgb(24,90,188);
    }
    .translate-card {
        left: 50%;
        transform: translateX(-50%);
    }
    .complete-state {
        text-decoration: line-through;
    }
`;

export default Day

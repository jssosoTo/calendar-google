import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import DetailList from '../Year/DetailList/DetailList';
import { Link } from 'react-router-dom';

const Day = ({year, month, day, toyear, tomonth, today, lists, weekDates}) => {
    const { switchListDetailCard, setQueryDate } = useGlobalContext();
    const [weekday, setWeekday] = useState(0);
    const [showBlue, setShowBlue] = useState('');

    useEffect(() => {
        if (year === toyear && tomonth === month && day === today) {
            setShowBlue('show-blue');
        } else {
            setShowBlue('');
        }
    }, [year, month, day, toyear, tomonth, today])

    return (
        <Wrapper>
            <div className='current-date-container'>
                <div className='date-container'>
                    <Link 
                        to='/day'
                        className={`date-day ${showBlue}`}
                        onClick={() => setQueryDate(year, month, day)}
                    >{day}</Link>
                    <div className='month-week-container'>
                        <h6 className={`date-month ${showBlue}`}>{month}月</h6>
                        <h6 className={`date-week ${showBlue}`}>{weekDates[weekday]}</h6>
                    </div>
                </div>
                <div className='lists-container'>
                    {
                        lists.map((list, i) => {
                            return (
                                <div
                                    key={i}  
                                    style={{position: 'relative'}}
                                >
                                    <div 
                                        className={`single-list-container ${list.isDetailOpen && 'selected-list'}`}
                                        onClick={() => switchListDetailCard(list.id)}
                                    >
                                        <span className={`${list.type}-type-circle`}></span>
                                        <h6 className={`show-time ${list.finish && 'complete-state'}`}>{list.time}</h6>
                                        <h6 className={`show-title ${list.finish && 'complete-state'}`}>{list.content}</h6>
                                    </div>
                                    {list.isDetailOpen && <DetailList {...list} />}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .lists-container {
        position: relative;
    }
    .translate-card {
        left: 70%;
    }
    .selected-list {
        box-shadow: 0 4px 10px 5px rgba(100, 100, 100, .5);
    }
    .complete-state {
        text-decoration: line-through;
    }
    .date-container>.show-blue {
        background-color: rgb(26,115,232);
        color: white;
    }
    .date-container>.show-blue:hover {
        background-color: rgba(26,115,232, .8);
    }
    .month-week-container .show-blue {
        color: #1A73E8;
    }
`;

export default Day

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import ListCard from './ListCard';

const Month = ({thisYear, year, thisMonth, month, today}) => {
    const weekDates = ['日', '一', '二', '三', '四', '五', '六'];
    const {clickQueryDate: {
        queryYear,
        queryMonth,
        queryDay
    }, setQueryYearDate, handleQuery, fetchDays, months} = useGlobalContext();
    const [daysArr, setDaysArr] = useState([]);
    const [monthsArr, setMonthsArr] = useState([]);
    const [thisMonthDays, setThisMonthDays] = useState(0);
    const [firstWeekDay, setFirstWeekDay] = useState(0);

    /* const handleQuery = (e) => {
        console.log(e.target.closest('.day'));
    } */
    const init = () => {
        const date = new Date(year, month, 0);
        const thisMonthDays = date.getDate();
        const firstWeekDay = new Date(date.setDate(1)).getDay();
        const lastMonthDays = new Date(date.setDate(0)).getDate();
        setThisMonthDays(thisMonthDays);
        setFirstWeekDay(firstWeekDay);

        const emptyArr = new Array(42).fill(1);
        const daysArr = emptyArr.map((_, i) => {
            if (i < firstWeekDay) {
                return lastMonthDays - firstWeekDay + i + 1;
            }
            if (i > (thisMonthDays + firstWeekDay) - 1) {
                return i - (thisMonthDays + firstWeekDay) + 1;
            }
            return i - firstWeekDay + 1;
        });
        setDaysArr(daysArr);
    };

    useEffect(() => {
        init();
    }, [year, month])
    /* useEffect(() => {
        fetchDays(year, month);
        const newArr = Array.from(months);
        setMonthsArr(newArr);
    }, [year, month])
    useEffect(() => {
        if (monthsArr.includes(undefined)) {
            return;
        }
        const date = monthsArr.find(monthObj => monthObj.month === month) || {days: []};
        setDaysArr(date.days);
    }, [monthsArr]) */

    return (
        <Wrapper>
            <section className='show-month'>
                <div className='month-title'>
                    <h3>{month}月</h3>
                </div>
                <div className='week-days-container'>
                    <div className='week-container'>
                        {
                            weekDates.map((day, i) => {
                                return <span key={i}>{day}</span>
                            })
                        }
                    </div>
                    <div className='days-container'>
                        {
                            daysArr.map((day, i) => {
                                let selectClass = '';
                                if (day === queryDay && queryYear === year && queryMonth === month && i >= firstWeekDay && i < firstWeekDay + thisMonthDays) {
                                    selectClass = 'show-light-blue';
                                }
                                let todayClass = '';
                                if (day === today && month === thisMonth && year === thisYear && i >= firstWeekDay && i < firstWeekDay + thisMonthDays) {
                                    todayClass = 'show-blue';
                                }
                                if (i < firstWeekDay) {
                                    return (
                                        <span 
                                            key={i} 
                                            className={`day fade-color ${selectClass}`}
                                            onClick={(e) => {
                                                handleQuery(e);
                                                setQueryYearDate(year, month - 1, day);
                                            }}
                                        >
                                            {day}
                                        </span>
                                    )
                                }
                                if (i >= firstWeekDay + thisMonthDays) {
                                    return (
                                        <span 
                                            key={i} 
                                            className={`day fade-color ${selectClass}`}
                                            onClick={(e) => {
                                                handleQuery(e);
                                                setQueryYearDate(year, month + 1, day);
                                            }}
                                        >
                                            {day}
                                        </span>
                                    )
                                }
                                return (
                                    <span 
                                        key={i} 
                                        className={`day ${todayClass} ${selectClass}`}
                                        onClick={(e) => {
                                            handleQuery(e);
                                            setQueryYearDate(year, month, day);
                                        }}
                                    >
                                        {day}
                                    </span>
                                )
                                // return <span key={i} className={`day ${lightColor} ${todayClass} ${selectClass}`}>{day}</span>
                            })
                        }
                    </div>
                </div>
            </section>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    text-align: center;
    font-weight: normal;
    color: rgb(50, 50, 50);
    font-size: 12px;
    .month-title {
        text-align: left;
        padding-left: .5rem;
        margin-bottom: 10px;
    }
    .week-container {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
        margin-bottom: 5px;
    }
    .days-container {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
    }
    .day {
        cursor: pointer;
        position: relative;
    }
    .day:hover::after {
        content: '';
        position: absolute;
        z-index: 999;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, .1);
    }
    .show-blue {
        color: black;
    }
    .show-blue::after {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(26,115,232,.5)!important;
    }
    .show-blue:hover::after {
        background-color: rgba(26,115,232,.7)!important;
    }
    .fade-color {
        color: gray;
    }
    .show-light-blue {
        color: black;
    }
    .show-light-blue::after {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(26,115,232,.3);
    }
    .show-light-blue:hover::after {
        background-color: rgba(26,115,232,.4);
    }
`;

export default Month

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../Providers/AppProvider';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components';

const CurrentMonth = () => {
    const weekDates = ['日', '一', '二', '三', '四', '五', '六'];
    /* const [theTotalShowArr, setTheTotalShowArr] = useState([]);
    const {date: {
        thisYear,
        year, 
        thisMonth,
        month, 
        day, 
        thisMonthDays, 
        lastMonthDays, 
        firstWeekDay,
    }, switchMonth , setQueryDate} = useGlobalContext();

    const getDates = () => {
        const emptyArr = new Array(42).fill(1);
        const datesArr = emptyArr.map((day, i) => {
            if (i < firstWeekDay) {
                return lastMonthDays - firstWeekDay + i + 1;
            }
            if (i > (thisMonthDays + firstWeekDay) - 1) {
                return i - (thisMonthDays + firstWeekDay) + 1;
            }
            return i - firstWeekDay + 1;
        });

        setTheTotalShowArr(datesArr);
    };

    useEffect(() => {
        getDates();
    }, [year, thisMonthDays, firstWeekDay, lastMonthDays]) */

    const {date: {
        tempYear, 
        year, 
        thisYear, 
        day, 
        month, 
        thisMonth
    }, clickQueryDate: {
        queryYear,
        queryMonth,
        queryDay
    },
    switchMonth, setQueryDate} = useGlobalContext();
    const [daysArr, setDaysArr] = useState([]);
    const [thisMonthDays, setThisMonthDays] = useState(0);
    const [firstWeekDay, setFirstWeekDay] = useState(0);

    const init = () => {
        const date = new Date(tempYear, thisMonth, 0);
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
    }, [tempYear, thisMonth])
    useEffect(() => {
        document.title = `Google 日历 - ${year}年${month}月`;
    }, [year, month])

    return (
        <Wrapper>
            <div className='current-month'>
                <div className='show-year-month'>
                    <h3>{tempYear}年{thisMonth}月</h3>
                    <div className='switch-month'>
                        <button className='last-month-btn' onClick={() => switchMonth('prev')}>
                            <AiOutlineLeft />
                        </button>
                        <button className='next-month-btn' onClick={() => switchMonth('next')}>
                            <AiOutlineRight />
                        </button>
                    </div>
                </div>
                <div className='show-this-month-days'>
                    <div className='week'>
                        {
                            weekDates.map((day, i) => {
                                return <span key={i}>{day}</span>                               
                            })
                        }
                    </div>
                    <div className='days'>
                        {
                            daysArr.map((today, i) => {
                                let selectClass = '';
                                if (today === queryDay && queryYear === tempYear && queryMonth === thisMonth && i >= firstWeekDay && i < firstWeekDay + thisMonthDays) {
                                    selectClass = 'show-light-blue';
                                }
                                let todayClass = '';
                                if (day === today && i === firstWeekDay + day - 1 && tempYear === thisYear && month === thisMonth) {
                                    todayClass = 'show-blue';
                                }
                                if (i < firstWeekDay) {
                                    return (
                                        <span 
                                            key={i} 
                                            className={`day fade-color ${selectClass}`}
                                            onClick={() => setQueryDate(tempYear, thisMonth - 1, today, true, true)}
                                        >
                                            {today}
                                        </span>
                                    )
                                }
                                if (i >= firstWeekDay + thisMonthDays) {
                                    return (
                                        <span 
                                            key={i} 
                                            className={`day fade-color ${selectClass}`}
                                            onClick={() => setQueryDate(tempYear, thisMonth + 1, today, true)}
                                        >
                                            {today}
                                        </span>
                                    )
                                }
                                return (
                                    <span 
                                        key={i} 
                                        className={`day ${todayClass} ${selectClass}`}
                                        onClick={() => setQueryDate(tempYear, thisMonth, today)}
                                    >
                                        {today}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    margin-bottom: 1rem;
    scale: .9;
    .current-month {
        /* padding: 0 2rem 0 1.5rem; */
    }
    .show-year-month {
        display: flex;
        padding: 0 2rem 0 1.5rem;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
    }
    .show-year-month h3 {
        font-weight: normal;
        font-size: .9rem;
        letter-spacing: .1em;
    }
    .show-year-month .switch-month button {
        cursor: pointer;
        position: relative;
        border: transparent;
        background-color: transparent;
    }
    .show-year-month .switch-month button:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .1);
    }
    .show-year-month .switch-month button:last-child {
        margin-left: 1rem;
    }
    .show-this-month-days {
        text-align: center;
        font-size: 10px;
        padding: 0 1.5rem 0 1rem;
    }
    .show-this-month-days .week {
        /* display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .5rem; */
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        margin-bottom: 5px;
    }
    .show-this-month-days .week span {
        /* text-align: center;
        display: inline-block;
        width: calc(100% / 7); */
        font-family: Roboto,"Noto Sans SC",Helvetica,Arial,sans-serif;
        font-weight: bold;
        color: gray;
    }
    .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
    }
    .day {
        position: relative;
        cursor: pointer;
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
        background-color: rgba(26,115,232,.5);
        /* background-color: rgba(25,103,210); */
    }
    .show-blue:hover::after {
        background-color: rgba(26,115,232,.7);
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

export default CurrentMonth

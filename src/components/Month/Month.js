import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import Day from './Day';
import LastMonthDay from './LastMonthDay';
import NextMonthDay from './NextMonthDay';

const Month = () => {
    const weekDates = ['日', '一', '二', '三', '四', '五', '六'];
    const [theTotalShowArr, setTheTotalShowArr] = useState([]);
    const {
        date: {
            tempYear, 
            year, 
            thisYear, 
            day, 
            month, 
            thisMonth
        },
        clickQueryDate: {
            queryYear,
            queryMonth,
            queryDay
        },
        lists,
        setQueryDate
    } = useGlobalContext();
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
        setTheTotalShowArr(daysArr);
    };

    useEffect(() => {
        init();
    }, [tempYear, thisMonth])
    /* const getDates = () => {
        const emptyArr = new Array(35).fill(1);
        const datesArr = emptyArr.map((_, i) => {
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
    }, [thisMonthDays, firstWeekDay, lastMonthDays]) */

    return (
        <Wrapper>
            <div className='month-page'>
                {
                    theTotalShowArr.map((today, i) => {
                        let selectClass = '';
                        let todayClass = '';
                        if (
                            day === today && 
                            i === firstWeekDay + day - 1 && 
                            year === thisYear && 
                            month === thisMonth
                        ) {
                            todayClass = 'show-blue';
                        }
                        if (
                            today === queryDay && 
                            queryYear === tempYear && 
                            queryMonth === thisMonth && 
                            i >= firstWeekDay && 
                            i < firstWeekDay + thisMonthDays
                        ) {
                            selectClass = 'show-light-blue';
                        } 

                        if (i < firstWeekDay) {
                            return <LastMonthDay
                                key={i}
                                weekDates={weekDates}
                                num={i}
                                setQueryDate={setQueryDate} 
                                firstWeekDay={firstWeekDay}
                                tempYear={tempYear} 
                                thisMonth={thisMonth}
                                today={today}
                                todayClass={todayClass}
                                selectClass={selectClass}
                            />
                        }
                        if (i >= (firstWeekDay + thisMonthDays)) {
                            return <NextMonthDay 
                                key={i}
                                num={i}
                                setQueryDate={setQueryDate} 
                                firstWeekDay={firstWeekDay}
                                tempYear={tempYear} 
                                thisMonth={thisMonth}
                                thisMonthDays={thisMonthDays}
                                today={today}
                                todayClass={todayClass}
                                selectClass={selectClass}
                            />
                        }
                        return <Day 
                            key={i}
                            weekDates={weekDates}
                            num={i}
                            setQueryDate={setQueryDate} 
                            firstWeekDay={firstWeekDay}
                            tempYear={tempYear} 
                            thisMonth={thisMonth}
                            today={today}
                            todayClass={todayClass}
                            selectClass={selectClass}
                        />
                        /* let selectClass = '';
                        if (today === queryDay && queryYear === tempYear && queryMonth === thisMonth && i >=            firstWeekDay && i < firstWeekDay + thisMonthDays) {
                                selectClass = 'show-light-blue';
                        } 
                        if (i === firstWeekDay) {
                            let todayClass = '';
                            if (day === today && i === firstWeekDay + day - 1 && year === thisYear && month === thisMonth) {
                                todayClass = 'show-blue';
                            }  
                            return (
                                <div key={i} className='day-container'>
                                    <h4 className='show-week'>周{weekDates[i]}</h4>
                                    <h4 className='show-day'>
                                        <span 
                                            className={`month-day ${todayClass} ${selectClass}`}
                                            onClick={() => setQueryDate(tempYear, thisMonth, today)}
                                        >{month}月{today}日</span>
                                    </h4>
                                </div>
                            )
                        }
                        if (i < 7) {
                            let todayClass = '';
                            if (day === today && i === firstWeekDay + day - 1 && year === thisYear && month === thisMonth) {
                                todayClass = 'show-blue';
                            }
                            if (i < firstWeekDay) {
                                return (
                                    <div key={i} className='day-container'>
                                        <h4 className='show-week'>周{weekDates[i]}</h4>
                                        <h4 className='show-day'>
                                            <span 
                                                className={`${todayClass} ${selectClass}`}
                                                onClick={() => setQueryDate(tempYear, thisMonth - 1, today, true, true)}
                                            >{today}</span>
                                        </h4>
                                    </div>
                                )
                            }
                            return (
                                <div key={i} className='day-container'>
                                    <h4 className='show-week'>周{weekDates[i]}</h4>
                                    <h4 className='show-day'>
                                        <span 
                                            className={`${todayClass} ${selectClass}`}
                                            onClick={() => setQueryDate(tempYear, thisMonth, today)}
                                        >{today}</span>
                                    </h4>
                                </div>
                            )
                        }
                        if (i === (firstWeekDay + thisMonthDays)) {
                            let todayClass = '';
                            if (day === today && i === firstWeekDay + day - 1 && year === thisYear && month === thisMonth) {
                                todayClass = 'show-blue';
                            }
                            return (
                                <div key={i} className='day-container'>
                                    <h4 className='show-day'>
                                        <span 
                                            className={`month-day ${todayClass} ${selectClass}`}
                                            onClick={() => setQueryDate(tempYear, thisMonth + 1, today, true)}
                                        >{month + 1}月{today}日</span>
                                    </h4>
                                </div>
                            )
                        }
                        let todayClass = '';
                        if (day === today && i === firstWeekDay + day - 1 && year === thisYear && month === thisMonth) {
                            todayClass = 'show-blue';
                        }
                        if (i > (firstWeekDay + thisMonthDays)) {
                            return (
                                <div key={i} className='day-container'>
                                    <h4 className='show-day'>
                                        <span 
                                            className={`${todayClass} ${selectClass}`}
                                            onClick={() => setQueryDate(tempYear, thisMonth + 1, today, true)}
                                        >{today}</span>
                                    </h4>
                                </div>
                            )
                        }
                        return (
                            <div key={i} className='day-container'>
                                <h4 className='show-day'>
                                    <span 
                                        className={`${todayClass} ${selectClass}`}
                                        onClick={() => setQueryDate(tempYear, thisMonth, today)}
                                    >{today}</span>
                                </h4>
                            </div>
                        ) */
                    })
                }
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    flex: 1;
    width: 100%;
    height: 100%;
    .month-page {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }
    .day-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid rgb(240, 240, 240);
        /* text-align: center; */
        padding: 8px 0px;
        letter-spacing: .1em;
    }
    .day-container h4 {
        font-weight: normal;
        color: gray;
        font-size: 12px;
    }
    .day-container .show-date {
        cursor: pointer;
        text-decoration: none;
        position: relative;
        display: block;
        min-width: max-content;
    }
    .day-container .show-date:hover::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, .1);
        border-radius: 50%;
    }
    .day-container .month-day::after {
        width: 50px!important;
    }
    .day-container .month-day:hover::after {
        width: 50px!important;
    }
    .day-container .show-blue {
        color: black;
    }
    .day-container .show-blue::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(26,115,232,.5);
    }
    .day-container .show-blue:hover::after {
        background-color: rgba(26,115,232,.7);
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
    .show-day {
        margin-bottom: .3rem;
    }

    .day-container .single-list-container {
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.5rem;
        width: 100%;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 10px;
    }
    .day-container .single-list-container .detail-list-content {
        cursor: default;
    }
    .day-container .single-list-container:hover {
        background-color: #eee;
    }
    .day-container .single-list-container .task-circle {
        display: block;
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: blue;
        margin-right: .5rem;
    }
    .day-container .single-list-container .remind-circle {
        display: block;
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: red;
        margin-right: .5rem;
    }
    .day-container .single-list-container .activity-circle {
        display: block;
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: green;
        margin-right: .5rem;
    }
    .day-container .single-list-container .list-content {
        flex: 1;
        line-height: 1.5rem;
        text-align: left;
        font-weight: normal;
        color: black;
    }
    .day-container .single-list-container .list-content .time-modal-show {
        display: inline-block;
        width: 3rem;
        height: 100%;
        margin-right: .2rem;
    }
    .selected-list {
        box-shadow: 0px 1px 10px 4px rgba(0, 0, 0, .2);
    }
    .selected-list:hover {
        background-color: transparent!important;
    }
    .complete-state {
        text-decoration: line-through;
    }
    .more-list {
        text-decoration: none;
        color: black;
    }
`;

export default Month

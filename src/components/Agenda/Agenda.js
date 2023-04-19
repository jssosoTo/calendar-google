import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import Day from './Day';

const Agenda = () => {
    const weekDates = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const {
        clickQueryDate: {
            queryYear,
            queryMonth,
            queryDay,
            queryWeekDay
        },
        date: {
            year: toyear,
            month: tomonth,
            day: today
        },
        lists,
        filters
    } = useGlobalContext();
    const [listDays, setListDays] = useState([]);

    const init = () => {
        let filterLists = lists.filter(list => list.year === queryYear && list.month === queryMonth && list.day >= queryDay);
        filterLists = filterLists.filter(item => filters.find(select => select.id === item.type).checked);
        let filterDays = [{year: queryYear, month: queryMonth, day: queryDay, lists: []}];
        for (let item of filterLists) {
            if (!filterDays.some(list => list.year === item.year && list.month === item.month && list.day === item.day)) {
                filterDays = [...filterDays, {...item, lists: [item]}];
            } else {
                filterDays = filterDays.map(list => {
                    if (list.year === item.year && list.month === item.month && list.day === item.day) {
                        return {...list, lists: [...list.lists, item]}
                    }
                    return list;
                })
            }
        }
        filterDays.sort((a, b) => a.day - b.day);
        setListDays(filterDays);
    };

    useEffect(() => {
        init();
    }, [queryYear, queryMonth, queryDay, lists, filters])

    return (
        <Wrapper>
            <div className='agenda-lists-container'>
                {
                    listDays.map((item, i) => {
                        return <Day key={i} {...item} toyear={toyear} tomonth={tomonth} today={today} weekDates={weekDates} />
                    })
                }
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    .agenda-lists-container::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    .agenda-lists-container::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .agenda-lists-container::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    .agenda-lists-container:hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    .agenda-lists-container {
        overflow: auto;
        height: 100%;
        width: 100%;
    }
    .current-date-container {
        display: flex;
        min-height: 3.5rem;
        border-bottom: 1px solid lightgray;
        padding: .4rem 0;
    }
    .date-container {
        display: flex;
        width: 8rem;
        margin-left: 1rem;
    }
    .date-day {
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        font-weight: normal;
        font-size: 20px;
        border-radius: 50%;
        margin-right: .4rem;
        text-decoration: none;
    }
    .date-day:hover {
        background-color: rgba(200, 200, 200, .2);
    }
    .month-week-container {
        padding-top: .5rem;
    }
    .date-month,
    .date-week {
        font-size: 12px;
        color: gray;
    }
    .lists-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 1rem;
    }
    .single-list-container {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 2rem;
        width: 100%;
        border-radius: 1rem;
        padding-left: .7rem;
    }
    .single-list-container:hover {
        background-color: rgba(200, 200, 200, .2);
    }
    .task-type-circle {
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
        background-color: blue;
        margin-right: 1.5rem;
    }
    .remind-type-circle {
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
        background-color: red;
        margin-right: 1.5rem;
    }
    .activity-type-circle {
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
        background-color: green;
        margin-right: 1.5rem;
    }
    .show-time {
        font-size: 13px;
        font-weight: normal;
        line-height: 2.5rem;
        width: 6rem;
        margin-right: 3rem;
    }
    .show-title {
        font-size: 14px;
        line-height: 2.5rem;
        font-weight: normal;
    }
`;

export default Agenda;

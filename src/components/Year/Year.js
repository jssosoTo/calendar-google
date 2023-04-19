import React, {useState} from 'react';
import styled from 'styled-components';
import Month from './Month';
import { useGlobalContext } from '../../Providers/AppProvider';
import ListCard from './ListCard';

const Year = () => {
    const {date: {thisYear, year, month, months, day}, isListHiding, lists, clickQueryDate} = useGlobalContext();

    return (
        <Wrapper>
            {!isListHiding && <ListCard />}
            <div className='months-container'>
                {
                    months.map((thisMonth, i) => {
                        return <Month key={i} thisYear={thisYear} year={year} thisMonth={month} month={thisMonth} today={day} />
                    })
                }
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    ::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /*定义滑块
    内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    :hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    flex: 1;
    overflow: auto;
    .months-container {
        margin: 1rem 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 3rem;
    }
    .list-modal {
        position: absolute;
        z-index: 9999;
        width: 15rem;
        top: 50%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, .3);
        transform: translate(-15rem, -4rem);
        transition: all .3s;
    }
    .list-modal .modal-time {
        position: relative;
        height: 4rem;
        text-align: center;
        padding-top: .5rem;
    }
    .list-modal .modal-time h3 {
        font-size: 10px;
        color: gray;
    }
    .list-modal .modal-time h2 {
        font-weight: normal;
    }
    .list-modal .modal-time .close-icon {
        cursor: pointer;
        position: absolute;
        display: block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        top: 3px;
        right: 3px;
    }
    .list-modal .modal-time .close-icon:hover {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .1);
    }
    .list-modal .modal-lists-container {
        margin-top: .3rem;
        margin-bottom: .5rem;
        padding: 0 .5rem;
        max-height: 5rem;
        overflow: auto;
    }
    .modal-lists-container::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    .modal-lists-container::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /*定义滑块
    内阴影+圆角*/
    .modal-lists-container::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    .modal-lists-container:hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    .list-modal .modal-lists-container .single-list-container-parent {
        display: flex;
        align-items: center;
        height: 2rem;
    }
    .list-modal .modal-lists-container .single-list-container {
        flex: 1;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.5rem;
        border-radius: 5px;
        padding-left: 10px;
    }
    .list-modal .modal-lists-container .alert-text {
        letter-spacing: .1em;
        font-size: 11px;
    }
    .list-modal .modal-lists-container .single-list-container:hover {
        background-color: #eee;
    }
    .list-modal .modal-lists-container .single-list-container .task-circle {
        display: block;
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: blue;
    }
    .list-modal .modal-lists-container .single-list-container .remind-circle {
        display: block;
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: red;
    }
    .list-modal .modal-lists-container .single-list-container .activity-circle {
        display: block;
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: green;
    }
    .list-modal .modal-lists-container .single-list-container .list-content {
        flex: 1;
        line-height: 1.5rem;
        font-size: 13px;
        font-weight: normal;
    }
    .list-modal .modal-lists-container .single-list-container .list-content .time-modal-show {
        display: inline-block;
        text-align: center;
        width: 3rem;
        height: 100%;
    }
    .complete-state {
        text-decoration: line-through;
    }
    .selected-list {
        box-shadow: 0px 1px 10px 4px rgba(0, 0, 0, .2);
    }
    .selected-list:hover {
        background-color: transparent!important;
    }
    @media screen and (min-width: 1750px) {
        .months-container {
            margin: 1rem 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
            gap: 3rem;
        }
    }
`;

export default Year

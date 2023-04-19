import React, { useRef } from 'react'
import styled from 'styled-components';
import { BsPinFill, BsTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { useGlobalContext } from '../../../Providers/AppProvider';

const RemindList = ({id, content, time, year, month, day, position}) => {
    const { deleteList, openEditList } = useGlobalContext();

    return (
        <Wrapper style={{top: `${position * 4.5 + .7 * (position + 1)}rem`}}>
            <div className='single-remind-list-container'>
                <h4 className='remind-title'>{content}</h4>
                <div className='time-container'>
                    <div className='remind-date'>
                        {`${year}年${month}月${day}日`} 
                    </div>
                    <div className='remind-time'>{time}</div>
                </div>
                <div className='edit-container'>
                    <button
                        onClick={() => openEditList(id)}
                    ><MdModeEdit /></button>
                    <button
                        onClick={() => deleteList(id)}
                    ><BsTrashFill /></button>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    .single-remind-list-container {
        cursor: pointer;
        position: relative;
        min-height: 4.5rem;
        width: 16rem;
        border-radius: 10px;
        padding: .5rem 1rem 0 1rem;
        border: 1px solid lightgray;
    }
    .remind-title {
        font-size: 17px;
        font-weight: normal;
    }
    .time-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.5rem;
        line-height: 1.5rem;
        margin-top: 5px;
    }
    .remind-date {
        letter-spacing: .1em;
        font-size: 14px;
        color: rgb(63, 81, 181);
        /* text-decoration: underline; */
    }
    .remind-time {
        width: 3rem;
        border: 1px solid lightgray;
        text-align: center;
        border-radius: calc(1.5rem / 2);
        font-size: 13px;
        color: orangered;
    }
    .single-remind-list-container:hover .edit-container {
        visibility: visible;
    }
    .edit-container {
        position: absolute;
        top: .5rem;
        right: .5rem;
        display: flex;
        visibility: hidden;
        justify-content: space-around;
        align-items: center;
        width: 3rem;
    }
    .edit-container button {
        cursor: pointer;
        position: relative;
        border: transparent;
        width: 1.5rem;
        height: 1.5rem;
        background-color: transparent;
    }
    .edit-container button:hover {
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .3);
    }
    .edit-container button svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export default RemindList

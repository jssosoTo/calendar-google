import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { BsPinFill, BsTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { useGlobalContext } from '../../../Providers/AppProvider';

const RemindList = ({id, content, time, year, month, day, position, listAmount, switchPosition, isMoveList, setIsMoveList}) => {
    const { deleteList, openEditList } = useGlobalContext();
    const divContainer = useRef(null);

    const handleContainer = (e) => {
        setIsMoveList(true);
        divContainer.current.style.zIndex = 9999;
        const cardPosition = divContainer.current.getBoundingClientRect();
        const mouseTopDistance = e.clientY - cardPosition.top;
        function move(e) {
            divContainer.current.style.top = `calc(${e.clientY}px - 4rem - ${mouseTopDistance}px)`;
        }
        function changePosition(e) {
            // const wholeListLength = (listAmount * 4.5 + .7 * (listAmount + 1)) * 16;
            const singleListLength = (4.5 + .7) * 16;
            const onWhichList = Math.trunc((e.clientY - 4 * 16 - mouseTopDistance) / singleListLength);
            switchPosition(onWhichList, position);
            divContainer.current.style.zIndex = 1;
            divContainer.current.style.top = `${position * 4.5 + .7 * (position + 1)}rem`;
            divContainer.current.removeEventListener('mousemove', move);
        }
        divContainer.current.addEventListener('mousemove', move);
        divContainer.current.addEventListener('mouseup', changePosition);
    };

    useEffect(() => {
        divContainer.current.style.top = `${position * 4.5 + .7 * (position + 1)}rem`;
    }, [position])

    return (
        <Wrapper 
            ref={divContainer} 
            style={{top: `${position * 4.5 + .7 * (position + 1)}rem`}}
            onMouseDown={handleContainer}
        >
            <div className={`single-remind-list-container ${isMoveList && 'move-hover'}`}>
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
    z-index: 1;
    .single-remind-list-container {
        cursor: pointer;
        position: relative;
        min-height: 4.5rem;
        width: 16rem;
        border-radius: 10px;
        padding: .5rem 1rem 0 1rem;
        border: 1px solid lightgray;
        background-color: #fff;
    }
    .move-hover:hover {
        border: 1px dashed gray;
        background-color: rgba(250,250,250,.5);
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

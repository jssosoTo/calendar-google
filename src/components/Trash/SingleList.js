import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { BsTrash3 } from 'react-icons/bs';
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';

const SingleList = ({id, year, month, day, time, content, isChecked, clickCheck, deleteTrashPermanently, withdrawTrash}) => {
    const divContainer = useRef(null);
    const [isBtnShow, setIsBtnShow] = useState(false);

    return (
        <Wrapper>
            <div 
                className='choose-whole-list-container' 
                ref={divContainer} 
                onClick={() => clickCheck(id)}
                onMouseEnter={() => setIsBtnShow(true)}
                onMouseLeave={() => setIsBtnShow(false)}
            >
                <div className='checkbox-container'>
                    <input type="checkbox" name='whole' id="whole" value="whole" checked={isChecked} onChange={() => clickCheck(id)} />
                </div>
                <div className='show-recycle-date'>
                    <h5 className='show-date-month'>{month}月{day}日</h5>
                    <h6 className='show-date-year'>{year}年</h6>
                </div>
                <div className='show-recycle-time'>
                    {time}
                </div>
                <div className='show-recycle-title'>
                    {content}
                </div>
                <div className='show-recycle-user'>
                    我
                </div>
                <div className='show-trash-date'>
                    {
                        isBtnShow ? (
                            <>
                                <button className='withdraw-icon' onClick={() => withdrawTrash(id)}>
                                    <HiOutlineArrowUturnLeft />
                                </button>
                                <button className='trash-icon' onClick={() => deleteTrashPermanently(id)}>
                                    <BsTrash3 />
                                </button>
                            </>
                        ) : (
                            <>
                                <h5 className='show-date-month'>4月16日</h5>
                                <h6 className='show-date-year'>2023年</h6>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .choose-whole-list-container {
        cursor: pointer;
        color: black;
        border-top: 1px solid rgb(225, 225, 225);
    }
    .choose-whole-list-container:hover {
        border-top: none;
        background-color: rgb(240, 240, 240);
        border-radius: 5px;
    }
    .show-date-month {
        font-size: 14px;
        font-weight: normal;
    }
    .show-date-year {
        font-size: 12px;
        font-weight: normal;
    }
    .show-trash-date button {
        position: relative;
        cursor: pointer;
        width: 1.7rem;
        height: 1.7rem;
        margin-left: .5rem;
        border: transparent;
        background-color: transparent;
    }
    .show-trash-date button:hover {
        border-radius: 50%;
        background-color: rgb(225, 225, 225);
    }
    .show-trash-date button svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 50%;
    }
`;

export default SingleList

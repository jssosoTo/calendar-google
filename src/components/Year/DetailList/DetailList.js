import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import styled from 'styled-components';
import Title from './Title';
import Time from './Time';
import Content from './Content';
import Task from './Task';
import { useGlobalContext } from '../../../Providers/AppProvider';
import Map from './Map';
import Invite from './Invite';
import Work from './Work';

const DetailList = ({id, year, month, day, time, content, detail, type, location, email, finish}) => {
    const { closeListDetailCard, deleteList, openEditList, switchFinishList } = useGlobalContext();

    return (
        <Wrapper className="translate-card">
            <div className='detail-list-content'>
                <div className='functions-container'>
                    <button 
                        type="button" 
                        className='icon'
                        onClick={() => openEditList(id)}
                    >
                        <BsPen />
                    </button>
                    <button 
                        type="button" 
                        className='icon'
                        onClick={() => deleteList(id)}
                    >
                        <BsTrash3 />
                    </button>
                    <button 
                        type="button" 
                        className='icon'
                        onClick={() => closeListDetailCard(id)}
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <div className='message-container'>
                    {
                        type === 'task' && (
                            <>
                                <Title content={content} />
                                <Time month={month} day={day} time={time} />
                                {detail && <Content detail={detail} />}
                                <Task />
                            </>
                        )
                    }
                    {
                        type === 'activity' && (
                            <>
                                <Title content={content} />
                                <Time month={month} day={day} time={time} />
                                {location && <Map location={location} />}
                                {email && <Invite email={email} />}
                                {detail && <Content detail={detail} />}
                                <Work />
                            </>
                        )
                    }
                    {
                        type === 'remind' && (
                            <>
                                <Title content={content} />
                                <Time month={month} day={day} time={time} />
                            </>
                        )
                    }
                </div>
                <hr />
                <div className='check-process'>
                    <button 
                        type="button"
                        onClick={() => {
                            switchFinishList(id);
                            closeListDetailCard(id);
                        }}
                    >
                        {finish ? `标记为未完成` : `标记为已完成`} 
                    </button>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    z-index: 9999;
    left: -10px;
    top: 0px;
    transform: translateX(-100%);
    .detail-list-content {
        width: 25rem;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, .1)!important;
    }
    .detail-list-content .functions-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 .8rem;
        height: 3rem;
    }
    .detail-list-content .functions-container .icon {
        position: relative;
        cursor: pointer;
        border: transparent;
        background: transparent;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-left: .5rem;
    }
    .detail-list-content .functions-container .icon:hover {
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .4);
    }
    .detail-list-content .functions-container .icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1rem;
        height: 1rem;
    }
    .message-container {
        margin-bottom: .8rem;
    }
    .line-show {
        display: flex;
        align-items: center;
        height: 3.5rem;
        padding-left: 1rem;
        font-size: 15px;
    }
    .line-show .event-icon {
        position: relative;
        width: 3rem;
        height: 100%;
        margin-right: 1rem;
    }
    .line-show .event-icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 50%;
    }
    .check-process {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 3rem;
        padding-right: 1rem;
    }
    .check-process button {
        cursor: pointer;
        border: transparent;
        background: transparent;
        height: 2.5rem;
        width: 6rem;
        color: rgb(100, 100, 100);
    }
    .check-process button:hover {
        color: black;
        border-radius: 5px;
        background-color: rgba(200, 200, 200, .2);
    }
`;

export default DetailList

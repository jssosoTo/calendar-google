import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { useGlobalContext } from '../../../Providers/AppProvider';
import List from './List';
import FinishedList from './FinishedList';
import { AiOutlineCaretDown } from 'react-icons/ai';

const Task = ({setIsSideCardShow}) => {
    const { lists, switchTaskCard } = useGlobalContext();
    const [taskLists, setTaskLists] = useState([]);
    const [finishedTask, setFinishedTask] = useState([]);
    const [rotateStyle, setRotateStyle] = useState('');
    const [isFinishedListShow, setIsFinishedListShow] = useState(false);

    useEffect(() => {
        const filterTask = lists.filter(item => item.type === 'task' && !item.finish);
        const filterFinishedTask = lists.filter(item => item.type === 'task' && item.finish);
        setFinishedTask(filterFinishedTask);
        setTaskLists(filterTask);
    }, [lists])
    useEffect(() => {
        if (isFinishedListShow) {
            setRotateStyle('rotate-state');
        } else {
            setRotateStyle('');
        }
    }, [isFinishedListShow])

    return (
        <Wrapper>
            <div className='task-list-container'>
                <div className='task-title-container'>
                    <div className='title'>
                        <h4 className='en-title'>TASKS</h4>
                        <h3 className='zh-title'>我的任务</h3>
                    </div>
                    <div className='close-icon'>
                        <button 
                            className='close-btn'
                            onClick={() => {
                                setIsSideCardShow(false);
                                switchTaskCard();
                            }}
                        >X</button>
                    </div>
                </div>
                <div className='whole-lists-container'>
                    <div className='lists-container'>
                        {
                            taskLists.map(item => {
                                return <List {...item} key={item.id} />
                            })
                        }
                    </div>
                    <div className='complete-lists-container'>
                        <div 
                            className='switch-show-container' 
                            onClick={() => setIsFinishedListShow(!isFinishedListShow)}
                        >
                            <button className={rotateStyle}>
                                <IconContext.Provider value={{ color: "gray"}}>
                                    <AiOutlineCaretDown />
                                </IconContext.Provider>
                            </button>
                            <span>已完成({finishedTask.length})</span>
                        </div>
                        {
                            isFinishedListShow && (
                                <div>
                                {
                                    finishedTask.map(item => {
                                        return <FinishedList {...item} key={item.id} />
                                    })
                                }
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .task-title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
        border-bottom: 1px solid rgb(240, 240, 240);
    }
    .title {
        padding-left: 1rem;
    }
    .en-title, .zh-title {
        font-weight: normal;
    }
    .en-title {
        font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
        font-size: 13px;
        color: gray;
    }
    .zh-title {
        letter-spacing: .1em;
        font-size: 15px;
        color: rgb(100, 100, 100);
    }
    .close-icon {
        padding-right: .5rem;
    }
    .close-btn {
        cursor: pointer;
        font-size: 15px;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 50%;
        border: transparent;
        background-color: transparent;
    }
    .close-btn:hover {
        background-color: rgba(200, 200, 200, .1);
    }
    .lists-container {
        flex: 1;
        transition: all .2s;
    }
    .whole-lists-container {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 4rem);
        overflow: auto;
    }
    .whole-lists-container::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    .whole-lists-container::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /*定义滑块
    内阴影+圆角*/
    .whole-lists-container::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    .whole-lists-container:hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    .single-list-container {
        display: flex;
        min-height: 4rem;
    }
    .single-list-container:hover {
        background-color: rgba(200, 200, 200, .1);
    }
    .check-btn {
        width: 2rem;
        height: 2rem;
        text-align: center;
        margin: 0 .5rem;
    }
    .check-btn button {
        position: relative;
        cursor: pointer;
        margin-top: .5rem;
        width: 1.7rem;
        height: 1.7rem;
        border: transparent;
        border-radius: 50%;
        background-color: transparent;
    }
    .check-btn button svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
    }
    .check-btn button:hover {
        background-color: rgba(200, 200, 200, .2);
    }
    .check-btn input {
        cursor: pointer;
        margin-top: .8rem;
        width: 1rem;
        height: 1rem;
    }
    .list-title {
        height: 2rem;
        font-size: 13px;
        font-weight: normal;
        line-height: 2rem;
    }
    .show-day {
        display: inline-block;
        padding: 0 .5rem;
        min-width: 3.5rem;
        height: 1.5rem;
        text-align: center;
        color: orangered;
        border-radius: calc(1.5rem / 2);
        font-size: 13px;
        line-height: 1.5rem;
        border: 1px solid lightgray;
    }
    .switch-show-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 2.5rem;
        line-height: 2.5rem;
        padding-left: .5rem;
        margin-top: .5rem;
        border-top: 1px solid lightgray;
    }
    .switch-show-container button {
        /* position: relative; */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: transparent;
        /* transform: translateY(-15%); */
        background-color: transparent;
        margin-right: .5rem;
    }
    .switch-show-container button svg {
        /* position: absolute;
        top: 50%;
        left: 50%; */
        transform: rotate(-90deg);
        /* width: 40%;
        height: 40%; */
    }
    .switch-show-container button:hover {
        background-color: rgba(200, 200, 200, .2);
    }
    .switch-show-container span {
        font-size: 13px;
    }

    .delete-btn {
        width: 1.5rem;
        height: 1.5rem;
        text-align: center;
        margin: 0 .5rem;
    }
    .delete-btn button {
        position: relative;
        cursor: pointer;
        margin-top: .5rem;
        width: 1.2rem;
        height: 1.2rem;
        border: transparent;
        border-radius: 50%;
        background-color: transparent;
    }
    .delete-btn button svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
    }
    .list-content-container {
        flex: 1;
    }
    .rotate-state svg {
        transform: rotate(0deg)!important;
    }
`;

export default Task

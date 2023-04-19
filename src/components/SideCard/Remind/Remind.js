import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../../Providers/AppProvider';
import RemindList from './RemindList';

const Remind = ({setIsSideCardShow}) => {
    const { lists, switchRemindCard } = useGlobalContext();
    const [taskLists, setTaskLists] = useState([]);

    useEffect(() => {
        const filterTask = lists.filter(item => item.type === 'remind' && !item.finish);
        const positionList = filterTask.map((item, i) => {
            return {...item, position: i};
        });
        setTaskLists(positionList);
    }, [lists])

    return (
        <Wrapper>
            <div className='task-list-container'>
                <div className='task-title-container'>
                    <div className='title'>
                        <h4 className='en-title'>REMIND</h4>
                        <h3 className='zh-title'>提醒</h3>
                    </div>
                    <div className='close-icon'>
                        <button 
                            className='close-btn'
                            onClick={() => {
                                setIsSideCardShow(false);
                                switchRemindCard();
                            }}
                        >X</button>
                    </div>
                </div>
                <div className='whole-lists-container'>
                    {
                        taskLists.map(list => {
                            return <RemindList key={list.id} {...list} />
                        })
                    }
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
        position: relative;
        height: calc(100vh - 4rem);
        overflow: auto;
        padding: 1rem;
        transition: all .3s;
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
`;

export default Remind

import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { BsListNested } from 'react-icons/bs';
import Time from './Time';
import Message from './Message';
import Task from './Task';
import Invite from './Invite';
import Location from './Location';
import { useGlobalContext } from '../../Providers/AppProvider';
import OnlyTime from './OnlyTime';
import SetTimeLong from './SetTimeLong';
import ActivityMessage from './ActivityMessage';
import Modal from './Modal';

const AddList = () => {
    const { 
        closeAddListModal, 
        listType, 
        openAddListModal, 
        clickQueryDate, 
        submitList, 
        openModalAlert 
    } = useGlobalContext();
    const lineContainer = useRef(null);
    const cardContainer = useRef(null);
    const moveContainer = useRef(null);
    const [listContent, setListContent] = useState({
        id: '',
        year: clickQueryDate.queryYear,
        month: clickQueryDate.queryMonth,
        day: clickQueryDate.queryDay,
        time: '17:00',
        content: '',
        detail: '',
        email: '',
        location: '',
        activityContent: '',
        type: listType
    });
    const [isWholeDay, setIsWholeDay] = useState(false);

    const showLine = () => {
        lineContainer.current.classList.add('hide-line');
    };
    const hideLine = () => {
        lineContainer.current.classList.remove('hide-line');
    };
    const moveWholeCard = (e) => {
        let cardPosition = cardContainer.current.getBoundingClientRect();
        const mouseTopDistance = e.clientY - cardPosition.top;
        function move(e) {
            let cardPosition = cardContainer.current.getBoundingClientRect();
            console.log(cardPosition.left, e.clientX);
            cardContainer.current.style.left = `${e.clientX}px`;
            cardContainer.current.style.top = `calc(${e.clientY}px - 4rem - ${mouseTopDistance}px)`;
        }
        moveContainer.current.addEventListener('mousemove', move);
        moveContainer.current.addEventListener('mouseup', () => {
            moveContainer.current.removeEventListener('mousemove', move);
        });
        moveContainer.current.addEventListener('mouseout', () => {
            moveContainer.current.removeEventListener('mousemove', move);
        });
    };
    const changeValue = (e) => {
        const property = e.target.name;
        if (property === 'date') {
            const [year, month, day] = e.target.value.split('-');
            setListContent({...listContent, year: Number(year), month: Number(month), day: Number(day)});
        } else {
            setListContent({...listContent, [property]: e.target.value});
        } 
    };
    const setWholeDay = () => {
        if (!isWholeDay) {
            setListContent({...listContent, time: '全天'});
        } else {
            setListContent({...listContent, time: '17:00'});
        }
        setIsWholeDay(!isWholeDay);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (listContent.content.length === 0) {
            submitList({
                ...listContent, 
                id: new Date().getTime().toString(),
                type: listType,
                content: '( 无标题 )'
            });
        } else if (listContent.content.length > 12) {
            openModalAlert('标题字数长度限制12以内', 'danger');
            return;
        } else {
            submitList({
                ...listContent, 
                id: new Date().getTime().toString(),
                type: listType
            });
        }
        openModalAlert('添加成功', 'success');
        setListContent({
            id: '',
            year: clickQueryDate.queryYear,
            month: clickQueryDate.queryMonth,
            day: clickQueryDate.queryDay,
            time: '17:00',
            content: '',
            detail: '',
            type: listType,
            isDetailOpen: false
        })
    };


    return (
        <Wrapper ref={cardContainer}>
            <form onSubmit={handleSubmit} className='add-list-container'>
                <div className='fold-btns-container'>
                    <span><BsListNested /></span>
                    <div ref={moveContainer} className='move-area' onMouseDown={moveWholeCard} />
                    <span onClick={closeAddListModal}>X</span>
                </div>
                <div className='add-event-data-container'>
                    <div className='input-event-type-container'>
                        <div className='add-input-container'>
                            <input 
                                type='text' 
                                placeholder='添加标题'
                                name='content'
                                value={listContent.content}
                                onChange={changeValue}
                                onFocus={showLine}
                                onBlur={hideLine} 
                            />
                            <div 
                                ref={lineContainer} 
                                className='underline'
                            />
                        </div>
                        <ul className='events-type-container'>
                            <li 
                                className={listType === 'activity' ? 'active-state' : ''}
                                onClick={() => openAddListModal('activity')}
                            >活动</li>
                            <li 
                                className={listType === 'task' ? 'active-state' : ''}
                                onClick={() => openAddListModal('task')}
                            >任务</li>
                            <li 
                                className={listType === 'remind' ? 'active-state' : ''}
                                onClick={() => openAddListModal('remind')}
                            >提醒</li>
                        </ul>
                    </div>
                </div>
                <div className='time-detail-container'>
                    {
                        listType === 'task' && (
                            <>
                                <Time {...listContent} changeValue={changeValue} />
                                <Message {...listContent} changeValue={changeValue} />
                                <Task {...listContent} changeValue={changeValue} />
                            </>
                        )
                    }
                    {
                        listType === 'remind' && (
                            <>
                                <OnlyTime {...listContent} isWholeDay={isWholeDay} changeValue={changeValue} />
                                <SetTimeLong {...listContent} setWholeDay={setWholeDay} />
                            </>
                        )
                    }
                    {
                        listType === 'activity' && (
                            <>
                                <Time {...listContent} changeValue={changeValue} />
                                <Invite {...listContent} changeValue={changeValue} />
                                <Location {...listContent} changeValue={changeValue} />
                                <ActivityMessage {...listContent} changeValue={changeValue} />
                            </>
                        )
                    }
                </div>
                <div className='save-container'>
                    <button type="submit" className='save-btn'>保存</button>
                </div>
            </form>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    z-index: 99999;
    top: 3.5rem;
    left: 50%;
    transform: translateX(-50%);
    .add-list-container {
        position: relative;
        width: 26rem;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, .2);
    }
    .fold-btns-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .7rem;
        height: 2.5rem;
        line-height: 2rem;
        background-color: rgb(245, 245, 245);
    }
    .fold-btns-container .move-area {
        cursor: move;
        flex: 1;
        height: 100%;
    }
    .fold-btns-container span {
        cursor: pointer;
        position: relative;
        text-align: center;
        width: 1.6rem;
        height: 1.6rem;
        line-height: 1.6rem;
    }
    .fold-btns-container span:hover {
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .4);
    }
    .fold-btns-container span svg {
        position: absolute;
        width: 70%;
        height: 70%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .add-event-data-container {
        padding: 0 .7rem;
    }
    .input-event-type-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 6.5rem;
        margin-top: 1rem;
        padding-left: 3.2rem;
    }
    .input-event-type-container .add-input-container {
        height: 2.2rem;
    }
    .input-event-type-container .add-input-container input {
        outline: none;
        border: transparent;
        background-color: transparent;
        height: calc(2.2rem - 2px);
        font-size: 23px;
    }
    .input-event-type-container .add-input-container .underline {
        height: 2px;
        background-color: lightgray;
        transition: all .2s;
    }
    .input-event-type-container .add-input-container .hide-line {
        background-color: rgb(25,103,210);
    }
    .input-event-type-container .events-type-container {
        display: flex;
        list-style-type: none;
    } 
    .input-event-type-container .events-type-container li {
        cursor: pointer;
        height: 2.5rem;
        padding: .5rem;
        margin-right: .5rem;
    }
    .input-event-type-container .events-type-container li:hover {
        border-radius: 5px;
        background-color: rgba(200, 200, 200, .2);
    } 
    .time-detail-container {
        padding: 0 .7rem;
        margin-bottom: .2rem;
    }
    .save-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 4rem;
        padding: 0 .7rem;
    }
    .save-container .save-btn {
        cursor: pointer;
        border: transparent;
        background-color: rgb(16,125,240);
        width: 5rem;
        height: 2.5rem;
        color: white;
        border-radius: 5px;
    }
    .save-container .save-btn:hover {
        background-color: rgb(36,115,232);
    }
    .active-state {
        color: #1967d2;
        background-color: rgba(36,115,232, .2)!important;
        border-radius: 5px;
    }
    .active-state:hover {
        background-color: rgba(36,115,232, .3)!important;
    } 
`;

export default AddList

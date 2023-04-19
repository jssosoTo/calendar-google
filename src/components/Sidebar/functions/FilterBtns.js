import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useGlobalContext } from '../../../Providers/AppProvider';

const FilterBtns = () => {
    const optionsContainer = useRef(null);
    const {filters, switchFilter} = useGlobalContext();
    const [isHiding, setIsHiding] = useState(false);

    const switchShow = () => {
        const optionsClass = optionsContainer.current.classList;
        optionsClass.toggle('hide-options');
        if (optionsClass.contains('hide-options')) {
            setIsHiding(true);
        } else {
            setIsHiding(false);
        }
    }

    return (
        <Wrapper>
            <section className='section'>
                <div className='calendar-title' onClick={switchShow}>
                    <h3 className='my-calendar'>我的日历</h3>
                    {isHiding ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>
                <div className='options' ref={optionsContainer}>
                    {
                        filters.map((item, i) => {
                            return (
                                <div key={i} onClick={() => switchFilter(item.id)}>
                                    <input 
                                        type="checkbox" 
                                        name={item.id} 
                                        id={item.id}
                                        value={item.name}
                                        checked={item.checked}
                                        onClick={() => switchFilter(item.id)}
                                        onChange={() => switchFilter(item.id)}
                                    />
                                    <label aria-label={item.id} htmlFor={item.id}>{item.name}</label>
                                </div>
                            )
                        })
                    }
                    {/* <div className='user-name'>
                        <input 
                            type="checkbox" 
                            name="username" 
                            id="username" 
                            value="P0PC0RN"
                        />
                        <label aria-label='username' htmlFor='username'>P0PC0RN</label>
                    </div>
                    <div className='activity'>
                        <input 
                            type="checkbox" 
                            name="activity" 
                            id="activity" 
                            value="activity"
                        />
                        <label htmlFor='activity'>活动</label>
                    </div>
                    <div className='remind'>
                        <input 
                            type="checkbox" 
                            name="remind" 
                            id="remind" 
                            value="remind"
                        />
                        <label htmlFor='remind'>提醒</label>
                    </div>
                    <div className='tasks'>
                        <input 
                            type="checkbox" 
                            name="tasks" 
                            id="tasks" 
                            value="tasks"
                        />
                        <label htmlFor='tasks'>任务</label>
                    </div> */}
                </div>
            </section>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .section {
        font-size: 12px;
        padding: 0 1rem 0 .5rem;
    }
    .calendar-title {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem 0 1rem;
        align-items: center;
        height: 1.7rem;
        line-height: 1.7rem;
        margin-bottom: 2px;
        transition: all .3s;
    }
    .calendar-title:hover {
        background-color: rgba(150, 150, 150, .3);
    }
    .my-calendar {
        font-size: 13px;
        font-weight: normal;
    }
    .hide-options {
        display: none;
    }
    .section .options div {
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 1rem 0 1rem;
        align-items: center;
        height: 1.7rem;
        line-height: 1.7rem;
        transition: all .3s;
    }
    .section .options div:hover {
        background-color: rgba(150, 150, 150, .1);
    }
    .section .options div input {
        cursor: pointer;
        width: 1rem;
        height: 1rem;
        margin-right: 1rem;
    }
    label {
        cursor: pointer;
        flex: 1;
        height: 100%;
        line-height: 1.7rem;
    }
`;

export default FilterBtns

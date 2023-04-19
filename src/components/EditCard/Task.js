import React from 'react'
import styled from 'styled-components';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { GoTriangleDown } from 'react-icons/go';

const Task = () => {
    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'><MdOutlineFormatListBulleted /></div>
                <div className='title-container'>
                    <div className='task-options'>我的任务 <GoTriangleDown /></div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    margin-top: 1rem;
    .title-container {
        height: 100%;
        background-color: rgba(200, 200, 200, .3);
        border-radius: 5px;
        padding: 0 .5rem;
        font-size: 14px;
    }
    .title-container .task-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
`;

export default Task

import React from 'react';
import styled from 'styled-components';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { GoTriangleDown } from 'react-icons/go';

const Task = () => {
    return (
        <Wrapper>
            <div className='task-total-container'>
                <div className='task-icon'><MdOutlineFormatListBulleted /></div>
                <div className='set-task-container'>
                    <div className='task-options'>我的任务 <GoTriangleDown /></div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .task-total-container {
        display: flex;
        align-items: center;
        height: 3.5rem;
    }
    .task-total-container .task-icon {
        position: relative;
        width: 2rem;
        height: 100%;
        margin-right: .7rem;
    }
    .task-total-container .task-icon svg {
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 1.5rem;
        height: 1.5rem;
    }
    .set-task-container {
        display: flex;
        align-items: center;
        position: relative;
        flex: 1;
        height: 3.5rem;
        padding: .5rem 0px;
    }
    .set-task-container .task-options {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 5.5rem;
        height: 2.5rem;
        padding: 0 .4rem 0 .7rem;
        font-size: 14px;
    }
    .set-task-container .task-options:hover {
        border-radius: 5px;
        background-color: rgba(200, 200, 200, .2);
    }
    .set-task-container .task-options svg {
        width: 20%;
        height: 20%;
    }
`;

export default Task

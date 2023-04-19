import React from 'react';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import styled from 'styled-components';

const Task = () => {
    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'><MdOutlineFormatListBulleted /></div>
                <div className='set-time-container'>
                    我的任务
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .set-time-container {
        font-size: 14px;
    }
`;

export default Task

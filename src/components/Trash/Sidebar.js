import React from 'react'
import styled from 'styled-components';

const Sidebar = () => {
    return (
        <Wrapper>
            <div className='sidebar-container'>
                <h2 className='checkbox-title'>我的日历回收站</h2>
                <div className='checkbox-container'>
                    <div className={`single-check-container task-container`}>
                        <span className={`task-circle`}></span>
                        <h4 className='type-name'>Scott Su</h4>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    height: 100%;
    .sidebar-container {
        width: 18rem;
        height: 100%;
    }
    .checkbox-title {
        font-weight: normal;
        font-size: 16px;
        padding: 0.5rem 1.2rem;
        margin-top: .3rem;
        color: rgb(100, 100, 100);
    }
    .checkbox-container {
        padding-right: 2rem;
    }
    .single-check-container {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0.7rem 1.2rem;
        background-color: #eee;
        transition: all .2s;
        height: 2.5rem;
        border-top-right-radius: calc(3rem / 2);
        border-bottom-right-radius: calc(3rem / 2);
    }
    .task-container {
        color: #1967d2;
        background-color: rgb(232,240,254);
    }
    .task-container:hover {
        background-color: rgba(200, 200, 200, .3);
    }
    .type-name {
        font-weight: normal;
        font-size: 14px;
    }
    .task-circle {
        display: block;
        height: 1rem;
        width: 1rem;
        margin-right: .7rem;
        border-radius: 50%;
        background-color: blue;
    }
    .remind-circle {
        display: block;
        height: 1rem;
        width: 1rem;
        margin-right: .7rem;
        border-radius: 50%;
        background-color: red;
    }
    .activity-circle {
        display: block;
        height: 1rem;
        width: 1rem;
        margin-right: .7rem;
        border-radius: 50%;
        background-color: green;
    }
`;

export default Sidebar

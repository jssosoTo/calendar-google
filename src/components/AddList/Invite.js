import React, { useRef } from 'react';
import { FiUsers } from 'react-icons/fi';
import styled from 'styled-components';

const Invite = ({email, changeValue}) => {
    const lineContainer = useRef(null);

    const displayLine = () => {
        lineContainer.current.style.width = '100%';
    };
    const removeLine = () => {
        lineContainer.current.style.width = '0px';
    };

    return (
        <Wrapper>
            <div className='task-total-container'>
                <div className='task-icon'><FiUsers /></div>
                <div className='set-task-container'>
                    <input 
                        type="email" 
                        name="email"
                        placeholder='添加邀请对象'
                        value={email}
                        onChange={changeValue}
                        onFocus={displayLine}
                        onBlur={removeLine}
                    ></input>
                    <div ref={lineContainer} className='underline' />
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
        height: 2.5rem;
        padding: 0 .5rem;
        background-color: rgba(200, 200, 200, .2);
        border-radius: 5px;
        overflow: hidden;
    }
    .set-task-container input {
        outline: none;
        border: transparent;
        background-color: transparent;
        height: 1.8rem;
        font-size: 15px;
        width: 100%;
    }
    .set-task-container .underline {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0px;
        height: 2px;
        width: 0px;
        background-color: blue;
        transition: all .2s;
    }
`;

export default Invite

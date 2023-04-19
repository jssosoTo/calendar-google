import React, { useRef } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import styled from 'styled-components';

const Location = ({location, changeValue}) => {
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
                <div className='task-icon'><IoLocationOutline /></div>
                <div className='set-task-container'>
                    <input 
                        type="text" 
                        placeholder='添加地点'
                        name="location"
                        value={location}
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

export default Location

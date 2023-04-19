import React from 'react';
import { TbSwitchHorizontal } from 'react-icons/tb';
import { GoTriangleDown } from 'react-icons/go';
import styled from 'styled-components';

const SetTimeLong = ({setWholeDay}) => {
    return (
        <Wrapper>
            <div className='set-time-total-container'>
                <div className='set-time-icon'><TbSwitchHorizontal /></div>
                <div className='set-time-container'>
                    <div className='date-clock-container'>
                        <div className='particular-time-container'>
                            我的任务 <GoTriangleDown />
                        </div>
                        <div className='checkbox-container'>
                            <input 
                                type="checkbox" 
                                name="time" 
                                id='wholeDay' 
                                value="wholeDay"
                                onClick={setWholeDay}
                            />
                            <label htmlFor='wholeDay'>全天</label>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .set-time-total-container {
        display: flex;
        align-items: center;
        height: 4rem;
    }
    .set-time-total-container .set-time-icon {
        position: relative;
        width: 2rem;
        margin-right: .7rem;
    }
    .set-time-total-container .set-time-icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1.5rem;
        height: 1.5rem;
    }
    .set-time-container {
        flex: 1;
        height: 3.5rem;
        padding: .5rem .5rem;
    }
    .set-time-container .date-clock-container {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .set-time-container .date-clock-container .particular-time-container {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 5.5rem;
        height: 2.5rem;
        padding: 0 .4rem 0 .7rem;
        font-size: 14px;
    }
    .set-time-container .date-clock-container .particular-time-container:hover {
        border-radius: 5px;
        background-color: rgba(200, 200, 200, .2);
    }
    .set-time-container .date-clock-container .particular-time-container svg {
        width: 20%;
        height: 20%;
    }
    .set-time-container .date-clock-container .checkbox-container {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 4rem;
        height: 2.5rem;
        padding: 0 0 0 .7rem;
        font-size: 14px;
    }
    .set-time-container .date-clock-container .checkbox-container input {
        position: relative;
        cursor: pointer;
        width: 40%;
        height: 40%;
    }
    .set-time-container .date-clock-container .checkbox-container input:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .2);
    }
`;

export default SetTimeLong

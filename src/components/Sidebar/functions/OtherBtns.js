import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const OtherBtns = () => {
    const optionsContainer = useRef(null);
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
                    <h3 className='my-calendar'>其他日历</h3>
                    {isHiding ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </div>
                <div className='options' ref={optionsContainer}>
                    <div className='festival'>
                        <input 
                            type="checkbox" 
                            name="festival" 
                            id="festival" 
                            value="festival"
                        />
                        <label htmlFor='festival'>中国节假日</label>
                    </div>
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
        width: 1rem;
        height: 1rem;
        margin-right: 1rem;
    }
    label {
        flex: 1;
        height: 100%;
        line-height: 1.7rem;
    }
`;

export default OtherBtns

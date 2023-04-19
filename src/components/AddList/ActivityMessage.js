import React, {useRef} from 'react';
import styled from 'styled-components';
import { VscListSelection } from 'react-icons/vsc';

const ActivityMessage = ({detail, changeValue}) => {
    const lineContainer = useRef(null);
    const inputContainer = useRef(null);
    const divContainer = useRef(null);

    const showLine = () => {
        divContainer.current.style.height = '8rem';
        inputContainer.current.style.height = '100%';
        lineContainer.current.classList.remove('hide-line');
    };
    const hideLine = () => {
        lineContainer.current.classList.add('hide-line');
        inputContainer.current.style.height = '2.5rem';
        divContainer.current.style.height = '2.5rem';
    };

    return (
        <Wrapper>
            <div ref={divContainer} className='message-total-container'>
                <div className='message-icon'><VscListSelection /></div>
                <div className='set-message-container'>
                    <textarea 
                        ref={inputContainer}
                        placeholder='添加说明'
                        value={detail}
                        name='detail'
                        onChange={changeValue}
                        onFocus={showLine}
                        onBlur={hideLine}
                    ></textarea>
                    <div ref={lineContainer} className='underline hide-line' />
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .message-total-container {
        display: flex;
        align-items: center;
        height: 2.5rem;
        transition: all .2s;
        margin-bottom: 2rem;
    }
    .message-total-container .message-icon {
        position: relative;
        width: 2rem;
        height: 100%;
        margin-right: .7rem;
    }
    .message-total-container .message-icon svg {
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 1.5rem;
        height: 1.5rem;
    }
    .set-message-container {
        position: relative;
        flex: 1;
        height: 100%;
        padding: .5rem 0px;
    }
    .set-message-container textarea {
        width: 100%;
        height: 2.5rem;
        outline: none;
        border: transparent;
        background-color: #eee;
        resize: none;
        font-size: 15px;
        padding: .5rem;
        border-radius: 5px;
    }
    .set-message-container .underline {
        position: absolute;
        bottom: 7px;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 100%;
        background-color: blue;
    }
    .set-message-container .hide-line {
        width: 0px;
    }
`;

export default ActivityMessage

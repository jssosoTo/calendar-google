import React, { useRef } from 'react'
import styled from 'styled-components';
import { VscListSelection } from 'react-icons/vsc';

const Content = ({detail, changeValue}) => {
    const lineContainer = useRef(null);

    const showLine = () => {
        lineContainer.current.style.width = '100%';
    };
    const hideLine = () => {
        lineContainer.current.style.width = '0px';
    };

    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'><VscListSelection /></div>
                <div className='title-container'>
                    <textarea 
                        placeholder='添加说明' 
                        name="detail"
                        value={detail}
                        onChange={changeValue}
                        onFocus={showLine} 
                        onBlur={hideLine}
                    ></textarea>
                    <div ref={lineContainer} className='underline'></div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    margin-top: 1rem;
    .line-show {
        height: 7rem!important;
    }
    .line-show .event-icon {
        height: 100%;
    }
    .line-show .event-icon svg {
        top: 5px!important;
        transform: translate(-50%, 0px)!important;
    }
    .title-container {
        position: relative;
        flex: 1;
        height: 100%;
    }
    .title-container textarea {
        resize: none;
        outline: none;
        height: 100%;
        width: 100%;
        border: transparent;
        background: rgba(200, 200, 200, .3);
        border-radius: 5px;
        padding: .5rem;
        font-size: 14px;
    }
    .underline {
        width: 0px;
        background-color: rgb(66,133,244);
    }
`;

export default Content

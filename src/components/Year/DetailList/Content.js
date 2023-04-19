import React from 'react';
import { VscListSelection } from 'react-icons/vsc';
import styled from 'styled-components';

const Content = ({detail}) => {
    return (
        <Wrapper>
            <div className={`line-show ${detail.length > 36 && `show-more`} ${(detail.length > 18 && detail.length <= 36) && 'show-extend'}`}>
                <div className='event-icon'><VscListSelection /></div>
                <div className='set-time-container'>
                    {/* {detail.length > 18 ? `${detail.slice(0, 18)}...` : detail} */}
                    <span>{detail}</span>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .event-icon {
        height: 3.5rem!important;
    }
    .set-time-container {
        font-size: 14px;
        width: 19rem;
        height: 100%;
        line-height: 3.5rem;
    }
    .show-extend {
        height: 5rem;
    }
    .show-extend .set-time-container {
        display: flex;
        align-items: center;
        line-height: 14px!important;
    }
    .show-extend .set-time-container span {
        display: block;
        width: 100%;
        word-wrap:break-word;
    }
    .show-more {
        height: 8rem!important;
    }
    .show-more .set-time-container {
        display: flex;
        align-items: center;
        line-height: 14px!important;
        max-height: 8rem;
        overflow: auto;
    }
    .show-more .set-time-container::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    .show-more .set-time-container::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /*定义滑块
    内阴影+圆角*/
    .show-more .set-time-container::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    .show-more .set-time-container:hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    .show-more .set-time-container span {
        display: block;
        width: 100%;
        word-wrap:break-word;
    }
`;

export default Content

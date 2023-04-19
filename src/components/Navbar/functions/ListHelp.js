import React from 'react'
import styled from 'styled-components';

const ListHelp = () => {
    return (
        <Wrapper>
            <div className='questions-list-container'>
                <ul className='questions-list'>
                    <li>帮助</li>
                    <li>培训</li>
                    <li>动态</li>
                </ul>
                <hr />
                <div className='report'>反馈给谷歌</div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    z-index: 9999;
    top: 20px;
    right: 0px;
    .questions-list-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 10rem;
        height: 10rem;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, .3);
    }
    .questions-list {
        list-style-type: none;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }
    .questions-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 2rem;
        line-height: 2rem;
        width: 100%;
        padding: 0 1rem;
        transition: all .3s;
    }
    .questions-list li:hover {
        padding-left: 1.5rem;
        background-color: rgba(200, 200, 200, .3);
    }
    .report {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        margin-top: .3rem;
        height: 2.3rem;
        line-height: 2.3rem;
        width: 100%;
        padding: 0 1rem;
        transition: all .3s;
    }
    .report:hover {
        padding-left: 1.5rem;
        background-color: rgba(200, 200, 200, .3);
    }
`;

export default ListHelp

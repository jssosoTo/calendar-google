import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListFunctions = ({removeList, changeDateTitle}) => {
    return (
        <Wrapper onBlur={removeList}>
            <div className='list-container' onClick={removeList}>
                <div className='show-today'>
                    <span onClick={() => changeDateTitle('日')}>
                        <Link to='/day'>日</Link>
                    </span>
                    <span>D</span>
                </div>
                <div className='show-week'>
                    <span onClick={() => changeDateTitle('周')}>
                        <Link to='/week'>周</Link>
                    </span>
                    <span>W</span>
                </div>
                <div className='show-month'>
                    <span onClick={() => changeDateTitle('月')}>
                        <Link to='/month'>月</Link>
                    </span>
                    <span>M</span>
                </div>
                <div className='show-today'>
                    <span onClick={() => changeDateTitle('年')}>
                        <Link to='/'>年</Link>
                    </span>
                    <span>Y</span>
                </div>
                <div className='show-today'>
                    <span onClick={() => changeDateTitle('日程')}>
                        <Link to='/agenda'>日程</Link>
                    </span>
                    <span>A</span>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    z-index: 999;
    bottom: -100%;
    right: 0px;
    transform: translateY(88%);

    .list-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 12rem;
        height: 18rem;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, .3);
        background-color: #fff;
    }
    .list-container div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 3rem;
        line-height: 2rem;
        width: 100%;
        padding: 0 1rem;
        transition: all .3s;
    }
    .list-container div:hover {
        padding-left: 1.5rem;
        background-color: rgba(200, 200, 200, .3);
    }
    .list-container div span:first-child {
        flex: 1;
        text-align: left;
    }
    .list-container div span:last-child {
        font-size: 12px;
        color: gray;
    }
    a {
        display: block;
        width: 100%;
        text-decoration: none;
        color: black;
    }
`;

export default ListFunctions

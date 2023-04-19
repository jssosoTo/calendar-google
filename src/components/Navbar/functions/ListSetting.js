import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListSetting = ({removeSettingList}) => {
    return (
        <Wrapper>
            <div className='setting-list-container' onClick={removeSettingList}>
                <ul className='setting-list'>
                    <li>设置</li>
                    <li>
                        <Link 
                            to='/recycle'
                        >回收站</Link>
                    </li>
                </ul>
                <hr />
                <div className='theme'>密度和颜色</div>
                <hr />
                <div className='get-extension'>获取插件</div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    z-index: 999;
    top: 22px;
    left: 0px;
    .setting-list-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 8rem;
        height: 12rem;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, .3);
    }
    .setting-list {
        list-style-type: none;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }
    .setting-list li {
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
    .setting-list li:hover {
        padding-left: 1.5rem;
        background-color: rgba(200, 200, 200, .3);
    }
    .setting-list li a {
        text-decoration: none;
        color: black;
        display: block;
        text-align: left;
        width: 100%;
    }
    .theme,
    .get-extension {
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
    .theme {
        margin-bottom: .5rem;
    }
    .get-extension {
        margin-top: .5rem;
    }
    .theme:hover,
    .get-extension:hover {
        padding-left: 1.5rem;
        background-color: rgba(200, 200, 200, .3);
    }
`;

export default ListSetting

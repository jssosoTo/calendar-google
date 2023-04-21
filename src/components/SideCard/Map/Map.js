import React, { useEffect } from 'react';
import styled from 'styled-components';
import BMap from './BMap';
import { GrShare } from 'react-icons/gr';
import { useGlobalContext } from '../../../Providers/AppProvider';
import List from './List';

const MapContainer = ({setIsSideCardShow}) => {
    const { switchMapCard, mapList, addSearchList } = useGlobalContext();

    const changeUrl = () => {
        window.location = 'baidumap';
    };

    return (
        <Wrapper>
            <div className='task-list-container'>
                <div className='task-title-container'>
                    <div className='title'>
                        <h4 className='en-title'>地图</h4>
                        <h3 className='zh-title'>探索</h3>
                    </div>
                    <div className='close-icon'>
                        <button 
                            className='new-btn'
                            onClick={() => changeUrl()}
                        >
                            <GrShare />
                        </button>
                        <button 
                            className='close-btn'
                            onClick={() => {
                                setIsSideCardShow(false);
                                switchMapCard();
                            }}
                        >X</button>
                    </div>
                </div>
                <div className='whole-lists-container'>
                    <div className='map-container' id="container">
                        <BMap addSearchList={addSearchList} />
                    </div>
                    <div className='nearly-search'>
                        <h2 className='title'>最近搜索</h2>
                        <div className='search-lists-container'>
                            {
                                mapList.map((item, i) => {
                                    return <List key={i} content={item} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};


const Wrapper = styled.section`
    .task-title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
        border-bottom: 1px solid rgb(240, 240, 240);
    }
    .title {
        padding-left: 1rem;
    }
    .en-title, .zh-title {
        font-weight: normal;
    }
    .en-title {
        font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
        font-size: 13px;
        color: gray;
    }
    .zh-title {
        letter-spacing: .1em;
        font-size: 15px;
        color: rgb(100, 100, 100);
    }
    .close-icon {
        padding-right: .5rem;
        display: flex;
        align-items: center;
    }
    .close-btn,
    .new-btn {
        cursor: pointer;
        font-size: 15px;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 50%;
        border: transparent;
        background-color: transparent;
    }
    .new-btn {
        position: relative;
    }
    .new-btn svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .close-btn:hover,
    .new-btn:hover {
        background-color: rgba(200, 200, 200, .1);
    }
    .lists-container {
        flex: 1;
        transition: all .2s;
    }
    .whole-lists-container {
        position: relative;
        height: calc(100vh - 4rem);
        /* overflow: auto; */
        transition: all .3s;
    }
    .search-lists-container {
        max-height: 468px;
        overflow: auto;
    }
    .search-lists-container::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: transparent;
    }
    /*定义滚动条轨道
    内阴影+圆角*/
    .search-lists-container::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /*定义滑块
    内阴影+圆角*/
    .search-lists-container::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color: rgb(220, 220, 220);
    }
    .search-lists-container:hover::-webkit-scrollbar-thumb {
        background-color: rgb(200, 200, 200);
    }
    .nearly-search h2 {
        text-align: center;
        height: 3rem;
        line-height: 3rem;
        font-weight: normal;
        font-size: 15px;
        color: #1A73E8;
        border-bottom: 1px solid lightgray;
    }
`;

export default MapContainer;

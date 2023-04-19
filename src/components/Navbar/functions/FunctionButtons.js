import React, { useState, useRef, useEffect } from 'react';
import { 
    AiOutlineLeft, 
    AiOutlineRight, 
    AiOutlineSearch, 
    AiOutlineQuestionCircle, 
    AiOutlineSetting,
    AiOutlineCaretDown
} from 'react-icons/ai';
import ListFunctions from './ListFunctions';
import ListHelp from './ListHelp';
import ListSetting from './ListSetting';
import styled from 'styled-components';
import { useGlobalContext } from '../../../Providers/AppProvider';

const FunctionButtons = () => {
    const {
        date: {year, thisMonth}, 
        clickQueryDate: {queryYear, queryMonth, queryDay}, 
        switchYear, 
        switchMonth, 
        getDate, 
        switchSearchIptOpen,
        setQueryDayDate,
        setBinBar
    } = useGlobalContext();
    const dateContainer = useRef(null);
    const detailDateContainer = useRef(null);
    const [isHiding, setIsHiding] = useState(true);
    const [isQHiding, setIsQHiding] = useState(true);
    const [isSHiding, setIsSHiding] = useState(true);

    const removeList = () => {
        setIsHiding(true);
    };
    const removeSettingList = () => {
        setIsSHiding(true);
    }
    const changeDateTitle = (text) => {
        dateContainer.current.textContent = text;
    };
    const setDateContent = () => {
        const page = document.location.pathname;
        if (page === '/') {
            detailDateContainer.current.textContent = `${year}`;
        }
        if (page === '/month') {
            dateContainer.current.textContent = '月';
            detailDateContainer.current.textContent = `${year}年${thisMonth}月`;
        }
        if (page === '/day') {
            dateContainer.current.textContent = '日';
            detailDateContainer.current.textContent = `${year}年${thisMonth}月${queryDay}日`;
        }
        if (page === '/week') {
            dateContainer.current.textContent = '周';
        }
        if (page === '/agenda') {
            dateContainer.current.textContent = '日程';
            detailDateContainer.current.textContent = `${year}年${thisMonth}月日程`;
        }
        if (page === '/search') {
            dateContainer.current.textContent = '搜索';
            detailDateContainer.current.textContent = `搜索页面`;
        }
        if (page === '/recycle') {
            setBinBar(true);
        } else {
            setBinBar(false);
        }
    }

    useEffect(() => {
        setDateContent();
    }, [thisMonth, document.location.pathname, queryDay])

    return (
        <div className='function-btns'>
            <div className='left-btns'>
                <div className='switch-today'>
                    <button onClick={getDate}>
                        今天
                    </button>
                </div>
                <div className='switch-date'>
                    {
                        document.location.pathname === '/' ? (
                            <>
                                <button onClick={() => switchYear('prev')}>
                                    <AiOutlineLeft />
                                </button>
                                <button onClick={() => switchYear('next')}>
                                    <AiOutlineRight />
                                </button>
                            </>
                        ) : document.location.pathname === '/month' ? (
                            <>
                                <button onClick={() => switchMonth('prev')}>
                                    <AiOutlineLeft />
                                </button>
                                <button onClick={() => switchMonth('next')}>
                                    <AiOutlineRight />
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setQueryDayDate(queryYear, queryMonth, queryDay - 1)}>
                                    <AiOutlineLeft />
                                </button>
                                <button onClick={() => setQueryDayDate(queryYear, queryMonth, queryDay + 1)}>
                                    <AiOutlineRight />
                                </button>
                            </>
                        )
                    }
                </div>
                <div className='show-date'>
                    <div ref={detailDateContainer}>{year}</div>
                </div>
            </div>
            <div className='right-btns'>
                <div className='set-btns'>
                    <button className='icon' onClick={switchSearchIptOpen}>
                        <AiOutlineSearch />
                    </button>
                    <div className="question-container">
                        <button className='icon' onBlur={() => setIsQHiding(true)} onClick={() => setIsQHiding(!isQHiding)}>
                            <AiOutlineQuestionCircle />
                        </button>
                        {!isQHiding && <ListHelp />}
                    </div>
                    <div className='setting-container'>
                        <button className='icon' onClick={() => setIsSHiding(!isSHiding)}>
                            <AiOutlineSetting />
                        </button>
                        {!isSHiding && <ListSetting removeSettingList={removeSettingList} />}
                    </div>
                    <div className='choose-date-container' style={{position: 'relative'}}>
                        <button 
                            className={`choose-date ${isHiding ? '' : 'gray-bgc'}`}
                            onClick={() => setIsHiding(!isHiding)}
                        >
                            <span ref={dateContainer}>年</span>
                            <AiOutlineCaretDown />
                        </button>
                        {!isHiding && <ListFunctions changeDateTitle={changeDateTitle} removeList={removeList} />}
                    </div>
                </div>
            </div>
        </div>
    )
};

const Wrapper = styled.section`
    .function-btns {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .left-btns {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 16rem;
        height: 100%;
    }
    .switch-today {
        width: 4rem;
        height: 100%;
        line-height: 4rem;
    }
    .switch-today button {
        cursor: pointer;
        width: 100%;
        height: 2.5rem;
        background-color: transparent;
        border: 1px solid lightgray;
        border-radius: 10%;
    }
    .switch-today button:hover {
        background-color: rgba(150, 150, 150, .1);
    }
    .switch-date {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 4rem;
        height: 100%;
        line-height: 4rem;
        text-align: center;
    }
    .switch-date button {
        position: relative;
        cursor: pointer;
        width: 40%;
        height: 40%;
        border-color: transparent;
        background-color: transparent;
    }
    .switch-date button:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(150, 150, 150, .1);
    }
    .switch-date button svg {
        width: 100%;
        height: 100%;
    }
    .show-date {
        flex: 1;
        /* font-size: auto!important; */
        letter-spacing: 0.1em;
    }
    .show-date div {
        line-height: 1.3rem;
    }
    .set-btns {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        width: 13rem;
        height: 100%;
        line-height: 4rem;
    }
    .set-btns button {
        cursor: pointer;
        position: relative;
        width: 1.5rem;
        height: 40%;
        border-color: transparent;
        background-color: transparent;
    }
    .set-btns .icon:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(150, 150, 150, .1);
    }
    .set-btns button svg {
        position: absolute;
        color: #5f6368;
        width: 1.5rem;
        height: 1.6rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .set-btns .choose-date {
        cursor: pointer;
        width: 4rem;
        height: 2.5rem;
        background-color: transparent;
        border: 1px solid lightgray;
        border-radius: 10%;
    }
    .set-btns .choose-date span {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translate(0, -50%);
    }
    .set-btns .choose-date svg {
        width: 0.7rem;
        left: 2.5rem;
        transform: translate(0, -50%);
    }
    /* .list-container {
        position: absolute;
        bottom: -12rem;
        left: 0px;
        transform: translateY(12rem);
        width: 5rem;
        height: 12rem;
    }
    .list-container div {
        height: 2rem;
    } */
`;

export default FunctionButtons

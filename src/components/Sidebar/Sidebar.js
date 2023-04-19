import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { CurrentMonth, FilterBtns, OtherBtns, ListFunctions } from './functions';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';

const Sidebar = ({isHiding}) => {
    const lineContainer = useRef(null);
    const [isListHiding, setIsListHiding] = useState(true);

    const addBorderLine = () => {
        lineContainer.current.classList.add('hidden-line');
    };
    const removeBorderLine = () => {
        lineContainer.current.classList.remove('hidden-line');
    };
    const closeListShow = () => {
        setIsListHiding(true);
    };

    return (
        <Wrapper>
            <aside className={`left-functions ${isHiding ? 'hide-sidebar' : ''}`}>
                <div className='create-notes'>
                    <button 
                        className={`create-btn ${isHiding ? 'fix-btn' : ''} ${isListHiding ? '' : 'gray-bgc'}`}
                        onClick={() => setIsListHiding(!isListHiding)}
                    >
                        <GrAdd className='add-icon' />
                        {
                            !isHiding &&    (<>
                                <span>创建</span>
                                <AiOutlineCaretDown className='extend-icon' />
                            </>)
                        }
                        
                    </button>
                    {!isListHiding && <ListFunctions closeListShow={closeListShow} />}
                </div>
                <div className={`date-functions ${isHiding ? 'hide-functions' : ''}`}>
                <CurrentMonth />
                <div className='input-container'>
                    <div className='search-people'>
                        <input 
                            type="text" 
                            placeholder=' 👤 找人' 
                            onFocus={addBorderLine}
                            onBlur={removeBorderLine}
                        />
                        <div ref={lineContainer} className='underline'></div>
                    </div>
                </div>
                <div className='filters'>
                    <FilterBtns />
                    <OtherBtns />
                </div>
                <div className='declaration'>
                    <span>Created By <a href="https://github.com/jssosoTo" target="_blank">P0PC0RN</a> - Source From <a href="https://www.google.com" target="_blank">Google</a></span>
                </div>
                </div>
            </aside>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    height: 100%;

    .hide-sidebar {
        /* transform: translateX(-100%); */
        width: 0px!important;
        margin-right: 5rem;
    }
    .hide-functions {
        overflow: hidden;
        width: 0px;
    }
    .left-functions {
        display: flex;
        flex: none;
        flex-direction: column;
        justify-content: space-between;
        width: 16rem;
        height: 100%;
        border-right: 1px solid lightgray;
        transition: all .3s;
    }
    .date-functions {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .create-notes {
        position: relative;
        z-index: 999;
        scale: .9;
        margin-top: 1rem;
        margin-bottom: .5rem;
        /* padding-left: .1rem; */
    }
    .fix-btn {
        position: relative;
        top: 3px;
        left: 10px;
        width: 3.5rem!important;
        height: 3.5rem!important;
    }
    .create-notes .create-btn {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
        width: 8rem;
        height: 3rem;
        border-radius: 3rem;
        background-color: transparent;
        border: 1px solid lightgray;
        box-shadow: 0px 1px rgba(0, 0, 0, .2);
        font-size: 1rem;
        transition: all .3s;
    }
    .create-notes .create-btn:hover {
        box-shadow: 0px 10px 15px 2px rgba(0, 0, 0, .2);
        background-color: aliceblue;
    }
    .create-notes .create-btn .add-icon {
        width: 1.5rem;
        height: 3rem;
        scale: 1.2;
    }
    .create-notes .create-btn .extend-icon {
        scale: .7;
    }
    .input-container {
        height: 3rem;
        padding: 0 2rem 0 1.5rem;
        margin-bottom: .5rem;
    }
    .search-people {
        position: relative;
        height: 2rem;
        line-height: 2rem;
        background-color: rgba(0, 0, 0, .1);
        border-radius: 5px;
        overflow: hidden;
    }
    .search-people input {
        outline: none;
        border-color: transparent;
        background-color: transparent;
        padding-left: .7rem;
    }
    .underline {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 0px;
        height: 2px;
        background-color: blue;
        transition: all .4s;
    }
    .hidden-line {
        width: 100%;
    }
    /* .add-bottom-border {
        border-bottom: 2px solid blue;
    } */
    .filters {
        flex: 1;
    }
    .declaration {
        height: 1.5rem;
        color: #70757A;
        font-size: 5px;
        font-weight: bold;
        scale: .8;
    }
    .declaration a {
        text-decoration: none;
        color: #70757A;
    }
    .gray-bgc {
        background-color: rgb(200, 200, 200)!important;
    }
`;

export default Sidebar

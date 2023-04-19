import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import { Modal, FunctionButtons, ShowInfo, SearchInput } from './functions';
import BinBar from './functions/BinBar';


const Navbar = ({switchSidebar}) => {
    const {searchContent, binBar} = useGlobalContext();

    return (
        <Wrapper>
            <header>
                {
                    (!searchContent.show && !binBar) && (
                        <>
                            <Modal switchSidebar={switchSidebar} />
                            <FunctionButtons />
                        </>
                    )
                }
                {
                    searchContent.show && <SearchInput />
                }
                {
                    binBar && <BinBar />
                }
                <ShowInfo />
            </header>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    header {
        display: flex;
        min-width: 850px;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        /* vertical-align: middle; */
        padding: 0 1.5rem;
        height: 4rem;
        border-bottom: 1px solid lightgray;
    }

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
        width: 17rem;
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
        width: 3rem;
        height: 100%;
        line-height: 4rem;
        text-align: center;
        margin: 0px .5rem;
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
        font-size: 17px;
        letter-spacing: 0.1em;
    }
    .show-date div {
        line-height: 1.3rem;
    }
    .set-btns {
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
        left: 2.8rem;
        transform: translate(0, -50%);
    }
    
    .set-btns .question-container {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
    }
    .set-btns .setting-container {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
    }

    /* .user-info {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        width: 6rem;
        margin-left: 2.5rem;
    }
    .user-info .show-apps {
        width: 2rem;
        height: 2rem;
    }
    .user-info .show-apps a {
        position: absolute;
        text-decoration: none;
        color: black;
        width: 2rem;
        height: 2rem;
    }
    .user-info .show-apps a:hover::after {
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
    .user-info .show-apps a svg {
        vertical-align: middle;
        width: 2rem;
        height: 2rem;
    }
    .user-info .show-user-img {
        width: 3rem;
    }
    .user-info .show-user-img img {
        vertical-align: middle;
        width: 2.5rem;
        border-radius: 50%;
        object-fit: fill;
    } */
`;

export default Navbar

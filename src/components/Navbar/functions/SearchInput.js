import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import { BiLeftArrowAlt, BiSearch, BiCaretDown } from 'react-icons/bi';
import { useGlobalContext } from '../../../Providers/AppProvider';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const SearchInput = () => {
    const { switchSearchIptOpen, submitSearchKey, searchContent } = useGlobalContext();
    const inputContainer = useRef(null);
    const [title, setTitle] = useState(searchContent.keywords);

    const setFocusStyle = () => {
        inputContainer.current.classList.add('focus-style');
    };
    const setBlurStyle = () => {
        inputContainer.current.classList.remove('focus-style');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        submitSearchKey(title);
        // const history = useHistory();
        // history.push('/search');
        document.location.pathname = '/search';
    }

    return (
        <Wrapper>
            <form className='search-items-container' onSubmit={handleSubmit} action='/search'>
                <div className='return-btn-container'>
                    <span className='return-functions' onClick={switchSearchIptOpen}>
                        <BiLeftArrowAlt />
                    </span>
                    <span className='search-words'>搜索</span>
                </div>
                <div className='search-function-container'>
                    <div className='items-container' ref={inputContainer}>
                        <Link
                            to='/search'
                            type='submit'
                            className='search-icon'
                            onClick={() => submitSearchKey(title)}
                        ><BiSearch /></Link>
                        <input 
                            className='search-input' 
                            type="text" 
                            placeholder='搜索' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onFocus={setFocusStyle}
                            onBlur={setBlurStyle}
                        />
                        {/* <div className='options-icon'><BiCaretDown /></div> */}
                    </div>
                </div>
            </form>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    flex: 1;
    .search-items-container {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
    }
    .return-btn-container {
        display: flex;
        align-items: center;
        width: 14rem;
    }
    .return-btn-container .return-functions {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-color: transparent;
        background-color: transparent;
        width: 2.5rem;
        height: 2.5rem;
    }
    .return-btn-container .return-functions:hover {
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .3);
    }
    .return-btn-container .return-functions svg {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2rem;
        height: 2rem;
    }
    .return-btn-container .search-words {
        margin-left: 1rem;
        font-size: 1.3rem;
    }
    .search-function-container {
        flex: 1;
        max-width: 48rem;
        padding-left: 2rem;
    }
    .search-function-container .items-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 3rem;
        padding-left: .5rem;
        padding-right: .5rem;
        border-radius: 10px;
        background-color: #eee;
    }
    .search-icon {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border: transparent;
        background-color: transparent;
        line-height: 50px;
        text-align: center;
        margin-right: .2rem;
    }
    .search-icon:hover {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .1);
    }
    .search-icon svg {
        width: 50%;
        height: 50%;
    }
    .search-input {
        flex: 1;
        height: 30px;
        outline: none;
        border: transparent;
        background-color: transparent;
    }
    .options-icon {
        cursor: pointer;
        width: 40px;
        height: 40px;
        line-height: 50px;
        text-align: center;
    }
    .options-icon:hover {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .1);
    }
    .options-icon svg {
        width: 50%;
        height: 50%;
    }
    .focus-style {
        background-color: #fff!important;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, .2);
    }
`;

export default SearchInput

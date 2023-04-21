import React from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import styled from 'styled-components';

const List = ({content}) => {
    return (
        <Wrapper>
            <div className='single-list-container'>
                <span className='icon'><AiOutlineFieldTime /></span>
                <span className='search-title'>{content}</span>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .single-list-container {
        display: flex;
        align-items: center;
        height: 3.5rem;
    }
    .single-list-container:hover {
        background-color: rgba(240, 240, 240, .5);
    }
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
    }
    .icon svg {
        color: gray;
        width: 1.7rem;
        height: 1.7rem;
    }
    .search-title {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

export default List

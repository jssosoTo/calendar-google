import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Error = () => {
    return (
        <Wrapper>
            <h2>404 NOT FOUND</h2>
            <div className='path-container'>
                <Link to='/' className='path-class'>BACK TO INDEX</Link>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgb(214, 246, 231);
    background-color: rgb(240, 240, 240);
    h2 {
        margin-top: 15%;
        text-align: center;
        font-size: 40px;
        font-weight: normal;
    }
    .path-container {
        text-align: center;
        margin-top: 1rem;
    }
    .path-class {
        cursor: pointer;
        display: inline-block;
        padding: .5rem;
        background-color: rgb(66,133,244);
        color: white;
        text-decoration: none;
        border-radius: 8px;
    }
    .path-class:hover {
        background-color: rgb(25,103,210);
    }
`;

export default Error

import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import styled from 'styled-components';

const Map = ({location, changeValue}) => {
    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'><IoLocationOutline /></div>
                <div className='title-container'>
                    <input 
                        type="text"
                        name="location"
                        value={location}
                        onChange={changeValue}
                    ></input>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    margin-top: 1rem;
    .title-container {
        height: 100%;
        background-color: rgba(200, 200, 200, .3);
        border-radius: 5px;
        overflow: hidden;
    }
    .title-container input {
        outline: none;
        border: transparent;
        background: transparent!important;
        width: 100%;
        height: 100%;
        font-size: 15px;
        margin-right: 1rem;
        padding-left: .5rem;
    }
`;

export default Map

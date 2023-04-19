import React from 'react';
import { FiUsers } from 'react-icons/fi';
import styled from 'styled-components';

const Invite = ({email, changeValue}) => {
    return (
        <Wrapper>
            <div className={`line-show`}>
                <div className='event-icon'><FiUsers /></div>
                <div className='title-container'>
                    <input 
                        type="email"
                        name="email"
                        value={email}
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

export default Invite

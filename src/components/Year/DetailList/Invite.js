import React from 'react'
import styled from 'styled-components';
import { FiUsers } from 'react-icons/fi';

const Invite = ({email}) => {
    return (
        <Wrapper>
            <div className={`line-show`}>
                <div className='event-icon'><FiUsers /></div>
                <div className='set-time-container'>
                    <h4>1位邀请对象</h4>
                    <span>{email}</span>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .set-time-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .set-time-container h4 {
        font-weight: normal;
    }
    .set-time-container span {
        color: gray;
        font-size: 13px;
    }
`;

export default Invite

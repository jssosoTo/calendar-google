import React from 'react';
import { CgLayoutGridSmall } from 'react-icons/cg';
import styled from 'styled-components';

const ShowInfo = () => {
    return (
        <Wrapper>
        <div className='user-info'>
            <div className='show-apps'>
                <a href="https://github.com/jssosoTo"><CgLayoutGridSmall /></a>
            </div>
            <div className='show-user-img'>
                <img src="https://avatars.githubusercontent.com/u/101981442?v=4" alt="User Img" />
            </div>
        </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .user-info {
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
        position: relative;
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
    }
`;

export default ShowInfo

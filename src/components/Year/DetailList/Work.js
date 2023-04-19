import React from 'react';
import { MdOutlineWorkOutline } from 'react-icons/md';
import styled from 'styled-components';

const Work = () => {
    return (
        <Wrapper>
            <div className={`line-show`}>
                <div className='event-icon'><MdOutlineWorkOutline /></div>
                <div className='set-time-container'>
                    <span>P0PC0RN</span>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`

`;

export default Work

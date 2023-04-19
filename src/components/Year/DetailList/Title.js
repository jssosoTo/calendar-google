import React from 'react'
import styled from 'styled-components';

const Title = ({content}) => {
    return (
        <Wrapper>
            <div className='line-show'>
                <div className='event-icon'></div>
                <div className='event-title'>{content}</div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .line-show {
        height: 3.5rem;
    }
    .event-title {
        font-size: 22px;
    }
`;

export default Title

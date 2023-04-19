import React from 'react';
import styled from 'styled-components';
import { IoLocationOutline } from 'react-icons/io5';

const Map = ({location}) => {
    return (
        <Wrapper>
            <div className={`line-show`}>
                <div className='event-icon'><IoLocationOutline /></div>
                <div className='set-time-container'>
                    <span>{location}</span>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`

`;

export default Map

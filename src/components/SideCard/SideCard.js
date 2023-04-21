import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Task from './Task/Task';
import { useGlobalContext } from '../../Providers/AppProvider';
import Remind from './Remind/Remind';
import Activity from './Activity/Activity';
import Map from './Map/Map';

const SideCard = ({isSideCardShow, setIsSideCardShow, closeSidebar}) => {
    const {isTaskCardOpen, isRemindCardOpen, isActivityCardOpen, isMapCardOpen} = useGlobalContext();
    const cardContainer = useRef(null);

    useEffect(() => {
        if (isSideCardShow) {
            cardContainer.current.style.width = '18rem';
        } else {
            cardContainer.current.style.width = '0px';
        }
    }, [isSideCardShow])

    return (
        <Wrapper>
            <div ref={cardContainer} className='event-container'>
                {isTaskCardOpen && <Task setIsSideCardShow={setIsSideCardShow} />}
                {isRemindCardOpen && <Remind setIsSideCardShow={setIsSideCardShow} />}
                {isActivityCardOpen && <Activity setIsSideCardShow={setIsSideCardShow} />}
                {isMapCardOpen && <Map setIsSideCardShow={setIsSideCardShow} />}
            </div>
        </Wrapper>
    )
};


const Wrapper = styled.section`
    height: 100vh;
    box-shadow: -1px 0 3px 3px rgba(200, 200, 200, .4);
    .event-container {
        height: 100%;
        width: 0px;
        transition: all .2s;
    }
`;

export default SideCard

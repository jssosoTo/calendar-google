import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../Providers/AppProvider';

const ListFunctions = ({closeListShow}) => {
    const { openAddListModal } = useGlobalContext();

    const openListShow = (type) => {
        openAddListModal(type);
        closeListShow();
    }

    return (
        <Wrapper>
            <div className='add-event-list'>
                <div className='activity' onClick={() => openListShow('activity')}>活动</div>
                <div className='task' onClick={() => openListShow('task')}>任务</div>
                <div className='preserve-arrangement' onClick={() => openListShow('remind')}>预约安排</div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    bottom: -100%;
    left: 1rem;
    transform: translateY(70%);

    .add-event-list {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: .5rem 0 .5rem 0;
        width: 13rem;
        height: 8rem;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, .3);
        background-color: #fff;
    }
    .add-event-list div {
        cursor: pointer;
        height: 2rem;
        line-height: 2rem;
        width: 100%;
        padding-left: 1rem;
        transition: all .3s;
    }
    .add-event-list div:hover {
        padding-left: 1.5rem;
        background-color: rgba(200, 200, 200, .3);
    }
`;

export default ListFunctions

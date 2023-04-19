import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Providers/AppProvider';
import DetailList from './DetailList/DetailList';

const ListCard = () => {
    const {clickQueryDate, listModalPosition, lists, handleCloseQueryModal, switchListDetailCard, filters} = useGlobalContext();
    const [modalData, setModalData] = useState([]);
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

    const updateModalData = () => {
        const {queryYear: currentYear, queryMonth: currentMonth, queryDay: currentDay} = clickQueryDate;
        const thisDatesList = lists.filter(item => item.year === currentYear && item.month === currentMonth && item.day === currentDay);
        const filterDatesList = thisDatesList.filter(item => filters.find(select => select.id === item.type).checked);
        // setModalData(thisDatesList);
        setModalData(filterDatesList);
    }

    useEffect(() => {
        updateModalData();
    }, [clickQueryDate, lists, filters])

    return (
        <div className='list-modal' style={{top: listModalPosition.top, left: listModalPosition.left}}>
            <div className='modal-time'>
                <h3>周{weekdays[clickQueryDate.queryWeekDay]}</h3>
                <h2>{clickQueryDate.queryDay}</h2>
                <span className='close-icon' onClick={handleCloseQueryModal}>X</span>
            </div>
            <div className='modal-lists-container'>
                {
                    modalData.length === 0 && (
                        <div className='alert-text'>这一天没有安排活动。¯\(°_o)/¯</div>
                    )
                }
                {
                    modalData.map((item) => {
                            return (
                                <div className='single-list-container-parent' key={item.id} >
                                    <div 
                                        className={`single-list-container ${item.isDetailOpen && 'selected-list'}`}
                                        onClick={() => switchListDetailCard(item.id)}
                                    >
                                        <span className={`${item.type}-circle`}></span>
                                        <h4 className='list-content'>
                                            <span className={`time-modal-show ${item.finish ? 'complete-state' : ''}`}>{item.time}</span>
                                            <span className={`list-content-show ${item.finish ? 'complete-state' : ''}`}>{item.content}</span>
                                        </h4>
                                    </div>
                                    {item.isDetailOpen && <DetailList {...item} />}
                                </div>
                            )
                    })
                }
                {/* <div className='single-list-container'>
                    <span className={`task-circle`}></span>
                    <h4 className='list-content'>
                        <span className='time-modal-show'>17:00</span>
                        <span className='list-content-show'>typing</span>
                    </h4>
                </div>

                <div className='single-list-container'>
                    <span className={`remind-circle`}></span>
                    <h4 className='list-content'>
                        <span className='time-modal-show'>17:00</span>
                        <span className='list-content-show'>typing</span>
                    </h4>
                </div> */}
            </div>
        </div>
    )
};

const Wrapper = styled.section`

`;

export default ListCard

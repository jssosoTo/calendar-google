import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Providers/AppProvider';
import DetailList from '../Year/DetailList/DetailList';

const Time = ({thisDayList, time}) => {
    const { switchListDetailCard } = useGlobalContext();
    const [thisTimeList, setThisTimeList] = useState([]);

    const init = () => {
        const initialList = thisDayList.filter(item => item.time === `${time > 9 ? time : `0${time}`}:00`);
        setThisTimeList(initialList);
    };

    useEffect(() => {
        console.log(thisTimeList);
        init();
    }, [thisDayList, time])

    return (
        <div className='time-list-container'>
            <span className='time-zone'>
                {
                    time > 12 ? `下午${time - 12}点` : `上午${time}点`
                }
            </span>
            <div className='this-time-list-container'>
                {
                    thisTimeList.map((list) => {
                        return (
                            <>
                                <div 
                                    key={list.id} 
                                    className={`single-list ${list.type}-type ${list.finish ? 'complete-state' : ''}`}
                                    onClick={() => switchListDetailCard(list.id)}
                                >
                                    <span>{list.content}</span> , <span>{time > 12 ? `下午${time - 12}点` : `上午${time}点`}</span>
                                </div>
                                {list.isDetailOpen && <DetailList {...list} />}
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Time

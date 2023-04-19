import React, { useEffect, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { IconContext } from "react-icons";
import { BsTrash3 } from 'react-icons/bs';
import { useGlobalContext } from '../../../Providers/AppProvider';

const FinishedList = ({id, year, month, day, content}) => {
    const { switchFinishList, deleteList } = useGlobalContext();
    const [agoTitle, setAgoTitle] = useState('');
    const [isBtnShow, setIsBtnShow] = useState(false);

    useEffect(() => {
        const now = new Date();
        const days = Math.trunc((now - new Date(year, month - 1, day)) / (3600 * 24 * 1000));
        if (days <= 1) {
            setAgoTitle('今天');
        }   else if (days < 7) {
            setAgoTitle(`${days}天前`);
        } else {
            setAgoTitle(`${Math.trunc(days / 7)}周前`);
        }
    }, [year, month, day])

    return (
        <div 
            className='single-list-container'
            onMouseOver={() => setIsBtnShow(true)}
            onMouseOut={() => setIsBtnShow(false)}
        >
            <div 
                className='check-btn'
            >
                <button
                    onClick={() => switchFinishList(id)}
                >
                    <IconContext.Provider value={{ color: "#1A73E8"}}>
                        <BsCheck2 />
                    </IconContext.Provider>
                </button>
            </div>
            <div className='list-content-container'>
                <h6 className='list-title' style={{textDecoration: 'line-through'}}>{content}</h6>
                <div className='show-days-ago'>
                    <span className='show-day'>{agoTitle}</span>
                </div>
            </div>
            {
                isBtnShow && (
                    <div
                        className='delete-btn'
                    >
                        <button
                            onClick={() => deleteList(id)}
                        >
                            <BsTrash3 />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default FinishedList;

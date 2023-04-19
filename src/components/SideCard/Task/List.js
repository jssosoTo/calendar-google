import React, { useEffect, useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { IconContext } from "react-icons";
import { useGlobalContext } from '../../../Providers/AppProvider';

const List = ({id, year, month, day, content}) => {
    const { switchFinishList } = useGlobalContext();
    const [switchBtn, setSwitchBtn] = useState(false);
    const [agoTitle, setAgoTitle] = useState('');

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
        <div className='single-list-container'>
            <div 
                className='check-btn' 
                onMouseOver={() => setSwitchBtn(true)}
                onMouseOut={() => setSwitchBtn(false)}
            >
                {
                    switchBtn ? (
                        <button
                            onClick={() => switchFinishList(id)}
                        >
                            <IconContext.Provider value={{ color: "#1A73E8"}}>
                                <BsCheck2 />
                            </IconContext.Provider>
                        </button>
                    ) : (
                        <input type="radio" name="finish" id="finish" />
                    )
                }
            </div>
            <div className='list-content-container'>
                <h6 className='list-title'>{content}</h6>
                <div className='show-days-ago'>
                    <span className='show-day'>{agoTitle}</span>
                </div>
            </div>
        </div>
    )
}

export default List

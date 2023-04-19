import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../../Providers/AppProvider';

// https://restcountries.com/v3.1/name/${country}
const List = ({id, content, time, year, month, day, location, email, detail}) => {
    const { switchFinishList } = useGlobalContext();
    const [countryImg, setCountryImg] = useState('');

    const fetchImg = async () => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${location}`);
            const data = await response.json();
            const img = data.find(item => (item.name.common).toLowerCase() === location.toLowerCase()).flags.png;
            setCountryImg(img);
        } catch (err) {
            setCountryImg('');
            console.log(err);
        }
    }

    useEffect(() => {
        fetchImg();
    }, [])

    return (
        <Wrapper>
            <div className='single-remind-list-container'>
                <h4 className='remind-title'>{content}</h4>
                <div className='message-container'>
                    {location.length !== 0 && (
                        <div className='location-country'>
                            {countryImg.length !== 0 && <img src={countryImg}></img>}
                            {location.toUpperCase()}
                        </div>
                    )}
                    {
                        email.length !== 0 && (
                            <div className='user-container'>
                                <span>👥</span> {email}
                            </div>
                        )
                    }
                    {
                        detail.length !== 0 && (
                            <div className='content-container'>
                                <span>📝</span> {detail}
                            </div>
                        )
                    }
                    <div className='time-container'>
                        <div className='remind-date'>
                            {`${year}年${month}月${day}日`} {time}
                        </div>
                    </div>
                </div>
                <button 
                    className='finish-btn'
                    onClick={() => switchFinishList(id)}
                >活动完成</button>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .single-remind-list-container {
        position: relative;
        min-height: 4.5rem;
        width: 16rem;
        border-radius: 10px;
        padding: .5rem 1rem .5rem 1rem;
        border: 1px solid lightgray;
        margin-top: 10px;
    }
    .remind-title {
        text-align: center;
        font-size: 17px;
        font-weight: normal;
    }
    .time-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.5rem;
        line-height: 1.5rem;
        margin-top: 8px;
    }
    .remind-date {
        padding: 0 .5rem;
        letter-spacing: .1em;
        font-size: 14px;
        color: orangered;
        border: 1px solid lightgray;
        border-radius: calc(1.5rem / 2);
    }
    .location-country {
        display: flex;
        align-items: center;
        height: 2rem;
        line-height: 2rem;
        font-size: 14px;
    }
    .location-country img {
        height: 1rem;
        width: 2rem;
        object-fit: contain;
    }
    .user-container,
    .content-container {
        display: flex;
        align-items: center;
        height: 2rem;
        line-height: 2rem;
        font-size: 14px;
    }
    .user-container span,
    .content-container span {
        height: 100%;
        text-align: center;
        font-size: 18px;
        width: 2rem;
    }
    .single-remind-list-container:hover .finish-btn {
        display: block;
    }
    .finish-btn {
        cursor: pointer;
        display: none;
        position: absolute;
        top: .5rem;
        right: .5rem;
        padding: 5px;
        border: transparent;
        background-color: transparent;
        border: 1px solid lightgray;
        border-radius: 5px;
        color: gray;
    }
`;

export default List

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { AiOutlineRight } from 'react-icons/ai';
import { useGlobalContext } from '../../Providers/AppProvider';

const SearchBtns = ({isSideCardShow, setIsSideCardShow}) => {
    const [isHiding, setIsHiding] = useState(false);
    const {switchTaskCard, switchRemindCard, switchActivityCard, switchMapCard, isTaskCardOpen, isRemindCardOpen, isActivityCardOpen, isMapCardOpen} = useGlobalContext();
    const btnContainer = useRef(null);
    const sideBtnsContainer = useRef(null);

    const switchSidebar = () => {
        setIsHiding(oldValue => !oldValue);
        if (isHiding) {
            btnContainer.current.classList.remove('hide-container');
            sideBtnsContainer.current.style.display = 'block';
            sideBtnsContainer.current.style.display = 'flex';
        } else {
            btnContainer.current.classList.add('hide-container');
            sideBtnsContainer.current.style.display = 'none';
        }
    };
    const switchSidebarCard = (type) => {
        if (type === 'remind' && (isTaskCardOpen || isActivityCardOpen || isMapCardOpen)) {
            setIsSideCardShow(true);
        } else if (type === 'task' && (isRemindCardOpen || isActivityCardOpen || isMapCardOpen)) {
            setIsSideCardShow(true);
        } else if (type === 'map' && (isRemindCardOpen || isTaskCardOpen || isActivityCardOpen)) {
            setIsSideCardShow(true);
        } else if (type === 'activity' && (isRemindCardOpen || isTaskCardOpen || isMapCardOpen)) {
            setIsSideCardShow(true);
        } else {
            setIsSideCardShow(!isSideCardShow);
        }
    };

    return (
        <Wrapper>
            <div className='total-btns'>
                <aside ref={sideBtnsContainer} className='function-btns'>
                    <div className="btns-extend">
                        <div 
                            className={`icon ${isRemindCardOpen && 'show-light-orange'}`}
                            onClick={() => {
                                switchSidebarCard('remind');
                                switchRemindCard();
                            }}
                        >
                            <div>

                            <div 
                                className='keep-img' 
                                style={{
                                    backgroundImage: 'url(https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png)'
                                }} 
                                
                            />
                            </div>
                        </div>
                        <div 
                            className={`icon ${isTaskCardOpen && 'show-light-blue'}`}
                            onClick={() => {
                                switchSidebarCard('task');
                                switchTaskCard();
                            }}
                        >
                            <div>

                            <div 
                                className='tasks-img'
                                style={{
                                    backgroundImage: 'url(https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png)'
                                }} 
                            />
                            </div>
                        </div>
                        <div 
                            className={`icon ${isActivityCardOpen && 'show-light-blue'}`}
                            onClick={() => {
                                switchSidebarCard('activity');
                                switchActivityCard();
                            }}
                        >
                            <div>

                            <div 
                                className='contact-list-img' 
                                style={{
                                    backgroundImage: 'url(https://www.gstatic.com/companion/icon_assets/contacts_2022_2x.png)'
                                }} 
                                
                            />
                            </div>
                        </div>
                        <div 
                            className={`icon ${isMapCardOpen && 'show-light-blue'}`}
                            onClick={() => {
                                switchSidebarCard('map');
                                switchMapCard();
                            }}
                        >
                            <div>

                            <div 
                                className='map-img' 
                                style={{
                                    backgroundImage: 'url(https://www.gstatic.com/companion/icon_assets/maps_v2_2x.png)'
                                }} 
                            />
                            </div>
                        </div>
                        <div className='divide-line'>
                            <div className="light-line" />
                        </div>
                        <div className='icon'>
                            <div>

                            <div 
                                className='extend-component-img' 
                                style={{
                                    backgroundImage: 'url(https://fonts.gstatic.com/s/i/googlematerialicons/add/v21/black-24dp/1x/gm_add_black_24dp.png)',
                                    backgroundRepeat: 'no-repeat'
                                }} 
                            />
                            </div>
                        </div>
                    </div>
                </aside>
                    <div ref={btnContainer} className="switch-container" onClick={switchSidebar}>
                        <div className='switch-btn'>
                            <AiOutlineRight />
                        </div>
                    </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .total-btns {
        height: 100%;
    }
    .function-btns {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 3rem;
        height: 100%;
        padding: 0 5px;
        border-left: 1px solid lightgray;
    }
    .btns-extend {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 17rem;
    }
    .icon {
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
    .icon > div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .icon > div:hover {
        background-color: rgba(0, 0, 0, .1);
    }
    .icon > div > div {
        scale: .5;
        width: 40px;
        height: 40px;
        background-position: center;
    }
    .icon .extend-component-img {
        scale: 1;
    }
    .divide-line {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 40px;
        height: 40px;
    }
    .divide-line .light-line {
        width: 40px;
        height: 1px;
        background-color: lightgray;
        scale: .7;
    }
    .switch-container {
        position: absolute;
        bottom: 5px;
        right: 0px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 42px;
        height: 40px;
        transition: all .3s;
    }
    .switch-container svg {
        transition: all .3s;
    }
    .switch-container:hover {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .1);
    }
    .hide-container {
        position: absolute;
        bottom: 5px;
        right: 0px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 40px;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
        background-color: rgba(0, 0, 0, .1);
    }
    .hide-container svg {
        transform: rotate(180deg);
    }
    .hide-container:hover {
        border-radius: none;
        width: 42px;
        height: 40px;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 50%;
        border-top-right-radius: 0px;
    }

    .show-light-blue {
        border-right: 3px solid blue;
    }
    .show-light-blue > div {
        background-color: rgba(66,133,244, .2);
    }
    .show-light-blue > div:hover {
        background-color: rgba(66,133,244, .3);
    }

    .show-light-orange {
        border-right: 3px solid orange;
    }
    .show-light-orange > div {
        background-color: rgba(255,158,78, .2);
    }
    .show-light-orange > div:hover {
        background-color: rgba(255,158,78, .3);
    }
`;

export default SearchBtns

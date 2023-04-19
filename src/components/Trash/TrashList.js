import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { BsTrash3 } from 'react-icons/bs';
import { HiOutlineArrowUturnLeft } from 'react-icons/hi2';
import { useGlobalContext } from '../../Providers/AppProvider';
import SingleList from './SingleList';

const TrashList = () => {
    const checkboxContainer = useRef(null);
    const {bin, handleWithdraw, handleDelete, clearTrash, submitBinList, withdrawTrash, deleteTrashPermanently} = useGlobalContext();
    const [binList, setBinList] = useState([]);
    const [isCheckAll , setIsCheckAll] = useState(false);
    const [isCheckSome, setIsCheckSome] = useState(false);
    const [deleteAmount, setDeleteAmount] = useState(0);

    const switchWholeBtn = () => {
        if (!isCheckAll) {
            const changeList = binList.map(item => {
                return {...item, isChecked: true};
            });
            submitBinList(changeList);
            setDeleteAmount(changeList.length);
            setBinList(changeList);
            setIsCheckSome(true);
        } else {
            const changeList = binList.map(item => {
                return {...item, isChecked: false};
            });
            submitBinList(changeList);
            setBinList(changeList);
            setIsCheckSome(false);
            setDeleteAmount(0);
        }
        setIsCheckAll(!isCheckAll);
    };
    const clickCheck = (id) => {
        const changeList = binList.map(item => {
            if (item.id === id) {
                return {...item, isChecked: !item.isChecked};
            }
            return item;
        });
        const deleteList = changeList.filter(item => item.isChecked);
        setDeleteAmount(deleteList.length);
        submitBinList(changeList);
        setBinList(changeList);
        setIsCheckSome(true);
        if (changeList.every(item => item.isChecked)) {
            checkboxContainer.current.indeterminate = "false";
            setIsCheckAll(true);
        } else if (changeList.some(item => item.isChecked)) {
            setIsCheckAll(false);
            checkboxContainer.current.indeterminate = "true";
        } else {
            checkboxContainer.current.indeterminate = "false";
            checkboxContainer.current.checked = "true";
            setIsCheckAll(false);
            setIsCheckSome(false);
        }
    };
    const init = () => {
        const initialList = bin.map(item => {
            return {...item, isChecked: false};
        });
        submitBinList(initialList);
        setBinList(initialList);
    };

    useEffect(() => {
        init();
    }, [bin])

    return (
        <Wrapper>
            <div className='recycle-lists-container'>
                <div className='title-function-container'>
                    <h6 className='remind-title'>回收站中的活动会在30天后删除</h6>
                    <button className='clear-trash' onClick={clearTrash}>
                        <span className='icon'><BsTrash3 /></span>
                        <span className='btn-name'>清空回收站</span>
                    </button>
                </div>
                <div className='lists-container'>
                    <div className='choose-whole-list-container'>
                        <div className='checkbox-container'>
                            <input ref={checkboxContainer} type="checkbox" name='whole' id="whole" value="whole" checked={isCheckAll} onChange={switchWholeBtn} />
                        </div>
                        {
                            !isCheckSome && (
                                <>
                                    <div className='show-recycle-date'>
                                        日期
                                    </div>
                                    <div className='show-recycle-time'>
                                        时间
                                    </div>
                                    <div className='show-recycle-title'>
                                        标题
                                    </div>
                                    <div className='show-recycle-user'>
                                        组织者
                                    </div>
                                    <div className='show-trash-date'>
                                        删除时间
                                    </div>
                                </>
                            )
                        }
                        {
                            isCheckSome && (
                                <>
                                    <button className='withdraw-btn' onClick={() => {
                                        handleWithdraw();
                                        setIsCheckAll(false);
                                        setDeleteAmount(0);
                                        setIsCheckSome(false);
                                    }}>
                                        <HiOutlineArrowUturnLeft />
                                    </button>
                                    <button className='delete-btn' onClick={() => {
                                        handleDelete();
                                        setIsCheckAll(false);
                                        setDeleteAmount(0);
                                        setIsCheckSome(false);
                                    }}>
                                        <BsTrash3 />
                                    </button>
                                    <span className='remind-how-much'>已选择 {deleteAmount} 项内容</span>
                                </>

                            )
                        }
                    </div>
                    <div className='whole-bin-lists-container'>
                        {
                            binList.map(item => {
                                return <SingleList key={item.id} {...item} clickCheck={clickCheck} withdrawTrash={withdrawTrash} deleteTrashPermanently={deleteTrashPermanently} />
                            })
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    flex: 1;
    .recycle-lists-container {
        width: 100%;
        height: 100%;
    }
    .title-function-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 2rem;
        padding-right: 3rem;
        height: 3rem;
        margin-top: .5rem;
    }
    .remind-title {
        font-weight: normal;
        color: rgb(100, 100, 100);
        letter-spacing: .2em;
    }
    .clear-trash {
        cursor: pointer;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: .4rem .5rem;
        border: transparent;
        background-color: transparent;
        color: #1a73e8;
        border-radius: 5px;
    }
    .clear-trash:hover {
        background-color: rgba(122, 173, 240, .1);
    }
    .clear-trash .icon {
        position: relative;
        width: 1rem;
        height: 1rem;
        margin-right: .5rem;
    }
    .clear-trash .icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%);
    }
    .lists-container {
        padding-left: 1rem;
        padding-right: 2.7rem;
    }
    .choose-whole-list-container {
        display: flex;
        align-items: center;
        height: 3rem;
        font-size: 13px;
        color: rgb(100, 100, 100);
        padding-left: 1.5rem;
        padding-right: .7rem;
    }
    .checkbox-container {
        width: 2rem;
        height: 1.2rem;
        margin-right: .5rem;
    }
    .checkbox-container input {
        cursor: pointer;
        width: 1.2rem;
        height: 1.2rem;
        background-color: transparent;
    }

    .show-recycle-date {
        width: 8rem;
    }
    .show-recycle-time {
        width: 7rem;
    }
    .show-recycle-title {
        flex: 1;
    }
    .show-recycle-user {
        width: 12rem;
    }
    .show-trash-date {
        text-align: right;
        width: 7rem;
    }

    .withdraw-btn,
    .delete-btn {
        cursor: pointer;
        width: 1.7rem;
        height: 1.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: transparent;
        background-color: transparent;
        margin-right: .5rem;
    }
    .delete-btn {
        margin-right: 1.5rem;
    }
    .withdraw-btn:hover,
    .delete-btn:hover {
        background-color: rgb(240, 240, 240);
    }
    svg {
        width: 50%;
        height: 50%;
    }
`;

export default TrashList

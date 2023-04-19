import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import styled from 'styled-components';
import Time from './Time';
import Content from './Content';
import Task from './Task';
import { useGlobalContext } from '../../Providers/AppProvider';
import Map from './Map';
import Invite from './Invite';

const EditCard = () => {
    const { closeEditList, listID, deleteList, editList, submitEditList, openModalAlert } = useGlobalContext();
    const iptLineContainer = useRef(null);
    const [listContent, setListContent] = useState({
        id: listID,
        year: editList.year,
        month: editList.month,
        day: editList.day,
        time: editList.time,
        content: editList.content,
        detail: editList.detail,
        email: editList.email,
        location: editList.location,
        activityContent: '',
        type: editList.type
    });
    const [isWholeDay, setIsWholeDay] = useState(false);

    const setWholeDay = () => {
        if (!isWholeDay) {
            setListContent({...listContent, time: '全天'});
        } else {
            setListContent({...listContent, time: '17:00'});
        }
        setIsWholeDay(!isWholeDay);
    }
    const showBlueLine = () => {
        iptLineContainer.current.style.backgroundColor = 'rgb(66,133,244)';
    };
    const hideGrayLine = () => {
        iptLineContainer.current.style.backgroundColor = 'lightgray';
    };
    const changeValue = (e) => {
        const property = e.target.name;
        if (property === 'date') {
            const [year, month, day] = e.target.value.split('-');
            setListContent({...listContent, year: Number(year), month: Number(month), day: Number(day)});
        } else {
            setListContent({...listContent, [property]: e.target.value});
        } 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(listID);

        if (listContent.content.length === 0) {
            submitEditList({
                ...listContent,
                content: '( 无标题 )'
            });
        } else if (listContent.content.length > 12) {
            openModalAlert('标题字数长度限制12以内', 'danger');
            return;
        } else {
            submitEditList(listContent);
        }
        openModalAlert('修改成功', 'success');
        setListContent({
            id: '',
            year: editList.year,
            month: editList.month,
            day: editList.day,
            time: editList.time,
            content: editList.content,
            detail: editList.detail,
            email: '',
            location: '',
            activityContent: '',
            type: editList.type
        })
    };

    return (
        <Wrapper className='bg-black'>
            <form onSubmit={handleSubmit} className='whole-edit-container'>
                <div className='edit-container'>
                    <div className='functions-container'>
                        <button 
                            type="button"
                            className='function-icon'
                            onClick={() => {deleteList(listID); closeEditList()}}
                        >
                            <BsTrash3 />
                        </button>
                        <button 
                            type="button"
                            className='function-icon'
                            onClick={closeEditList}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className='edit-content-container'>
                        <div className='line-show'>
                            <div className='event-icon'></div>
                            <div className='title-container'>
                                <input
                                    className='title-ipt' 
                                    type="text" 
                                    name="content"
                                    value={listContent.content}
                                    onChange={changeValue}
                                    placeholder='添加标题'
                                    onFocus={showBlueLine}
                                    onBlur={hideGrayLine}
                                ></input>
                                <div ref={iptLineContainer} className='underline' />
                            </div>
                        </div>
                        <Time 
                            {...listContent} 
                            changeValue={changeValue} 
                            setWholeDay={setWholeDay} 
                            isWholeDay={isWholeDay}
                        />
                        {
                            listContent.type === 'activity' && (
                                <>
                                    <Map {...listContent} changeValue={changeValue} />
                                    <Invite {...listContent} changeValue={changeValue} />
                                </>
                            )
                        }
                        {
                            listContent.type !== 'remind' && <Content 
                                                                {...listContent} 
                                                                changeValue={changeValue}
                                                            />
                        }
                        {
                            listContent.type === 'task' && <Task />
                        }
                    </div>
                    <div className='save-container'>
                        <button type="submit" className='save-btn'>保存</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .whole-edit-container {
        position: relative;
        height: 100%;
    }
    .edit-container {
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 26rem;
        background-color: #fff;
        box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, .2);
    }
    .edit-container .functions-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 .5rem;
        height: 3.5rem;
    }
    .edit-container .functions-container .function-icon {
        position: relative;
        cursor: pointer;
        height: 2.5rem;
        width: 2.5rem;
        margin-left: .5rem;
        border: transparent;
        background: transparent;
    }
    .edit-container .functions-container .function-icon:hover {
        border-radius: 50%;
        background-color: rgba(200, 200, 200, .3);
    }
    .edit-container .functions-container .function-icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        height: 40%;
    }
    .edit-content-container {

    }
    .edit-content-container  .line-show {
        display: flex;
        align-items: center;
        height: 3rem;
        padding-right: 1rem;
    }
    .edit-content-container  .line-show .event-icon {
        position: relative;
        width: 4rem;
    }
    .edit-content-container  .line-show .event-icon svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1.6rem;
        height: 1.6rem;
    }
    .edit-content-container .line-show .title-container {
        position: relative;
        flex: 1;
    }
    .edit-content-container  .line-show .title-ipt {
        outline: none;
        width: 100%;
        font-size: 23px;
        border: transparent;
        background: transparent;
    }
    .underline {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 1.5px;
        background: lightgray;
        transition: all .2s;
    }
    .save-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 4rem;
        padding: 0 1rem;
        margin-top: 1rem;
    }
    .save-container .save-btn {
        cursor: pointer;
        border: transparent;
        background-color: rgb(16,125,240);
        width: 5rem;
        height: 2.5rem;
        color: white;
        border-radius: 5px;
    }
    .save-container .save-btn:hover {
        background-color: rgb(36,115,232);
    }
`;

export default EditCard

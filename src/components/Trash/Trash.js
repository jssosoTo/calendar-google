import React, { useEffect, useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import TrashList from './TrashList';
import { useGlobalContext } from '../../Providers/AppProvider';

const Trash = () => {
    const {binList} = useGlobalContext();
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(binList);
    }, [binList])

    return (
        <Wrapper>
            <div className='trash-container'>
                <Sidebar />
                {list.length !== 0 ? <TrashList /> : (
                    <span className='alert-title'>
                        没有已删除活动
                    </span>
                )}
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: #fff;
    .trash-container {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .alert-title {
        letter-spacing: .2em;
        font-family: Roboto,"Noto Sans SC",Helvetica,Arial,sans-serif;
        font-size: 14px;
        color: #000000;
        margin: 1rem;
    }
`;

export default Trash

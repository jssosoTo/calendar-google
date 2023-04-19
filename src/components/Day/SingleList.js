import React, {useState} from 'react';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { BsPen, BsTrash3, BsCheck2 } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useGlobalContext } from '../../Providers/AppProvider';

const SingleList = ({id, content, finish, closeRemindCard}) => {
    const { deleteList, openEditList, switchFinishList } = useGlobalContext();
    const [isBtnsHiding, setIsBtnsHiding] = useState(true);

    const showBtns = () => {
        setIsBtnsHiding(false);
    };
    const hideBtns = () => {
        setIsBtnsHiding(true);
    };

    return (
        <div className='remind-single-list' onMouseEnter={showBtns} onMouseLeave={hideBtns}>
            <div className='icon-container'>
                <HiOutlineBellAlert />
            </div>
            <h4 className='time-title-container'>
                <span className={`${finish ? 'complete-state' : ''}`}>{content}</span>
                {
                    !isBtnsHiding && (
                        <div className='functions-btn-container'>
                            <button
                                onClick={() => openEditList(id)}
                            >
                                <BsPen />
                            </button>
                            <button
                                onClick={() => deleteList(id)}
                            >
                                <BsTrash3 />
                            </button>
                            <button
                                onClick={() => switchFinishList(id)}
                            >
                                {
                                    finish ? <AiOutlineClose /> : <BsCheck2 />
                                }
                            </button>
                        </div>
                    )
                }
            </h4>
        </div>
    )
}

export default SingleList

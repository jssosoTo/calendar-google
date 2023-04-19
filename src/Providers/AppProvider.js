import React, {useContext, createContext, useState, useEffect, useReducer} from 'react';
import reducer from '../Reducers/AppReducer';

const listStorage = JSON.parse(localStorage.getItem('list')) || [];
const binStorage = JSON.parse(localStorage.getItem('bin')) || [];
const SearchStorage = JSON.parse(localStorage.getItem('search')) || {
    keywords: '',
    show: false
};
const filterStorage = JSON.parse(localStorage.getItem('filter')) || [
        {id: 'username', name: 'P0PC0RN', checked: true},
        {id: 'task', name: '任务', checked: true},
        {id: 'remind', name: '提醒', checked: true},
        {id: 'activity', name: '活动', checked: true},
];

const AppContext = createContext();
const initialState = {
    date: {
        tempYear: 2023,
        thisYear: 2023,
        year: 2023,
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        thisMonth: 9,
        month: 9,
        day: 17,
        thisMonthDays: 31,
        lastMonthDays: 30,
        firstWeekDay: 2,
    },
    months: {length: 12},
    clickQueryDate: {
        queryYear: new Date().getFullYear(),
        queryMonth: new Date().getMonth() + 1,
        queryDay: new Date().getDate(),
        queryWeekDay: new Date().getDay()
    },
    isListHiding: true,
    listModalPosition: {top: '0px', left: '0px'},
    /* lists: [
        {id: 1, year: 2023, month: 3, day: 29, time: '17:00', content: 'Typing Code', type: 'task'},
        {id: 2, year: 2023, month: 3, day: 29, time: '18:00', content: 'Watching TV', type: 'task'},
        {id: 3, year: 2023, month: 3, day: 30, time: '17:00', content: 'Typing Code', type: 'remind'},
    ] */
    lists: listStorage,
    listID: null,
    editList: {},
    /* currentYearDates: {
        year: 2002,
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    } */
    filters: filterStorage,
    searchKey: '',
    timer: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    dustbin: listStorage,
    bin: binStorage,
    binList: binStorage,
    withdrawID: null,
    withdrawMessage: {
        withdrawContent: '',
        show: false,
        isWithdraw: false
    },
    searchContent: SearchStorage
};


const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openSearchIpt, setOpenSearchIpt] = useState(false);
    const [binBar, setBinBar] = useState(false);
    const [isAddListModalShow, setIsAddListModalShow] = useState(false);
    const [listType, setListType] = useState('');
    const [isTaskCardOpen, setIsTaskCardOpen] = useState(false);
    const [isRemindCardOpen, setIsRemindCardOpen] = useState(false);
    const [isActivityCardOpen, setIsActivityCardOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        modalContent: '',
        type: '',
        show: false
    });
    const [noteAmount, setNoteAmount] = useState(state.lists.filter(item => item.type === 'remind' && item.year === state.clickQueryDate.queryYear && item.month === state.clickQueryDate.queryMonth && item.day === state.clickQueryDate.queryDay).length);

    const getDate = () => {
        dispatch({type: 'GET_DATE'});
    };
    const fetchDays = (year, month) => {
        dispatch({type: 'GET_MONTH_DAYS', payload: {year, month}});
    };
    const switchYear = (type) => {
        if (type === 'next') {
            dispatch({type: 'SWITCH_NEXT_YEAR'});
            dispatch({type: 'GET_NEW_DATE'});
        }
        if (type === 'prev') {
            dispatch({type: 'SWITCH_LAST_YEAR'});
            dispatch({type: 'GET_NEW_DATE'});
        }
    };
    const switchMonth = (type) => {
        if (type === 'next') {
            dispatch({type: 'SWITCH_NEXT_MONTH'});
        }
        if (type === 'prev') {
            dispatch({type: 'SWITCH_LAST_MONTH'});
        }
    };
    const switchDay = (type) => {
        if (type === 'next') {
            dispatch({type: 'SWITCH_NEXT_DAY'});
        }
        if (type === 'prev') {
            dispatch({type: 'SWITCH_LAST_DAY'});
        }
    };
    const switchSearchIptOpen = () => {
        dispatch({type: 'SWITCH_SEARCH_IPT'});
    };
    const setQueryDate = (year, month, day, notThisMonth = false, isLastMonth = false) => {
        let setYear = year;
        let setMonth = month;
        let setDay = day;
        if (month === 0) {
            setYear = year - 1;
            setMonth = 12;
        }
        if (month > 12) {
            setYear = year + 1;
            setMonth = 1;
        }
        if (notThisMonth && isLastMonth) {
            dispatch({type: 'SWITCH_LAST_MONTH'});
        }
        if (notThisMonth && !isLastMonth) {
            dispatch({type: 'SWITCH_NEXT_MONTH'});
        }
        dispatch({type: 'SET_QUERY_DATE', payload: {year: setYear, month: setMonth, day: setDay}});
    };
    const setQueryYearDate = (year, month, day) => {
        let setYear = year;
        let setMonth = month;
        let setDay = day;
        if (month === 0) {
            setYear = year - 1;
            setMonth = 12;
        }
        if (month > 12) {
            setYear = year + 1;
            setMonth = 1;
        }
        dispatch({type: 'SWITCH_MONTH', payload: {year: setYear, month: setMonth, day: setDay}});
        dispatch({type: 'SET_QUERY_DATE', payload: {year: setYear, month: setMonth, day: setDay}});
    };
    const setQueryDayDate = (year, month, day) => {
        let setYear = year;
        let setMonth = month;
        let setDay = day;
        const thisMonthDays = new Date(setYear, setMonth, 0).getDate();
        if (setDay === 0) {
            setMonth = setMonth - 1;
            setDay = new Date(setYear, setMonth, 0).getDate();
        } else if (setDay > thisMonthDays) {
            setMonth = setMonth + 1;
            setDay = 1;
        }
        if (setMonth === 0) {
            setYear = year - 1;
            setMonth = 12;
        }
        if (setMonth > 12) {
            setYear = year + 1;
            setMonth = 1;
        }
        dispatch({type: 'SWITCH_MONTH', payload: {year: setYear, month: setMonth, day: setDay}});
        dispatch({type: 'SET_QUERY_DATE', payload: {year: setYear, month: setMonth, day: setDay}});
    };
    const handleQuery = (e) => {
        const selectElPosition = e.target.closest('.day').getBoundingClientRect();
        console.log(selectElPosition);
        dispatch({type: 'SWITCH_LIST_SHOW', payload: {top: selectElPosition.top, left: selectElPosition.left}});
    };
    const handleCloseQueryModal = () => {
        dispatch({type: 'CLOSE_MODAL_SHOW'});
    };
    const openAddListModal = (type) => {
        setListType(type);
        setIsAddListModalShow(true);
    };
    const closeAddListModal = () => {
        setIsAddListModalShow(false);
        setListType('');
    };
    const submitList = (list) => {
        dispatch({type: 'SUBMIT_LIST', payload: list});
        setIsAddListModalShow(false);
    };
    const switchListDetailCard = (id) => {
        dispatch({type: 'SWITCH_DETAIL_CARD', payload: id});
    };
    const closeListDetailCard = (id) => {
        dispatch({type: 'CLOSE_DETAIL_CARD', payload: id});
    };
    const deleteList = (id) => {
        dispatch({type: 'DELETE_LIST', payload: id});
    };
    const openEditList = (id) => {
        dispatch({type: 'OPEN_EDIT_CARD', payload: id});
    };
    const closeEditList = () => {
        dispatch({type: 'CLOSE_EDIT_CARD'});
    };
    const submitEditList = (list) => {
        dispatch({type: 'SUBMIT_EDIT_LIST', payload: list})
    };
    const switchFilter = (id) => {
        dispatch({type: 'SWITCH_FILTER', payload: id});
    };
    const switchFinishList = (id) => {
        dispatch({type: 'COMPLETE_LIST_STATE', payload: id});
    };
    const submitSearchKey = (text) => {
        dispatch({type: 'SUBMIT_KEYWORDS', payload: text});
    }
    const switchTaskCard = () => {
        setIsRemindCardOpen(false);
        setIsActivityCardOpen(false);
        setIsTaskCardOpen(!isTaskCardOpen);
    };
    const switchRemindCard = () => {
        setIsActivityCardOpen(false);
        setIsTaskCardOpen(false);
        setIsRemindCardOpen(!isRemindCardOpen);
    };
    const switchActivityCard = () => {
        setIsTaskCardOpen(false);
        setIsRemindCardOpen(false);
        setIsActivityCardOpen(!isActivityCardOpen);
    };
    const closeModalAlert = () => {
        setModalMessage({
            modalContent: '',
            type: '',
            show: false
        });
    };
    const openModalAlert = (modalContent, type) => {
        setModalMessage({
            modalContent,
            type,
            show: true
        });
    };
    const closeWithdrawCard = () => {
        dispatch({type: 'CLOSE_WITHDRAW_CARD'});
    };
    const withdrawList = () => {
        dispatch({type: 'WITHDRAW_LIST'});
    };
    const deleteTrashPermanently = (id) => {
        dispatch({type: 'DELETE_TRASH', payload: id});
    };
    const clearTrash = () => {
        dispatch({type: 'CLEAR_TRASH'});
    };
    const withdrawTrash = (id) => {
        dispatch({type: 'WITHDRAW_TRASH', payload: id});
    };
    const handleWithdraw = () => {
        dispatch({type: 'BTN_WITHDRAW_TRASH'});
    };
    const handleDelete = () => {
        dispatch({type: 'BTN_DELETE_TRASH'});
    };
    const submitBinList = (lists) => {
        dispatch({type: 'SUBMIT_BIN_LIST', payload: lists});
    }

    useEffect(() => {
        getDate();
    }, [])

    return (
        <AppContext.Provider value={{
            ...state,
            fetchDays,
            switchYear,
            switchMonth,
            switchDay,
            getDate,
            openSearchIpt,
            switchSearchIptOpen,
            setQueryDate,
            setQueryYearDate,
            setQueryDayDate,
            handleQuery,
            handleCloseQueryModal,
            isAddListModalShow,
            openAddListModal,
            closeAddListModal,
            listType,
            submitList,
            switchListDetailCard,
            closeListDetailCard,
            deleteList,
            openEditList,
            closeEditList,
            submitEditList,
            switchFilter,
            switchFinishList,
            submitSearchKey,
            isActivityCardOpen,
            isRemindCardOpen,
            isTaskCardOpen,
            switchActivityCard,
            switchRemindCard,
            switchTaskCard,
            modalMessage,
            closeModalAlert,
            openModalAlert,
            noteAmount,
            closeWithdrawCard,
            withdrawList,
            binBar,
            setBinBar,
            deleteTrashPermanently,
            clearTrash,
            withdrawTrash,
            handleWithdraw,
            handleDelete,
            submitBinList
        }}>
            {children}
        </AppContext.Provider>
    )
};

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppProvider, useGlobalContext};

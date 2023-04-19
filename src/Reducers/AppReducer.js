import React from 'react';

const reducer = (state, action) => {
    if (action.type === 'GET_DATE') {
        const now = new Date();
        const thisMonth = new Date(now.getFullYear() , now.getMonth() + 1, 0);

        return {
            ...state,
            date: {
                ...state.date,
                tempYear: now.getFullYear(),
                thisYear: now.getFullYear(),
                year: now.getFullYear(),
                thisMonth: now.getMonth() + 1,
                month: now.getMonth() + 1,
                day: now.getDate(),
                thisMonthDays: thisMonth.getDate(),
                lastMonthDays: new Date(now.setDate(0)).getDate(),
                firstWeekDay: new Date(now.setDate(1)).getDay()
            }
        }
    }

    if (action.type === 'GET_MONTH_DAYS') {
        const date = new Date(state.date.year, action.payload.month, 0);
        const thisMonthDays = date.getDate();
        const firstWeekDay = new Date(date.setDate(1)).getDay();
        const lastMonthDays = new Date(date.setDate(0)).getDate();

        const emptyArr = new Array(42).fill(1);
        const daysArr = emptyArr.map((_, i) => {
            if (i < firstWeekDay) {
                return lastMonthDays - 2 + i;
            }
            if (i > (thisMonthDays + firstWeekDay) - 1) {
                return i - (thisMonthDays + firstWeekDay) + 1;
            }
            return i - firstWeekDay + 1;
        });

        return  {
            ...state,
            months: {
                ...state.months, 
                [action.payload.month - 1] : {month: action.payload.month, days: daysArr},
            }
        };
        /* if (state.months.some(item => item.month === action.payload.month)) {
            const newMonths = state.months.map((item) => {
                if (item.month === action.payload.month) {
                    return {...item, days: daysArr};
                }
                return item;
            });
            return {...state, months: newMonths};
        } */

        /* return {
            ...state,
            months: [
                ...state.months, 
                {
                    month: date.getMonth() + 1,
                    days: daysArr
                }
            ]
        } */
    }
    if (action.type === 'SWITCH_NEXT_YEAR') {
        return {
            ...state,
            date: {
                ...state.date,
                year: state.date.year + 1,
                tempYear: state.date.year + 1
            }
        }
    }
    if (action.type === 'SWITCH_LAST_YEAR') {
        return {
            ...state,
            date: {
                ...state.date,
                year: state.date.year - 1,
                tempYear: state.date.year - 1
            }
        }
    }
    if (action.type === 'SWITCH_NEXT_MONTH') {
        let nextMonth = state.date.thisMonth + 1;

        if (nextMonth > 12) {
            return {
                ...state,
                date: {
                    ...state.date,
                    tempYear: state.date.tempYear + 1,
                    thisMonth: 1
                },
                clickQueryDate: {
                    ...state.clickQueryDate,
                    queryYear: state.date.tempYear + 1,
                    queryMonth: 1
                }
            }
        }

        return {
            ...state,
            date: {
                ...state.date,
                thisMonth: nextMonth
            },
            clickQueryDate: {
                ...state.clickQueryDate,
                queryMonth: nextMonth
            }
        }
    }
    if (action.type === 'SWITCH_LAST_MONTH') {
        let prevMonth = state.date.thisMonth - 1;

        if (prevMonth <= 0) {
            return {
                ...state,
                date: {
                    ...state.date,
                    tempYear: state.date.tempYear - 1,
                    thisMonth: 12
                },
                clickQueryDate: {
                    ...state.clickQueryDate,
                    queryYear: state.date.tempYear - 1,
                    queryMonth: 12
                }
            }
        }

        return {
            ...state,
            date: {
                ...state.date,
                thisMonth: prevMonth
            },
            clickQueryDate: {
                ...state.clickQueryDate,
                queryMonth: prevMonth
            }
        }
    }
    
    if (action.type === 'SWITCH_MONTH') {
        return {
            ...state,
            date: {
                ...state.date,
                year: action.payload.year,
                tempYear: action.payload.year,
                thisMonth: action.payload.month
            }
        }
    }
    if (action.type === 'GET_NEW_DATE') {
        const currentDate = new Date(state.date.year, state.date.month - 1);
        const lastMonthDays = new Date(state.date.year, state.date.month - 1, 0).getDate();
        const firstWeekDay = new Date(state.date.year, state.date.month - 1, 1).getDay();
        const currentMonth = new Date(currentDate.getFullYear() , currentDate.getMonth() + 1, 0);

        return {
            ...state,
            date: {
                ...state.date,
                month: currentDate.getMonth() + 1,
                thisMonthDays: currentMonth.getDate(),
                lastMonthDays,
                firstWeekDay,
            },
        }
    }
    if (action.type === 'SET_QUERY_DATE') {
        const weekDay = new Date(action.payload.year, action.payload.month - 1, action.payload.day).getDay();
        console.log(`年：${action.payload.year} 月：${action.payload.month} 日：${action.payload.day} 星期: ${weekDay}`);
        return {
            ...state,
            clickQueryDate: {
                queryYear: action.payload.year,
                queryMonth: action.payload.month,
                queryDay: action.payload.day,
                queryWeekDay: weekDay
            }
        }
    }
    if (action.type === 'SWITCH_LIST_SHOW') {
        return {
            ...state,
            isListHiding: false,
            listModalPosition: {top: `${action.payload.top}px`, left: `${action.payload.left}px`}
        }
    }
    if (action.type === 'CLOSE_MODAL_SHOW') {
        return {
            ...state,
            isListHiding: true
        }
    }
    if (action.type === 'SUBMIT_LIST') {
        const newList = [...state.lists, action.payload];
        localStorage.setItem('list', JSON.stringify(newList));
        return {
            ...state,
            lists: newList
        }
    }
    if (action.type === 'SWITCH_DETAIL_CARD') {
        const openDetailList = state.lists.map(item => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    isDetailOpen: !item.isDetailOpen,
                }
            }
            return {
                    ...item,
                    isDetailOpen: false
            };
        });
        localStorage.setItem('list', JSON.stringify(openDetailList));
        return {
            ...state,
            lists: openDetailList
        }
    }
    /* if (action.type === 'SWITCH_DETAIL_CARD') {
        const openDetailList = state.lists.map(item => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    isDetailOpen: false
                }
            }
            return item;
        });
        localStorage.setItem('list', JSON.stringify(openDetailList));
        return {
            ...state,
            lists: openDetailList
        }
    } */
    if (action.type === 'CLOSE_DETAIL_CARD') {
        const openDetailList = state.lists.map(item => {
            return {
                ...item,
                isDetailOpen: false,
            }
        });
        localStorage.setItem('list', JSON.stringify(openDetailList));
        return {
            ...state,
            lists: openDetailList
        };
    }
    if (action.type === 'DELETE_LIST') {
        const openDetailList = state.lists.filter(item => item.id !== action.payload);
        const removeList = state.lists.find(item => item.id === action.payload);
        removeList.isDetailOpen = false;
        const binArr = [...state.bin, removeList];
        localStorage.setItem('bin', JSON.stringify(binArr));
        localStorage.setItem('list', JSON.stringify(openDetailList));
        return {
            ...state,
            dustbin: [...state.lists],
            lists: openDetailList,
            bin: binArr,
            binList: binArr.map(item => ({...item, isChecked: false})),
            withdrawID: action.payload,
            withdrawMessage: {
                withdrawContent: `${removeList.type === 'task' ? '任务' : removeList.type === 'remind' ? '提醒' : '活动'}已删除`,
                show: true,
                isWithdraw: false
            }
        };
    }
    if (action.type === 'COMPLETE_LIST_STATE') {
        const editDetailList = state.lists.map(item => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    finish: !item.finish
                }
            }
            return item;
        });
        localStorage.setItem('list', JSON.stringify(editDetailList));
        return {
            ...state,
            lists: editDetailList
        };
    }
    if (action.type === 'OPEN_EDIT_CARD') {
        const editList = state.lists.find(item => item.id === action.payload);
        return {
            ...state,
            listID: action.payload,
            editList
        }
    }
    if (action.type === 'CLOSE_EDIT_CARD') {
        return {
            ...state,
            listID: null,
            editList: {}
        }
    }
    if (action.type === 'SUBMIT_EDIT_LIST') {
        const editLists = state.lists.map(item => {
            if (item.id === action.payload.id) {
                return {
                    ...item,
                    ...action.payload
                }
            }
            return item;
        });
        localStorage.setItem('list', JSON.stringify(editLists));
        return {
            ...state,
            lists: editLists,
            listID: null,
            editList: {}
        }
    }
    if (action.type === 'SWITCH_FILTER') {
        const newFilter = state.filters.map(item => {
            if (item.id === action.payload) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return item;
        });
        localStorage.setItem('filter', JSON.stringify(newFilter));
        return {
            ...state,
            filters: newFilter
        }
    }
    if (action.type === 'SUBMIT_KEYWORDS') {
        const newState = {
            ...state.searchContent,
            keywords: action.payload
        }
        localStorage.setItem('search', JSON.stringify(newState));
        return {
            ...state,
            searchKey: action.payload,
            searchContent: newState
        }
    }
    if (action.type === 'SEARCH_FILTER_LIST') {
        const filterLists = state.lists.filter(item => item.content.includes(action.payload));
        console.log(filterLists);
        return {
            ...state,
            filterLists
        };
    }
    if (action.type === 'CLOSE_WITHDRAW_CARD') {
        return {
            ...state,
            dustbin: [...state.lists],
            withdrawID: null,
            withdrawMessage: {
                withdrawContent: '',
                show: false,
                isWithdraw: false
            }
        }
    }
    if (action.type === 'WITHDRAW_LIST') {
        const newBin = state.bin.filter(item => item.id !== state.withdrawID);
        localStorage.setItem('list', JSON.stringify(state.dustbin));
        localStorage.setItem('bin', JSON.stringify(newBin));
        return {
            ...state,
            lists: [...state.dustbin],
            withdrawID: null,
            withdrawMessage: {
                withdrawContent: '成功撤销',
                show: true,
                isWithdraw: true
            },
            bin: newBin
        }
    }
    if (action.type === 'SWITCH_SEARCH_IPT') {
        let newState = {
            ...state.searchContent,
            show: !state.searchContent.show
        };
        if (!newState.show) {
            newState = {
                keywords: '',
                show: false
            }
        } else {
            newState = {
                keywords: state.searchContent.keywords,
                show: true
            }
        }
        localStorage.setItem('search', JSON.stringify(newState));
        return {
            ...state,
            searchContent: newState
        }
    }
    if (action.type === 'DELETE_TRASH') {
        const newTrash = state.bin.filter(item => item.id !== action.payload);
        localStorage.setItem('bin', JSON.stringify(newTrash));
        return {
            ...state,
            bin: newTrash,
            withdrawMessage: {
                withdrawContent: '活动已永久删除',
                show: true,
                isWithdraw: true
            }
        }
    }
    if (action.type === 'WITHDRAW_TRASH') {
        const newTrash = state.bin.filter(item => item.id !== action.payload);
        const withdrawList = state.bin.find(item => item.id === action.payload);
        const newLists = [...state.lists, withdrawList];
        localStorage.setItem('list', JSON.stringify(newLists));
        localStorage.setItem('bin', JSON.stringify(newTrash));

        return {
            ...state,
            lists: newLists,
            bin: newTrash,
            withdrawMessage: {
                withdrawContent: '活动已恢复',
                show: true,
                isWithdraw: true
            }
        }
    }
    if (action.type === 'CLEAR_TRASH') {
        localStorage.setItem('bin', JSON.stringify([]));
        return {
            ...state,
            bin: [],
            withdrawMessage: {
                withdrawContent: '回收站已清空',
                show: true,
                isWithdraw: true
            }
        }
    }
    if (action.type === 'BTN_WITHDRAW_TRASH') {
        const newTrash = state.binList.filter(item => !item.isChecked);
        const withdrawLists = state.binList.filter(item => item.isChecked);
        const newLists = [...state.lists, ...withdrawLists];
        localStorage.setItem('list', JSON.stringify(newLists));
        localStorage.setItem('bin', JSON.stringify(newTrash));

        return {
            ...state,
            lists: newLists,
            bin: newTrash,
            binList: newTrash,
            withdrawMessage: {
                withdrawContent: '活动已恢复',
                show: true,
                isWithdraw: true
            }
        } 
    }
    if (action.type === 'BTN_DELETE_TRASH') {
        const newTrash = state.binList.filter(item => !item.isChecked);
        localStorage.setItem('bin', JSON.stringify(newTrash));
        return {
            ...state,
            bin: newTrash,
            binList: newTrash,
            withdrawMessage: {
                withdrawContent: '活动已永久删除',
                show: true,
                isWithdraw: true
            }
        }
    }
    if (action.type === 'SUBMIT_BIN_LIST') {
        return {
            ...state,
            binList: action.payload
        }
    }

    return {...state};
}

export default reducer;

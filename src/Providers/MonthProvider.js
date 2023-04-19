import React, { useContext, createContext, useState, useReducer, useEffect } from 'react';
import reducer from '../Reducers/MonthReducer';

const MonthContext = createContext();
const initialState = {
    months: []
}

const MonthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchDate = () => {
        dispatch({type: 'GET_MONTHS'});
    }

    useEffect(() => {
        fetchDate();
    }, [])

    return (
        <MonthContext.Provider value={{
            ...state
        }}>
            {children}
        </MonthContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(MonthContext);
};

export default MonthProvider;

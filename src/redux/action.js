export const setTicker = (ticker) =>{
    return {
        type: 'SET_TICKER',
        payload: ticker
    }
}

export const setFunds = (funds) =>{
    return {
        type: 'SET_FUNDS',
        payload: funds
    }
}
export const setDate = (date) =>{
    return {
        type: 'SET_DATE',
        payload: date
    }
}
export const setTableView = (tableView) =>{
    return {
        type: 'SET_TABLE_VIEW',
        payload: tableView
    }
}
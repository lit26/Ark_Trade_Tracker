import { combineReducers } from 'redux' 

const tickerReducer = (state = '', action) =>{
    switch (action.type){
        case 'SET_TICKER':
            return action.payload;
        default:
            return state;
    } 
}

const fundsReducer = (state = 'All', action) =>{
    switch (action.type){
        case 'SET_FUNDS':
            return action.payload;
        default:
            return state;
    }
}

const dateReducer = (state = '', action) =>{
    switch (action.type){
        case 'SET_DATE':
            return action.payload;
        default:
            return state;
    }
}
const tableViewReducer = (state = 'trade', action) =>{
    switch (action.type){
        case 'SET_TABLE_VIEW':
            return action.payload;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    ticker: tickerReducer,
    funds: fundsReducer,
    date: dateReducer,
    tableView: tableViewReducer
})

export default allReducers;
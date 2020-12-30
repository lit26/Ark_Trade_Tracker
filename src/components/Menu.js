import React from 'react'
import './Menu.css'
import './Dropdown.css'
import TickerInput from './TickerInput'
import FundsInput from './FundsInput'
import DateInput from './DateInput'
import TableInput from './TableInput'
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {setDate} from '../redux/action';

function Menu() {
    const dispatch = useDispatch();

    const clickHandler = () =>{
        dispatch(setDate(''))
    }
    return (
        <div className="Menu">
            <div><TableInput /></div>
            <div><FundsInput /></div>
            <div><TickerInput /></div>
            <div><DateInput /></div>
            <div className="Menu__reset">
                <Button onClick={clickHandler}>Reset
                </Button>
            </div>
        </div>
    )
}

export default Menu

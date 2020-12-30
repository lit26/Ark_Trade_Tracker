import React from 'react'
import { Form } from 'react-bootstrap';
import {setDate} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux'

function DateInput() {
    const date = useSelector(state => state.date);
    const dispatch = useDispatch();

    const dateChange=(e)=>{
        dispatch(setDate(e.target.value))
    }
    return (
        <div className="Dateinput">
            <Form.Group controlId="ark_trade">
                <Form.Control type="date" 
                              name="ark_trade" 
                              value={date}
                              placeholder="Date of Ark_trade" 
                              onChange={dateChange}/>
            </Form.Group>
        </div>
    )
}

export default DateInput

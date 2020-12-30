import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {setFunds} from '../redux/action';
import {useSelector, useDispatch} from 'react-redux'

function FundsInput() {
    const fund = useSelector(state => state.funds);
    const dispatch = useDispatch();

    const handleSelect=(e)=>{
        dispatch(setFunds(e))
    }

    return (
        <Dropdown className="Menu__dropdown" onSelect={handleSelect}>
            <Dropdown.Toggle variant="light" className="Menu__dropdownButton">
                {fund}
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <Dropdown.Item eventKey="All">All Funds</Dropdown.Item>
                <Dropdown.Item eventKey="ARKK">ARKK</Dropdown.Item>
                <Dropdown.Item eventKey="ARKQ">ARKQ</Dropdown.Item>
                <Dropdown.Item eventKey="ARKW">ARKW</Dropdown.Item>
                <Dropdown.Item eventKey="ARKG">ARKG</Dropdown.Item>
                <Dropdown.Item eventKey="ARKF">ARKF</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FundsInput

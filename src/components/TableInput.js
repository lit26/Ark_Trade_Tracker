import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {setTableView} from '../redux/action';
import {useDispatch} from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu';

function TableInput() {
    const dispatch = useDispatch();

    const handleSelect=(e)=>{
        dispatch(setTableView(e))
    }

    return (
        <Dropdown className="Menu__dropdown Menu__table" onSelect={handleSelect}>
            <Dropdown.Toggle variant="light" className="Menu__dropdownButton">
                <MenuIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu className="Menu__dropdownItems">
                <Dropdown.Item eventKey="trade">Trades</Dropdown.Item>
                <Dropdown.Item eventKey="holding">Holding</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default TableInput

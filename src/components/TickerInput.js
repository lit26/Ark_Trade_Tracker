import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setTicker, setDate} from '../redux/action';

function TickerInput() {
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();
    const ticker = useSelector(state => state.ticker);

    const handleChange = (e) =>{
        setInputText(e.target.value.toUpperCase());
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let inputTicker = inputText;
        setInputText('')
        if(inputText !== ''){
            return Promise.resolve(dispatch(setTicker(inputTicker))).then(
                () => dispatch(setDate('')));
        }else{
            return dispatch(setTicker(inputTicker));
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    value={inputText}
                    className="Tickerinput"
                    placeholder={ticker}
                    type="text"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" style={{ display: 'none' }}>Submit</button>
        </form>
    )
}

export default TickerInput

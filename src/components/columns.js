function printNumber(n){
    return n.toLocaleString();
}
function printCurrency(n){
    return n.toLocaleString('en-US',{style: 'currency', currency: 'USD'})
}
function twoDecimal(n){
    if(n !== undefined){
        return n.toFixed(2);
    }else{
        return n
    }
}

export const TRADE_COLUMNS = [
    {
        Header: 'Date',
        Footer: 'Date',
        accessor: 'date',
        sticky: 'left'
    },
    {
        Header: 'Fund',
        Footer: 'Fund',
        accessor: 'fund',
        sticky: 'left'
    },
    {
        Header: 'Company',
        Footer: 'Company',
        accessor: 'company',
        sticky: 'left'
    },
    {
        Header: 'Ticker',
        Footer: 'Ticker',
        accessor: 'ticker',
        sticky: 'left'
    },
    {
        Header: 'Holding',
        Footer: 'Holding',
        accessor: 'holding',
        Cell: props => <>{printNumber(props.value)}</>
    },
    {
        Header: 'Market Value',
        Footer: 'Market Value',
        accessor: 'market value($)',
        Cell: props => <>{printCurrency(props.value)}</>
    },
    {
        Header: 'Weight',
        Footer: 'Weight',
        accessor: 'weight(%)',
        Cell: props => <>{printNumber(props.value)}%</>
    },
    {
        Header: 'Action',
        Footer: 'Action',
        accessor: 'action',
        sticky: 'left'
    },
    {
        Header: 'Shares',
        Footer: 'Shares',
        accessor: 'shares',
        Cell: props => <>{printNumber(props.value)}</>
    },
]
export const HOLDING_COLUMNS = [
    {
        Header: 'Date',
        Footer: 'Date',
        accessor: 'date',
        sticky: 'left'
    },
    {
        Header: 'Fund',
        Footer: 'Fund',
        accessor: 'fund',
        sticky: 'left'
    },
    {
        Header: 'Company',
        Footer: 'Company',
        accessor: 'company',
        sticky: 'left'
    },
    {
        Header: 'Ticker',
        Footer: 'Ticker',
        accessor: 'ticker',
        sticky: 'left'
    },
    {
        Header: 'Holding',
        Footer: 'Holding',
        accessor: 'holding',
        Cell: props => <>{printNumber(props.value)}</>
    },
    {
        Header: 'Market Value',
        Footer: 'Market Value',
        accessor: 'market value($)',
        Cell: props => <>{printCurrency(props.value)}</>
    },
    {
        Header: 'Weight',
        Footer: 'Weight',
        accessor: 'weight(%)',
        Cell: props => <>{printNumber(props.value)}%</>
    },
    {
        Header: 'Change',
        Footer: 'Change',
        accessor: '% change',
        Cell: props => <>{twoDecimal(props.value)}%</>
    },
]
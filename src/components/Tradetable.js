import React, { useState, useMemo } from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import { Table, Button } from 'react-bootstrap'
import './Table.css'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SortIcon from '@material-ui/icons/Sort';
import Statmodal from './Statmodal';

function Tradetable({ trades, table_columns, tradeData, holdingData}) {
    const columns = useMemo(() => table_columns, [table_columns])
    const data = useMemo(() => trades, [trades])
    const [show, setShow] = useState(false);
    const [focusTicker, setFocusTicker] = useState('');
    const [focusFund, setFocusFund] = useState('');
    const [tickerTradeData, setTickerTradeData] = useState([]);
    const [tickerHoldingData, setTickerHoldingData] = useState([]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useSortBy,
        usePagination
    )

    const { pageIndex } = state

    const clickHandler = (ticker, fund) => {
        setShow(true);
        setFocusTicker(ticker);
        setFocusFund(fund);
        let data = tradeData.filter(trade => trade.ticker === ticker);
        data = data.filter(trade => trade.fund === fund);
        setTickerTradeData(data);
        data = holdingData.filter(trade => trade.ticker === ticker);
        data = data.filter(trade => trade.fund === fund);
        setTickerHoldingData(data);
    }

    return (
        <div className="Tradetable">
            <Table striped bordered hover variant="dark" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div className="Tradetable__header">
                                        <div>{column.render('Header')}</div>
                                        <div className="Tradetable__sort">
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <ArrowDropDownIcon />
                                                    : <ArrowDropUpIcon />
                                                : <SortIcon />}
                                        </div>
                                    </div>
                                    
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} 
                                className="Tradetable__row"
                                onClick={() => clickHandler(row.values.ticker, row.values.fund)}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className="Tradetable__page">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </Button>{' '}
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </Button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </Button>{' '}
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </Button>{' '}
            </div>
            <Statmodal ticker={focusTicker}
                        fund={focusFund}
                        show={show}
                        handleClose={() => setShow(false)}
                        tradeData={tickerTradeData}
                        holdingData={tickerHoldingData}/>
        </div>

    )
}

export default Tradetable

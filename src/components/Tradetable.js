import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import { Table, Button } from 'react-bootstrap'
import './Table.css'

function Tradetable({ trades, table_columns }) {
    const columns = useMemo(() => table_columns, [table_columns])
    const data = useMemo(() => trades, [trades])

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
        usePagination
    )

    const { pageIndex } = state

    return (
        <div className="Tradetable">
            {/* <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Fund</th>
                        <th>Company</th>
                        <th>Ticker</th>
                        <th>Holding</th>
                        <th>Market Value($)</th>
                        <th>Weight(%)</th>
                        <th>Aciton</th>
                        <th>Shares</th>
                        <th>% change</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tradeData.map((data, index) => {
                            return (
                                <tr key={`trade_${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{data['date']}</td>
                                    <td>{data['fund']}</td>
                                    <td>{data['company']}</td>
                                    <td>{data['ticker']}</td>
                                    <td>{data['holding']}</td>
                                    <td>{data['market value($)']}</td>
                                    <td>{data['weight(%)']}</td>
                                    <td>{data['action']}</td>
                                    <td>{data['shares']}</td>
                                    <td>{data['% change']}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> */}
            <Table striped bordered hover variant="dark" {...getTableProps()}>

                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
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
        </div>

    )
}

export default Tradetable

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { getToken } from '../App';
import { closeMeeting } from '../API';

export function handleMeetingAttendance(meetingId) {
  window.open(`/checkin/${meetingId}`);
}



export async function handleMeetingClose(meetingId) {

  const result = await closeMeeting({
    meetingId: meetingId,
    token: getToken()
  });

}


export default function MeetingTable({ data }) {

  const navigate = useNavigate();

  // Create a state
  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("opentime", value);
    setFilterInput(value);
  };

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Meetings",
        // First group columns
        columns: [
          {
            Header: "ID",
            accessor: "id",
            sortType: "alphanumeric"
          },
          {
            Header: "Location",
            accessor: "location",
            sortType: "alphanumeric"
          },
          {
            Header: "Open Time",
            accessor: "opentime",
            sortType: "basic"
          },
          {
            Header: "Opened By",
            accessor: "openedby",
            sortType: "alphanumeric"
          },
          {
            Header: "Close Time",
            accessor: "closetime",
            sortType: "basic"
          },
          {
            Header: "Attendees",
            accessor: "attendee_count",
            sortType: "alphanumeric"
          },
          {
            Header: "Status",
            Cell: ({ cell }) => (
              <div>
                {cell.row.values.closetime === "" ? "Open" : "Closed"}
              </div>
            )
          },
          {
            Header: "Type",
            accessor: "type"
          },
          {
            Header: "Actions",
            Cell: ({ cell }) => (
              <div>
                <button className="actionbutton" value={cell.row.values.id} onClick={() => navigate(`/meeting/${cell.row.values.id}`)}>
                  Details
                </button>
              </div>
            )
          }
        ]
      }],
    []
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search by date"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ↑' : ' ↓') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50, 1000].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

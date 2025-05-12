import React, { useState, useMemo } from 'react';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

export default function PaginatedDataGrid({
    columns,
    rows,
    rowKeyGetter,
    headerRowHeight = 80,
    defaultColumnOptions = { sortable: true, resizable: true },
    defaultPageSize = 25,
    pageSizeOptions = [10, 25, 50, 100],
    theme = 'rdg-dark',
    showFilters = false,
    filters = {},
    setFilters = () => { },
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
    const [sortColumns, setSortColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const filteredRows = useMemo(() => {
        return rows.filter(row => {
            if (filters.student_id && !String(row.student_id).includes(filters.student_id)) {
                return false;
            }
            if (filters.student_name && !row.student_name.toLowerCase().includes(filters.student_name.toLowerCase())) {
                return false;
            }
            if (filters.gender !== 'All' && row.gender !== filters.gender) {
                return false;
            }
            return true;
        });
    }, [rows, filters]);


    const sortedRows = useMemo(() => {
        if (!sortColumns.length) return filteredRows;
        const [{ columnKey, direction }] = sortColumns;
        return [...filteredRows].sort((a, b) => {
            const aVal = a[columnKey];
            const bVal = b[columnKey];
            const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            return direction === 'ASC' ? cmp : -cmp;
        });
    }, [filteredRows, sortColumns]);

    const paginatedRows = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedRows.slice(start, start + rowsPerPage);
    }, [sortedRows, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

    return (
        <div className="space-y-4 flex flex-col h-full">
            {/* Pagination Controls */}
            <div className="flex justify-between items-center text-white mt-2 text-sm flex-shrink-0">
                <div className='flex items-center gap-2 whitespace-nowrap'>
                    <label htmlFor="rows-per-page" className="shrink-0">Rows per page: </label>
                    <select
                        id="rows-per-page"
                        className="ml-2 px-2 py-1 border rounded bg-[#1a1a1a] w-16 text-sm"
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <DataGrid
                    columns={columns}
                    rows={paginatedRows}
                    rowKeyGetter={rowKeyGetter}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                    sortColumns={sortColumns}
                    onSortColumnsChange={setSortColumns}
                    defaultColumnOptions={defaultColumnOptions}
                    className={`${theme} h-full`}
                    headerRowHeight={headerRowHeight}
                />
            </div>
        </div>
    );
}

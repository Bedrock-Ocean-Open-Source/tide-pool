import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

interface TableProps<T> {
  columns: ColumnDef<T, string>[];
  data: T[];
  isLoading: boolean;
}

export const Table = <T,>({
  columns,
  data,
  isLoading,
}: TableProps<T>) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading ) {
    // TODO: Add the loading status to the table instead of its own return statement
    // Third party package should be able to handle this
    return (
        <h2>Loading...</h2>
    )
  }
  return (
    // TODO: Add styling to:
    //   1. keep headers sticky at the top
    //   2. move the scroll bar into the tbody component
    //   3. set a consistent width regardless of search value
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row =>{
          return (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => {
              return (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )})}
          </tr>
        )
        })}
      </tbody>
    </table>
  )
}
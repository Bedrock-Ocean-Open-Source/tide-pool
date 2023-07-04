import { createColumnHelper } from '@tanstack/react-table'
import { Survey } from './types'
import { SortOrder } from '@/shared/types/sort';

// Generate Table Information
// TODO: Determine what columns we want to show to the user
export const columnHelper = createColumnHelper<Survey>()
export const SURVEY_TABLE_COLUMNS = [
  columnHelper.accessor('entry_id', {
    header: 'Entry Id',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('survey_id', {
    header: 'Survey Id',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('created', {
    header: 'Date',
    cell: info => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('device_make', {
    header: 'Device Make',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('device_model', {
    header: 'Device Model',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('flag_file', {
    header: 'Flag',
    cell: (info) => (info.getValue() ? (<img src={`https://www.gmrt.org/images/flags/${info.getValue()}`} alt={info.row.original.flag_alt}/>) : null )
  }),
  columnHelper.accessor('url', {
    header: 'Link',
    cell: info => (
      <a href={info.getValue()}>
        {/* Link icon taken from https://heroicons.com/ */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      </a>
    ),
  }),
];

export const SURVEY_SORT_OPTIONS: SortOrder<Survey>[] = [
  {
    key: 'created',
    order: 'asc',
    label: 'Date (Newest First)'
  },
  {
    key: 'created',
    order: 'desc',
    label: 'Date (Oldest First)'
  },
]
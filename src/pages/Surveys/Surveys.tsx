import { useEffect, useState } from 'react'

import { getSurveys, surveysSlice } from './surveysSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks'
import { Table } from '@/components/Table'
import { SURVEY_SORT_OPTIONS, SURVEY_TABLE_COLUMNS } from './constants'
import { DebounceInput } from '@/components/DebounceInput'


export const Surveys = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSurveys());
  }, [])

  const { isLoading, displaySurveys, displayedTotalArea } = useAppSelector((store) => (store.surveys))
  const [filter, setFilter] = useState<string>()
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);

  // TODO: The 3rd party package for managing the table component can handle filtering and
  // sorting on its own.
  //
  // Future implementation of the table could utilize this functionality without managing
  // this behavior through the store.
  //
  // We could alternatively manage the filter/sort functionality within the component state
  // itself which could help simplify the store structure.
  useEffect(() => {
    dispatch(surveysSlice.actions.filterSurveys(filter))
  }, [filter]);


  useEffect(() => {
    const sortOrder = SURVEY_SORT_OPTIONS[selectedOrderIndex]
    dispatch(surveysSlice.actions.sortSurveys(sortOrder))
  }, [selectedOrderIndex]);


  return (
    // NOTE: This is my first attempt at using Tailwind - its pretty interesting
    <div className='h-screen flex flex-col p-3 gap-y-2'>
      <h1 className="flex-initial font-bold text-3xl">Survey Cruise Data</h1>
      <div className="flex-initial flex flex-row gap-x-2">
        <DebounceInput placeholder='Search by Entry Id' value={filter} onChange={(val) => setFilter(val?.toString())} />
        {/* TODO: Add select component styling to match input */}
        <select value={selectedOrderIndex} onChange={(e) => setSelectedOrderIndex(e.target.value as unknown as number)}>
          {SURVEY_SORT_OPTIONS.map((opt, i) => (<option key={i} value={i}>{opt.label}</option>))}
        </select>
      </div>
      <div className='flex flex-row gap-x-1'>
        <h3>Total Area:</h3>
        <h3>{displayedTotalArea.toString()}</h3>
      </div>
      <div className='overflow-y-scroll'>
        <Table
          columns={SURVEY_TABLE_COLUMNS}
          data={displaySurveys}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Survey, SurveysSliceState } from './types';
import { WritableDraft } from 'immer/dist/internal';
import { SortOrder } from '@/shared/types/sort';
import { getTotalArea, sortByKey } from './utils';


const initialState: SurveysSliceState = {
  isLoading: true,
  sortOrder: {
    key: 'created',
    order: 'asc',
  },
  surveys: [],
  displaySurveys: [],
  displayedTotalArea: 0,
};

export const getSurveys = createAsyncThunk(
  'main/getSurveys',
  async () => {
    const response = await fetch('https://www.gmrt.org/services/GmrtCruises.php')
    return (await response.json());
  }
)

export const surveysSlice: Slice<SurveysSliceState> = createSlice({
  name: 'cruise',
  initialState,
  reducers: {
    filterSurveys: (state: WritableDraft<SurveysSliceState>, action: PayloadAction<string>) => {
      const newDisplayedSurveys = state.surveys.filter((survey) => {
        // TODO: Requirements state "Filter cruises by ship name, or by entry_id"
        // Add a check to filter for the ship name as well - Not currently sure which field that is
        return survey.entry_id.toUpperCase().includes(action.payload.toUpperCase());
      })
      return {
        ...state,
        displaySurveys: newDisplayedSurveys,
        displayedTotalArea: getTotalArea(newDisplayedSurveys)
      }
    },
    sortSurveys: (state: WritableDraft<SurveysSliceState>, action: PayloadAction<SortOrder<Survey>>) => {
      return {
        ...state,
        sortOrder: action.payload,
        displaySurveys: [...state.displaySurveys].sort((a, b) => sortByKey(a, b, action.payload.order, action.payload.key)),
        surveys: [...state.surveys].sort((a, b) => sortByKey(a, b, action.payload.order, action.payload.key)),
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSurveys.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    }),
    builder.addCase(getSurveys.fulfilled, (state, action) => {
      action.payload.sort((a: Survey, b: Survey) => sortByKey(a, b, state.sortOrder.order, state.sortOrder.key))
      return {
        ...state,
        isLoading: false,
        surveys: action.payload,
        displaySurveys: action.payload,
        displayedTotalArea: getTotalArea(action.payload)
      }
    }),
    builder.addCase(getSurveys.rejected, (state, action) => {
      // TODO: handle errors
      return {
        ...state,
        isLoading: false,
      }
    })
  },
});

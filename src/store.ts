import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ProjectCategory = 'All' | 'Garage' | 'Commercial' | 'Basement'

interface UiState {
  galleryFilter: ProjectCategory
  quoteSubmitted: boolean
}

const initialState: UiState = {
  galleryFilter: 'All',
  quoteSubmitted: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGalleryFilter: (state, action: PayloadAction<ProjectCategory>) => {
      state.galleryFilter = action.payload
    },
    setQuoteSubmitted: (state, action: PayloadAction<boolean>) => {
      state.quoteSubmitted = action.payload
    },
  },
})

export const { setGalleryFilter, setQuoteSubmitted } = uiSlice.actions

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface NoteState {
    currentNote: object
}

// Define the initial state using that type
const initialState: NoteState = {
    currentNote: {},
}

export const noteSlice = createSlice({
    name: 'note',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        update: (state, action) => {
            console.log(action)
            state.currentNote = action.payload
        },
    },
})

export const { update } = noteSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNote = (state: RootState) => state.note.currentNote

export default noteSlice.reducer
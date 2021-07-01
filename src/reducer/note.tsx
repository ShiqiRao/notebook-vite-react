import { createSlice } from '@reduxjs/toolkit'
import { INote } from "../common/INote"
import type { RootState } from '../store/store'

// Define a type for the slice state
interface NoteState {
    currentNote: INote,
    noteList: INote[],
}

// Define the initial state using that type
const initialState: NoteState = {
    currentNote: {
        content: '',
        create_at: new Date().getTime(),
        update_at: new Date().getTime()
    },
    noteList: [],
}

export const noteSlice = createSlice({
    name: 'note',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        selectCurrentNote: (state, action) => {
            state.currentNote = action.payload
        },
        updateNoteList: (state, action) => {
            state.noteList = action.payload
        }
    },
})

export const { selectCurrentNote, updateNoteList } = noteSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNote = (state: RootState) => state.note

export default noteSlice.reducer
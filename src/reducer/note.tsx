import { createSlice } from '@reduxjs/toolkit'
import { INote } from "../common/INote"
import type { RootState } from '../store/store'

// Define a type for the slice state
interface NoteState {
    currentNote: INote,
    noteList: INote[],
    page: number,
    hasNext: boolean
}

// Define the initial state using that type
const initialState: NoteState = {
    currentNote: {
        id: 0,
        content: '',
        create_at: new Date().getTime(),
        update_at: new Date().getTime()
    },
    noteList: [],
    page: 1,
    hasNext: true
}

export const noteSlice = createSlice({
    name: 'note',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setCurrentNote: (state, action) => {
            state.currentNote = action.payload
        },
        setNoteList: (state, action) => {
            state.noteList = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setHasNext: (state, action) => {
            state.hasNext = action.payload
        }
    },
})

export const { setCurrentNote, setNoteList, setPage, setHasNext } = noteSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNote = (state: RootState) => state.note

export default noteSlice.reducer
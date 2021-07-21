import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { INote } from "../common/INote"
import { db } from '../common/Model'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface NoteState {
    currentNote: INote,
    noteList: INote[],
    page: number,
    hasNext: boolean
}

interface FetchNoteArg {
    firstPage: boolean,
    page: number,
    folder_id?: number
}

interface FetchNotePayload {
    noteList: INote[],
    firstPage: boolean,
    currentPage: number,
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

export const fetchNote = createAsyncThunk(
    'note/fetchNoteStatus',
    async (arg: FetchNoteArg) => {
        //fixme:这里的page貌似不需要传入，可以直接获取
        const currentPage = arg.firstPage ? 1 : arg.page;
        const noteList = await db.getNote({
            limit: 12,
            page: currentPage,
            folder_id: arg.folder_id
        })
        return { noteList, firstPage: arg.firstPage, currentPage } as FetchNotePayload
    }
)

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
    extraReducers: (builder) => {
        builder.addCase(fetchNote.fulfilled, (state, { payload }) => {
            const list = payload.noteList
            if (payload.firstPage) {
                state.noteList = list
                state.currentNote = list[0]
            } else {
                state.noteList = state.noteList.concat(list)
            }
            if (list.length == 12) {
                state.hasNext = true
                state.page = payload.currentPage + 1
            } else {
                state.hasNext = false
            }
        })
    }
})

export const { setCurrentNote, setNoteList, setPage, setHasNext } = noteSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectNote = (state: RootState) => state.note

export default noteSlice.reducer
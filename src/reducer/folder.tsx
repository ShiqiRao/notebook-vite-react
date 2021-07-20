import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFolder } from "../common/IFolder"
import { db } from '../common/Model'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface FolderState {
    currentFolder: IFolder,
    folderList: IFolder[],
    page: number,
    hasNext: boolean
}

// Define the initial state using that type
const initialState: FolderState = {
    currentFolder: {
        id: 0,
        name: '',
        create_at: new Date().getTime(),
        update_at: new Date().getTime()
    },
    folderList: [],
    page: 1,
    hasNext: true
}

export const fetchFolder = createAsyncThunk(
    'folder/fetchFolderStatus',
    async () => {
        const folders = await db.getFolder()
        if (folders.length == 0) {
            db.addFolder("默认文件夹")
            const defaultFolders = await db.getFolder()
            return defaultFolders as IFolder[]
        }
        return folders as IFolder[]
    }
)

export const FolderSlice = createSlice({
    name: 'Folder',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setCurrentFolder: (state, action) => {
            state.currentFolder = action.payload
        },
        setFolderList: (state, action) => {
            state.folderList = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setHasNext: (state, action) => {
            state.hasNext = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFolder.fulfilled, (state, { payload }) => {
            state.folderList = payload
            if (!state.currentFolder.id) {
                state.currentFolder = payload[0]
            }
        })
    }
})

export const { setCurrentFolder, setFolderList, setPage, setHasNext } = FolderSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFolder = (state: RootState) => state.folder

export default FolderSlice.reducer
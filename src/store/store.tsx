import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import folderReducer from '../reducer/folder'
import noteReducer from '../reducer/note'


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // prepend and concat calls can be chained
      .concat(logger),
  reducer: {
    note: noteReducer,
    folder: folderReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

function additionalMiddleware(additionalMiddleware: any, arg1: any) {
  throw new Error('Function not implemented.')
}

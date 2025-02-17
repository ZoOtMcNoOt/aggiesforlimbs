// app/store.tsx
import { configureStore } from "@reduxjs/toolkit"
// Import any reducers you need here.  Replace these with your actual reducers.
import counterReducer from "./counter/counterSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add other reducers here
  },
})

// Infer the type from the store above
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


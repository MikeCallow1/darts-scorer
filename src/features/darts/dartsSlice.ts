import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
// import { fetchCount } from "./counterAPI"

interface Player {
  name: string;
  scores: number[];
}

export interface DartsSliceState {
  players: Player[];
  status: "idle" | "loading" | "failed";
  currentPlayer: number;
  score: number;
}

const initialState: DartsSliceState = {
  players: [],
  status: "idle",
  currentPlayer: 0,
  score: 501,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const dartsSlice = createAppSlice({
  name: "darts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    addPlayer: create.reducer(
      (state, action: PayloadAction<string>) => {
        if (action.payload) {
          state.players.push({
            name: action.payload,
            scores: [],
          })
        }
      }
    ),

    removePlayer: create.reducer(
      (state) => {
        state.players.pop();
      }
    ),

    setGameScore: create.reducer(
      (state, action: PayloadAction<number>) => {
          state.score = action.payload;
      }
    ),

    resetGame: create.reducer(
      (state) => {
        return {
          ...state,
          players: [],
          status: "idle",
          currentPlayer: 0,
          score: 501,
        }
      }
    ),

    setWinner: create.reducer(
      (state, action) => {
        
      }
    ),

    addScore: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.players[state.currentPlayer].scores.push(action.payload);
        if (state.currentPlayer === state.players.length - 1) {
          state.currentPlayer = 0;
        } else {
          state.currentPlayer = state.currentPlayer + 1;
        }
      }
    )
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchCount(amount)
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading"
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle"
    //       state.value += action.payload
    //     },
    //     rejected: state => {
    //       state.status = "failed"
    //     },
    //   },
    // ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    players: darts => darts.players,
    currentPlayer: darts => darts.currentPlayer,
    scoreToPlayTo: darts => darts.score,
  },
})

// Action creators are generated for each case reducer function.
export const { addScore, addPlayer, removePlayer, setGameScore, resetGame } =
  dartsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { players, currentPlayer, scoreToPlayTo } = dartsSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// add validation here. No score over 180, no minus values etc.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState())

//       if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//         dispatch(incrementByAmount(amount))
//       }
//     }

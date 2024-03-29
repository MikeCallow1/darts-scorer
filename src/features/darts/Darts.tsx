import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Darts.module.css"
import {
  addScore,
  addPlayer,
  removePlayer,
  setGameScore,
  resetGame,
  players,
  currentPlayer,
  scoreToPlayTo
} from "./dartsSlice"
import { checkouts } from "../../utils/checkouts"

export const Darts = () => {
  const dispatch = useAppDispatch()
  const playersArray = useAppSelector(players);
  const playerIdx = useAppSelector(currentPlayer)
  const scoreToPlay = useAppSelector(scoreToPlayTo)
  const [score, setScore] = useState("0")
  const curPlayer = playersArray[playerIdx]
  const [ready, setReady] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const incrementValue = Number(score) || 0

  if (!ready) {
    return (
      <div>
        <div className={styles.header}>
          {playersArray.map((player) => {
            return (
              <div>{player.name}</div>
            )
          })}
        </div>
        <form onSubmit={e => {
          e.preventDefault();
          dispatch(addPlayer(playerName))
          setPlayerName("");
        }}>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set player name"
              value={playerName}
              type="text"
              onChange={e => {
                setPlayerName(e.target.value)
              }}
            />
            <button
              className={styles.buttonSecondary}
              type="submit"
            >
              Add Player
            </button>
            {playersArray.length > 0 && (
              <button
                className={styles.buttonSecondary}
                onClick={e => dispatch(removePlayer())}
              >
                Remove Player
              </button>
            )}
          </div>
          <div className={styles.radios}>
            <input
              type="radio"
              className={styles.radio}
              onClick={(e) => dispatch(setGameScore(501))}
              value={501}
              id="game-501"
              name="score"
              checked={501 === scoreToPlay}
            />
            <label htmlFor="game-501">501</label>
            <input
              type="radio"
              className={styles.radio}
              onClick={(e) => dispatch(setGameScore(401))}
              value={401}
              id="game-401"
              name="score"
              checked={401 === scoreToPlay}
            />
            <label htmlFor="game-401">401</label>
            <input
              type="radio"
              className={styles.radio}
              onClick={(e) => dispatch(setGameScore(301))}
              value={301}
              id="game-301"
              name="score"
              checked={301 === scoreToPlay}
            />
            <label htmlFor="game-301">301</label>
          </div>
          {(playersArray.length > 0) && (
            <div className={styles.row}>
              <button
                className={styles.button}
                onClick={() => setReady(true)}
              >
                Go
              </button>
            </div>
            )}          
        </form>
      </div>
    )
  }
  
  const totalPoints = curPlayer.scores.reduce((acc, cur) => acc + cur, 0);
  const scoreLeft = scoreToPlay - totalPoints
  const average = totalPoints / curPlayer.scores.length;
  
  const checkout = checkouts[scoreLeft] ?? [];
  
  if (scoreLeft === 0) {
    return (
      <div>
        {curPlayer.name} wins.
        <button
          className={styles.button}
          type="reset"
          onClick={e => {
            dispatch(resetGame());
            setReady(false);
          }}
        >
          Reset
        </button>
      </div>
    )
  }  

  return (
    <>
      <div>
        <div className={styles.header}>
          <div className={styles.name}>
            {curPlayer.name} to throw
          </div>
          <div className={styles.score}>
            {scoreLeft}
          </div>
          <div className={styles.checkout}>
            {checkout.map(c => {
              return <span className={styles.throw}>{c}</span>
            })}
          </div>
        </div>
        <div className={styles.row}>
          <form onSubmit={e => {
            e.preventDefault();
            dispatch(addScore(incrementValue));
            setScore("");
          }}>
            <input
              className={styles.textbox}
              aria-label="Add score"
              value={score}
              type="number"
              max={scoreLeft <= 180 ? scoreLeft : 180}
              min={0}
              onChange={e => {
                setScore(e.target.value)
              }}
            />
            <button
              className={styles.button}
              type="submit"
            >
              Add Score
            </button>
          </form>  
        </div>
      </div>
      <div className={styles.scoresWrapper}>
          {
            playersArray.map(player => {
              return (
                <div className={styles.scores}>
                  <div className={styles.name}>
                    {player.name}
                  </div>
                  {player.scores.map(score => {
                    return (
                      <>
                        <div className={styles.score}>{score}</div>
                      </>
                    )
                  })}
                  <div>
                    Averages: {average ? average.toFixed(2) : 0}
                  </div>
                </div>
              )
            })
          }
      </div>
    </>
  )
}

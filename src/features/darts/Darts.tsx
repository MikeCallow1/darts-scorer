import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Darts.module.css"
import {
  addScore,
  addPlayer,
  removePlayer,
  setGameScore,
  players,
  currentPlayer,
  scoreToPlayTo
} from "./dartsSlice"

export const Darts = () => {
  const dispatch = useAppDispatch()
  const playersArray = useAppSelector(players);
  const playerIdx = useAppSelector(currentPlayer)
  const scoreToPlay = useAppSelector(scoreToPlayTo)
  const [score, setScore] = useState("0")
  const curPlayer = playersArray[playerIdx]
  const [ready, setReady] = useState(false);
  const [playerName, setPlayerName] = useState("");

  console.log(curPlayer)

  const incrementValue = Number(score) || 0

  if (!ready) {
    return (
      <div>
        <div className={styles.row}>
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
              className={styles.button}
              type="submit"
            >
              Add Player
            </button>
            {playersArray.length > 0 && (
              <button
                className={styles.button}
                onClick={e => dispatch(removePlayer())}
              >
                Remove Player
              </button>
            )}
          </div>
          <div className={styles.row}>
            <input
              type="radio"
              className={styles.button}
              onClick={(e) => dispatch(setGameScore(501))}
              value={501}
              id="game-501"
              name="score"
              checked={501 === scoreToPlay}
            />
            <label htmlFor="game-501">501</label>
            <input
              type="radio"
              className={styles.button}
              onClick={(e) => dispatch(setGameScore(401))}
              value={401}
              id="game-401"
              name="score"
              checked={401 === scoreToPlay}
            />
            <label htmlFor="game-401">401</label>
            <input
              type="radio"
              className={styles.button}
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

  const scoreLeft =
    scoreToPlay - curPlayer.scores.reduce((acc, cur) => acc + cur, 0);
  
  if (scoreLeft === 0) {
    return (
      <div>
        {curPlayer.name} wins.
      </div>
    )
  }  

  return (
    <>
      <div>
        {curPlayer.name} to throw.
        {scoreLeft}
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
      <div className={styles.row}>
          {
            playersArray.map(player => {
              return (
                <>
                  <div>
                    {player.name}
                  </div>
                  <div>
                    {player.scores.map(score => {
                      return (
                        <>
                          <div>{score}</div>
                        </>
                      )
                    })}
                  </div>
                </>
              )
            })
          }
      </div>
    </>
  )
}

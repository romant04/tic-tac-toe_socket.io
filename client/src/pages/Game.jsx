import React from 'react'
import { Grid, Container, useTheme, Typography, Stack } from '@mui/material'
import { isValid, isWinner } from '../utils/gameLogic'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Game({ socket }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const [left, setLeft] = useState(false)
  const [redirectTime, setRedirectTime] = useState(2)
  /* TODO: persist game data when page refressh */
  /* TODO: change the win alert to winning screen,  */


  const [currentBoard, setCurrentBoard] = useState(
    Array.from(Array(9), () => {
      return ''
    }),
  )

  const { state } = useLocation()
  const { symbol, opponentName, myName } = state

  const YOU = symbol
  const [yourTurn, setYourTurn] = useState(symbol == 'X' ? true : false)

  socket.on('played', (board) => {
    setCurrentBoard(board)
    setYourTurn(true)
  })

  socket.on('left', () => {
    /* Show text message */
    setLeft(true)

    /* Changes redirect time and then redirect to home page */
    setTimeout(() => {
      setRedirectTime(2)
    }, 999)
    setTimeout(() => {
      setRedirectTime(1)
    }, 1999)
    setTimeout(() => {
      setRedirectTime(0)
      navigate("/")
    }, 3000)
  })

  useEffect(() => {
    if (isWinner(currentBoard, YOU)) {
      alert('YOU ARE THE WINNER!!')
    } else if (isWinner(currentBoard, YOU == 'X' ? 'O' : 'X')) {
      alert('YOU LOST :(')
    }
  }, [currentBoard])

  return (
    <>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80vw',
          margin: 'auto',
          mt: 5,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {myName}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {opponentName}
        </Typography>
      </Stack>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'normal', mb: 2 }}>
          {yourTurn ? "It's your turn" : "It's the enemy's turn"}
        </Typography>
        <Grid
          display="grid"
          container
          width="50%"
          height="max-content"
          margin="0 auto"
          gridTemplateColumns="repeat(3, 1fr)"
          gridTemplateRows="repeat(3, 1fr)"
        >
          {Array.from(Array(9), (e, i) => {
            return (
              <Grid
                item
                key={i}
                id={i}
                onClick={(e) => {
                  if (yourTurn && isValid(e.target.children[0].innerText)) {
                    e.target.children[0].innerText = YOU
                    let newBoard = currentBoard
                    newBoard[e.target.id] = YOU
                    setCurrentBoard(newBoard)
                    if (isWinner(currentBoard, YOU)) {
                      alert('YOU ARE THE WINNER!!')
                    } else if (isWinner(currentBoard, YOU == 'X' ? 'O' : 'X')) {
                      alert('YOU LOST :(')
                    }
                    socket.emit('play', newBoard)
                    setYourTurn(false)
                  }
                }}
                sx={{
                  border: '1px solid black',
                  width: '100%',
                  position: 'relative',
                  paddingTop: '100%',
                  cursor: 'pointer',
                  transition: 'all .2s ease-in',
                  '&:hover': {
                    backgroundColor: yourTurn ? theme.palette.grey[200] : '',
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {currentBoard[i]}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
        {left && <Typography color="warning.main">You will be redirected in {redirectTime}</Typography>}
      </Container>
    </>
  )
}

export default Game

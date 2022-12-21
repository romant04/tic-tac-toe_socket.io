import { Button, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function Gameover() {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const win = location.state.win

  const handleReturn = () => {
    navigate('/')
  }

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '70vw',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        The game is over
      </Typography>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          color:
            win === 'draw'
              ? theme.palette.info.main
              : win === true
              ? theme.palette.success.main
              : theme.palette.error.main,
        }}
      >
        {win === 'draw' ? 'Draw' : win === true ? 'You win' : 'You lost'}
      </Typography>
      <Button sx={{ mt: 3 }} onClick={handleReturn} variant="contained">
        Return to main menu
      </Button>
    </Stack>
  )
}

export default Gameover

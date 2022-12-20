import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Join({ socket }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSubmit = () => {
    if (name !== '') {
      socket.emit('join', name)

      setSearched(true)
    } else {
      setError(true)
    }
  }

  socket.on('found', (data) => {
    navigate('/game', {
      state: {
        symbol: data[1],
        opponentName: data[0],
        myName: name,
      },
    })
  })

  return (
    <Stack sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Stack sx={{ width: '40vw', margin: 'auto' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>
          TIC-TAC-TOE
        </Typography>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (name !== '') {
              setError(false)
            }
          }}
          label="Name"
          variant="outlined"
        />
        <Button
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          {searched ? (
            <CircularProgress size={25} sx={{ color: 'white' }} />
          ) : (
            <Typography>Confirm</Typography>
          )}
        </Button>
        {error && (
          <Typography color="error.main" sx={{ textAlign: 'center', mt: 2 }}>
            ERROR: Name must be filled
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default Join

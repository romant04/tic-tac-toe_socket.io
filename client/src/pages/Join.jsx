import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Join({ socket }) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (name !== '') {
      socket.emit('join', name)
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
        <Button sx={{ mt: 1 }} variant="contained" onClick={handleSubmit}>
          Confirm
        </Button>
        {error && (
          <Typography color="warning.main" sx={{ textAlign: 'center', mt: 2 }}>
            ERROR: Name must be filled
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default Join

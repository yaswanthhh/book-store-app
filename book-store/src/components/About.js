import { Box, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <div>
        <Box display='flex' flexDirection='column' alignItems='center'>
            <br></br>
            <Typography sx={{fontWeight:'bold'}} variant='h3'>This is a book store application</Typography>
            <br></br>
            <Typography variant='h4'>It is a CRUD application using MERN stack.</Typography>
            <Typography variant='h4'>Have a great day!</Typography>
        </Box>
    </div>
  )
}

export default About
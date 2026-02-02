const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Simple API endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'BaddieVerse API is running! 💅',
    message: 'Everything is working perfectly!'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`💅 BaddieVerse backend is ready!`)
})

module.exports = app

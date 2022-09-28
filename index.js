const express = require('express')
const app = express()

const cors = require('cors')

const validateDate = (dateStr) => {
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/) === null) return false

  const date = new Date(dateStr)
  const timestamp = date.getTime()

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false

  return date.toISOString().startsWith(dateStr)
} 

app.use(cors({optionsSuccessStatus: 200}))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/hello', (req, res) => {
  res.json({greeting: 'hello API'})
})

app.get('/api/:timestamp?', (req, res) => {
  const dateParam = req.params.timestamp
  let date

  if (!dateParam) date = new Date()
  else {
    const check = dateParam * 1
    date = isNaN(check) ? new Date(dateParam) : new Date(check)
  }

  if (date == 'Invalid Date') res.json({error: 'Invalid Date'})
  else res.json({unix: date.getTime(), utc: date.toUTCString()})
})

const listener = app.listen(8080, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

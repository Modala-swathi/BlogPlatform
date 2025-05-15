const connectTOMongo = require('./db');
const express = require('express')
connectTOMongo();

const app = express()
const port = 5000

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello Swathi")
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})

const express = require('express')
const express = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`APi Listening on potr ${PORT}`)
})

app.get('/', (req, res) =>{
    res.send("This is API running ")
})

app.get('/about', (req,rs) =>{
    res.send('This is my about')
})

module.export = app
const express = require('express')
const express = express()
const PORT = 4000

append.listen(PORT, () => {
    console.log(`APi Listening on potr ${PORT}`)
})

append.get('/', (req, res) =>{
    res.send("This is API running ")
})

append.get('/about', (req,rs) =>{
    res.send('This is my about')
})

module.export = app
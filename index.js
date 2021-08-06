const express = require('express');
const fetch = require('node-fetch');
const nodecache = require('node-cache');

const myCache = new nodecache({ stdTTL : 10});

const app = express();
const port = 5656;

const todosURL = 'https://jsonplaceholder.typicode.com/todos';

app.get('/todos',(req,res) => {
    if(myCache.has('todos')){
        console.log('Getting from Cache');
        return res.send(myCache.get('todos'))
    }
    else{
        fetch(todosURL)
            .then((response) => response.json())
            .then((json) => {
                myCache.set("todos",json);
                console.log('Getting from API');
                res.send(json);
            });
    }
})

app.get('/stats',(req,res)=>{
    res.send(myCache.getStats());
})


app.listen(port, () => {
    console.log('server is running in '+port);
})
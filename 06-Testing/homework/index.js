const express = require('express');
const app = express();
const {sumaArray, pluck} = require('./logic')


app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test' , (req,res)=>{
  res.send({message:'test'})
})

app.post('/sum', (req, res) => {
  res.send({result: req.body.a + req.body.b});
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const {array,num} = req.body;
  if(!array || !num && num !== 0) res.sendStatus(400);
  return res.json({result: sumaArray(array,num)})
});

app.put('/numString', (req,res)=>{
  let {word} = req.body
  if(word !== undefined){
    if(typeof word === 'string' && word.length > 0){
      return res.send({word: word.length})
    } else {return res.sendStatus(400)}
  } else {return res.sendStatus(200)}
})

app.post('/pluck', (req,res)=>{
  const {array, prop} = req.body
  if(!prop || !Array.isArray(array)) return res.sendStatus(400)
  res.send({result: pluck(array,prop)})
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar

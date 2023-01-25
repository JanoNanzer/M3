const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').send({a:2, b:3}).expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').send({a:2,b:4}).expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 400', () => agent.post('/sumArray').expect(400));
    it('responds with 200', () => agent.post('/sumArray').send({array: [], num:0}).expect(200));
    it('responds with true if num is equal to the combination of two numbers from the array', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    it('responds with return false if num is not equal to the combination of two numbers from the array', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 23})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }))
  });


  // cambiar por get? se puede mandar info por body con put?
  describe('PUT /numString', ()=>{
    it('responds with status 200', () => agent.put('/numString').expect(200))
    it('responds with 4 if the word is `hola`', ()=> agent.put('/numString').send({word: 'hola'}).then((res)=>{expect(res.body.word).toEqual(4)}))
    it('responds status 400 if it is a number', ()=> agent.put('/numString').send({word: 4}).expect(400))
    it('responds status 400 if the string is empty', ()=> agent.put('/numString').send({word: ''}).expect(400))
  });

  describe('POST /pluck', ()=>{
    const array =[{car: 'Ferrari', model: '488'},{car: 'Lamborgini', model: 'Aventador'},{car: 'Porsche', model: '911'},{car: 'Mercedez', model: 'AMG GTR'}]

    const arrayEmpty = [{car: '', model: '488'},{car: '', model: 'Aventador'},{car: '', model: '911'},{car: '', model: 'AMG GTR'}]

    it('responds with status 200', ()=>{
       return agent.post('/pluck').send({array, prop: 'car'}).expect(200)
    })
    it('responds with status 400 if array is not an array', ()=>{
      return agent.post('/pluck').send({array: 'Jano', prop: 'car'}).expect(400)
    })
    it('responds with values of propertis car', ()=>{
      return agent.post('/pluck').send({array, prop: 'car'}).then(res => {expect(res.body.result).toEqual(['Ferrari','Lamborgini','Porsche','Mercedez'])})
    })
    // it('responds with status 400 if property is empty', ()=>{
    //   return agent.post('/pluck').send({arrayEmpty, prop: 'car'}).expect(400)
    // })
  })

});


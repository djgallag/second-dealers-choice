const express = require('express');
const path = require('path');
const { syncAndSeed, models: { Character, Covenant } } = require('./db');


const app = express();
app.use(require('express').json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.post('/api/characters', async(req, res, next)=> {
  try {
    const character = await Character.create(req.body);
    res.status(201).send(character);

  }
  catch(ex){
    next(ex);
  }

});


app.delete('/api/characters/:id', async(req, res, next)=> {
  try {
    await Character.destroy({ where: { id: req.params.id }});
    res.sendStatus(204);

  }
  catch(ex){
    next(ex);
  }

});

app.put('/api/characters/:id', async(req, res, next)=> {
  try {
    const character = await Character.findByPk(req.params.id);
    await character.update(req.body);
    res.send(character);
  }
  catch(ex){
    next(ex);
  }

});
app.get('/api/characters/:id', async(req, res, next)=> {
  try {
    res.send(await Character.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/characters', async(req, res, next)=> {
  try {
    res.send(await Character.findAll({ attributes: { exclude: ['bio']}}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/covenants/:id', async(req, res, next)=> {
  try {
    res.send(await Covenant.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/covenants', async(req, res, next)=> {
  try {
    res.send(await Covenant.findAll({
      attributes: {
        exclude: ['description']
      }
    }));
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

const init = async()=> {
  await syncAndSeed()
  app.listen(port, ()=> console.log(`listening on port ${port}`));
}

init();

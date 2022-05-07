var express = require('express');
var router = express.Router();
const models = require('../lib/models');
const randomWords = require('random-words');
const { Sequelize } = require('sequelize');

/* GET home page. */
router.get('/', async function(req, res, next) {

  const ideas = await models.Ideas.findAll({
    include: [models.Categories,models.Words],
    where: {
      active: true,
      category: 1
    },
    order: [[
      'createdAt', 'DESC'
    ]]
  });

  console.log('ideas ' + JSON.stringify(ideas[0].dataValues));

  const categories = await models.Categories.findAll({
    where: {
      active: true
    }
  })


  res.render('index', { title: 'Express', tableData: ideas, categories: categories, fsFunction: randomWords });
});

router.get('/ideas-by-category/:categoryId', async(req, res, next) => {
  const ideas = await models.Ideas.findAll({
    include: [models.Words],
    where: {
      active: true,
      category: req.params.categoryId
    },
    order: [[
      'createdAt'
    ]]
  });

  res.send({
    msg: 'success',
    ideas: ideas,
  })
});

router.get('/random-word/:categoryId', async(req, res, next) => {
  const word = await models.Words.findAll({
    where: {
      active: true,
      category: req.params.categoryId
    },
    order: [[
      Sequelize.literal('rand()')
    ]],
    limit: 1
  });

  if (word.length === 0) {// no words in category
    res.send({
      msg: 'no words in category',
      word: null
    })
  } else {
    res.send({
      msg: 'success',
      word: word[0].word,
      wordId: word[0].id,
      definition: word[0].definition
    })
  }
});

router.post('/new-idea', async (req, res, next) => {
  console.log(req.body);

  const newIdea = await models.Ideas.create({
    word: req.body.word,
    idea: req.body.idea,
    category: req.body.category
  })

  console.log(newIdea);

  res.status(200);
  res.send({
    msg: 'success',
    id: newIdea.dataValues.id
  });
})

router.post('/update-idea-rating/:id/:rating', async (req, res, next) => {
  console.log(req.params);

  await models.Ideas.update({rating:req.params.rating},{where: {id:req.params.id}});

  res.status(200);
  res.send({msg:'success'});
})


router.post('/decom-idea/:id', async (req, res, next) => {
  console.log(req.params);

  await models.Ideas.update({active:false},{where: {id:req.params.id}});

  res.status(200);
  res.send('success');
})

router.post('/update-idea/:id', async (req, res, next) => {
  await models.Ideas.update({idea:req.body.idea},{where: {id:req.params.id}});

  res.status(200);
  res.send('success');
})

module.exports = router;

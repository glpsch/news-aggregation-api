const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserArticles, createArticle, deleteArticle } = require('../controllers/articles');

routerArticles.get('/', getUserArticles);

routerArticles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required(),
    source: Joi.string().required().min(2),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), createArticle);

routerArticles.delete('/:articleId', deleteArticle);

module.exports = routerArticles;

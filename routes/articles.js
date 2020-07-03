const routerArticles = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const { getUserArticles, createArticle, deleteArticle } = require('../controllers/articles');

routerArticles.get('/', getUserArticles);
routerArticles.post('/', createArticle);
// routerCards.post('/', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().uri(),
//   }),
// }), createCard);
routerArticles.delete('/:articleId', deleteArticle);

module.exports = routerArticles;

// # возвращает все сохранённые пользователем статьи
// GET /articles

// # создаёт статью с переданными в теле
// # keyword, title, text, date, source, link и image
// POST /articles

// # удаляет сохранённую статью  по _id
// DELETE /articles/articleId

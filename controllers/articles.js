const Article = require('../models/article');

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/errors');

module.exports.getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
  // TODO
    // .orFail(() => res.send({ message: 'У вас нет сохраненных статей' }))
    .orFail(() => { throw new NotFoundError('У вас нет сохраненных статей'); })
    .then((articles) => {
      res.send({ data: articles.map((article) => article.omitOwner()) });
    })

    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send({ data: article.omitOwner() }))
    .catch((err) => {
      let error = err;
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      next(error);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Такой статьи не существует');
      } else if (article.owner.equals(req.user._id)) {
        article.remove(req.params.articleId);
        res.status(200).send({ message: 'Статья успешно удалена' });
      } else {
        throw new ForbiddenError('Вы не можете удалить чужую статью');
      }
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'CastError') {
        error = new BadRequestError('Некорректный запрос');
      }
      next(error);
    });
};

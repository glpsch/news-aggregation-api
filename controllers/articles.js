const Article = require('../models/article');

const {
  BadRequestError,
  NotFoundError,
} = require('../errors/errors');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
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
    .then((article) => res.send({ data: article.omitPrivate() }))
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
      // eslint-disable-next-line eqeqeq
      } else {
        res.status(200).send({ message: 'Статья успешно удалена' });
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

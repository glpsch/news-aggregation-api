const router = require('express').Router();

const routerArticles = require('./articles');
const routerUsers = require('./users.js');
const routerAuth = require('./auth');

const auth = require('../middlewares/auth');

router.use('/', routerAuth);

router.use(auth);

router.post('/validate', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/articles', routerArticles);
router.use('/users', routerUsers);

module.exports = router;

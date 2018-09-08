const express = require('express'),
      router = express.Router(),
      { list, create, listrepo, unstar, friend } = require('../controllers/index'),
      { signdulu, checkdulu } = require('../controllers/users');

/* GET home page. */
router
    .get('/starred/:username', list)

    .post('/repo', create)

    .get('/repos/:username/:reponame', listrepo)

    .get('/unstar/:username/:reponame', unstar)

    .get('/:org', friend)

    .post('/signinfb', signdulu)

module.exports = router;
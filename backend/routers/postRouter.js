const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/image/:id', postController.getImageById);
router.get('/images/:id/getComments', postController.getCommentsByImage);
router.post('/images/:id/addComment', postController.addComment);

module.exports = router;
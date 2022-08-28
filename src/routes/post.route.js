const express = require('express');
const postController = require('../app/controllers/post.controller');
const authMiddleware = require('../app/middlewares/auth.middleware');
const router = express.Router();

// get
router.get('/:slug', postController.getPostBySlug);
router.get('/user/:id', authMiddleware.verifyToken, postController.getPostsByUserId);

// update
router.put('/:id', authMiddleware.verifyToken, postController.updatePost);

// delete
router.delete('/:id', authMiddleware.verifyToken, postController.sortDeletePost);
router.delete('/:id/hardDelete', authMiddleware.verifyToken, postController.hardDeletePost);

// another
router.post('/', authMiddleware.verifyToken, postController.createNewPost);
router.get('/', postController.getPosts);

module.exports = router;

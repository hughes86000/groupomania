const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();
const PostCtrl = require('../controllers/post.controller');

router.post('/',auth, multer, PostCtrl.createPost);

router.put('/:id',auth, multer, PostCtrl.modifyPost);

router.delete('/:id',auth, PostCtrl.deletePost);

router.get('/:id', auth, PostCtrl.getOnePost);

router.get('/',auth, PostCtrl.getAllPost);

router.post('/like',auth, PostCtrl.likePost);

module.exports = router;

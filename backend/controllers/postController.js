const postService = require('../services/postService');

const getImageById = (req, res) => {
  console.log('Fetching image by ID:', req.params.id);
  const imageId = req.params.id;
  postService.getImageById(imageId, (err, result) => {
    if (err) return res.status(404).json({ message: 'Image not found' });
    res.json(result);
  });
};

const getCommentsByImage = (req, res) => {
  const imageId = req.params.id;
  console.log('Fetching comments for image ID:', imageId);
  postService.getCommentsByImage(imageId, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(results);
  });
};

const addComment = (req, res) => {
  const imageId = req.params.id;
  const { email, content } = req.body;

  postService.addComment(imageId, email, content, (err) => {
    if (err) return res.status(400).json({ message: 'Error adding comment' });
    res.json({ message: 'Comment added' });
  });
};

module.exports = {
  getImageById,
  getCommentsByImage,
  addComment,
};
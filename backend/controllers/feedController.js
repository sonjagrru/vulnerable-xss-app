const feedService = require('../services/feedService');

const getFeed = async (req, res) => {
  const email = req.params.email;

  try {
    const feed = await feedService.getImagesFromFollowed(email);
    res.json(feed); // ❗ NEMA sanitizacije — raw data
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFeed };
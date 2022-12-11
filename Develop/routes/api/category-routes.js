const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
}
  // find all categories
  // be sure to include its associated Products
});
// Get one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
}
  
});
// Get one category by its category_name value
router.get('/:category_name', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.category_name, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this name!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
}
}),
  
// create new category
router.post('/', async (req, res) => {
  try {
    console.log(`\n Adding new category: ${req.body.category_name} \n`);
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  }),

// update category by its `id` value

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
}
});
  
// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;

const router = require('express').Router();
const { Model } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'catagory_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['catagory_id']
    } 
    ]
  }).then(catagoryData => res.json(catagoryData))
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
  ],
  include: [
    {
      model: Product,
      attributes: ['category_id']
    }
  ]
  })
  .then(dbCatagoryData => res.json(dbCatagoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  try{
 const newCatagory = Category.create(req.body);
 res.status(200).json(newCatagory);
   } catch (err) {
    res.status(400).json(err)
   }
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
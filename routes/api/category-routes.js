const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const userCategory = await Category.findAll({
      include: Product
    });
    res.status(200).json(userCategory)
  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const userCategory = await Category.findByPk(req.params.id, {
      include:Product,
    });
    if(!userCategory){
      res.status(404).json({message:'No category found with this id!'});
    }
    req.status(200).json(userCategory);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const userCategory = await Tag.create({category_name: req.body.category_name});
    res.status(200).json(userCategory);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  Category.update(req.body,{
    where: {
      id: req.params.id
    }
  })
    .then(userCategory => {
      if (!userCategory[0]){
        res.status(404).json({message: "No category found with this id!"});
        return;
      }
      res.json(userCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try{
    const userCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!userCategory){
      res.status(404).json({message:'No category was found with this id!'});
      return;
    }
    res.status(200).json(userCategory);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

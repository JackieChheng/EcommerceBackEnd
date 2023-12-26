const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
try{
  const userTags = await Tag.findAll({
    include: Product
  });
  res.status(200).json(userTags)
}catch(err){
  res.status(500).json(err);
}
});

router.get('/:id', async(req, res) => {
  try{
    const userTags = await Tag.findByPk(req.params.id, {
      include:Product,
    });
    if(!userTags){
      res.status(404).json({message:   'No tag found with this id!'});
    }
    req.status(200).json(userTags);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const userTags = await Tag.create({tag_name: req.body.tag_name});
    res.status(200).json(userTags);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
Tag.update(req.body,{
  where: {
    id: req.params.id
  }
})
  .then(userTags => {
    if (!TagData[0]){
      res.status(404).json({message: "No tag found with this id!"});
      return;
    }
    res.json(userTags);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  try{
    const userTags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!userTags){
      res.status(404).json({message:'No tag was found with this id!'});
      return;
    }
    res.status(200).json(userTags);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

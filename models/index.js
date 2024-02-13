// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsto(Category, {
  foreign_key: 'category:id',
})

// Categories have many Products
Category.belongstoMany(Product, {
  through: {
    model: ProductTag,
    foreign_key: 'product_id',
  },
});

// Products belongToMany Tags (through ProductTag)
Product.belongstoMany(Tag, {
  through: {
    model: ProductTag,
    foreign_key: 'product_id',
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongstoMany(Product, {
  through: {
    model: ProductTag,
    foreign_key: 'product_id',
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreign_key: 'category:id',
})

// Categories have many Products
Category.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreign_key: 'product_id',
  },
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreign_key: 'product_id',
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
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

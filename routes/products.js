import { Router } from 'express';

import Product from '../models/Product';

const router = Router();

router.get('/', (req, res) => {
  Product.find({}, (err, allProducts) => {
    err ? console.log(err) : res.json(allProducts)
  })
})

// ? GET un produit
router.get('/product/:productId', (req, res) => {
  const { productId } = req.params;
  const query = Product.findById(productId);

  query.exec((err, product) => {
    if (err) return console.log(err);
    return res.json(product)
  })
})

router.get('/:category', (req, res) => {
  Product.find({ category: req.params.category }, (err, products) => {
    return err ? console.log(err) : res.json(products)
  })
});

// ? Return 3 fruits aléatoire
router.get('/:category/:limit', (req, res) => {
  const { category, limit } = req.params;
  const query = Product.find({ category: { $eq: category } }).limit(Number(limit));
  query.exec((err, products) => {
    if (err) return console.log(err);
    return res.json(products);
  });
});

router.post('/add', (req, res) => {
  const newProduct = new Product(req.body);

  newProduct.save((err, product) => {
    err ? res.send(err) : res.json(`${product.name} added with success!`);
  })
});

router.get('/delete/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    err ? res.send(err) : res.json(`${product.name} deleted with success!`);
  })
});

router.post('/update/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
    err ? res.send(err) : res.json(`${product.name} updated with success!`);
  })
})

export default router;
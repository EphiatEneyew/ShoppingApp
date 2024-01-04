import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [ {
           id: 'p1',
          title:'My first',
          price: 6,
          description:'This is a first product - amazing!'
},
{
id: 'p2',
title:'My second',
price: 9,
description:'This is a second product - amazing!'
}
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
         {DUMMY_PRODUCT.map( (product) => (<ProductItem
          key={product.id}
          id={product.id}   
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))
         }
      </ul>
    </section>
  );
};

export default Products;

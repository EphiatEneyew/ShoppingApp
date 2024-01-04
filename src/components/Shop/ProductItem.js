import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';


const ProductItem = (props) => {
  const { id, title, price, description } = props;

  const dispatch = useDispatch();

  const addItemOnCartHandler = () => {
        dispatch(cartActions.addItemFromCart({ id:id, price: price, title:title }));
     
  };

  

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick = {addItemOnCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiAction  } from './components/store/ui-slice';
import Notification from './components/UI/Notification';
import { fetchCartData } from './components/store/cart-actions';

let isInitial = false;

function App() {

  const shownCart = useSelector(state=>state.ui.shownCart);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch ();
  const notification = useSelector (state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
     const sendCartData = async () => {
      dispatch(uiAction.shownNotification({
        statu: 'pending...',
        title: 'sending...',
        message: 'sending cart data!',
      }) 
      );
      const response = await fetch('https://redux-sideeffect-eecb0-default-rtdb.firebaseio.com/cart.json' , {
      method: 'PUT',
      body: JSON.stringify({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        }),
       }
       );
    
  
  
       if (!response.ok) {
       throw new Error ('Not successfully sent');
    }
    
        //if there is no error when the cart data is sent to the firebase API we dispach the following action to the notification component.
    dispatch(uiAction.shownNotification({
      statu: 'success...',
      title: 'Success',
      message: 'sending cart data successfully!',
    }) 
    );
};
  

if (isInitial) {
  isInitial = false;
      return;
    }

     
    if (cart.change){
  sendCartData().catch(error => {
    dispatch(uiAction.shownNotification({ ////if there is any error when the cart data is sent to the firebase API we dispach the following action to the notification component.
      statu: 'error',
      title: 'Error',
      message: 'sending cart data failed!',
    }) 
    );
  })
}

  
}, [cart,dispatch]);


  return (
    <Fragment> 
     {notification &&<Notification /> }
      <Layout >
      { shownCart && <Cart /> }
      <Products />
      </ Layout >
    </Fragment>
  );
}

export default App;

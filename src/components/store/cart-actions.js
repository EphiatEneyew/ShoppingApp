import { uiAction } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () =>{
 return async (dispatch) =>{
      //we create nested function fetchData to fetch the data from the firebase because i need to wrap it in try catch block.
    const fetchData = async () =>{
    const response = await fetch('https://redux-sideeffect-eecb0-default-rtdb.firebaseio.com/cart.json');

    if (!response.ok){
        throw new Error ('could not fetch cart data!');
    }

    const data = await response.json();
    return data;
 };

 try {
    const cartData = await fetchData();// cartData has the correct structure already. we dont have make the transformation
    dispatch(cartActions.replaceCart({
          items: cartData.items || [], 
         totalQuantity: cartData.totalQuantity}));

 } catch (error){
    dispatch(uiAction.shownNotification({ ////if there is any error when the cart data is sent to the firebase API we dispach the following action to the notification component.
        statu: 'error',
        title: 'Error',
        message: 'sending cart data failed!',
      }) 
      );
 }

 };
};
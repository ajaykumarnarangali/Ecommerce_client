import { toast } from "react-toastify";
import {IncreaseCount} from '../redux/cart/cartSlice'
import { useDispatch } from "react-redux";

const useAddToCart = () => {
    const dispatch = useDispatch();
  
    const addToCart = async (id) => {
      try {
        const res = await fetch(`/api/cart/add-to-cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id })
        });
  
        const data = await res.json();
  
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
  
        dispatch(IncreaseCount(1));
        toast.success("Product added to cart!!");
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    return addToCart;
  };
  
  export default useAddToCart;
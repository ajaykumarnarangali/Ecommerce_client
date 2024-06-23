import { useState, useEffect } from "react"
import { MdDelete } from "react-icons/md";
import { DecreaseCount } from '../redux/cart/cartSlice'
import { useDispatch } from "react-redux";

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const quantity=cartItems.reduce((acc,curr)=>acc+curr.quantity,0);
  const totalPrice=cartItems.reduce((acc,curr)=>acc+(curr.quantity*curr.productId.sellingPrice),0)

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const res = await fetch(`/api/cart/user-cart`);
        const data = await res.json();

        if (data.success == false) {
          console.log(data.message);
          return
        }
        setCartItems(data.cart);

      } catch (error) {
        console.log(error)
      }
    }
    getCartItems();
  }, []);

  const removeItem = async (id) => {
    try {
      const res = await fetch(`/api/cart/remove-item/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.success == false) {
        console.log(data.message);
        return
      }
      setCartItems(prev => {
        return prev.filter((each) => each.productId._id !== id);
      });
      dispatch(DecreaseCount(1));
    } catch (error) {
      console.log(error);
    }
  }

  const IncreaseCount = async (id) => {
    try {
      const res = await fetch(`/api/cart/increse-quantity/${id}`, {
        method: 'PUT'
      });
      const data = await res.json();

      if (data.success == false) {
        console.log(data.message);
        return
      }

      setCartItems(prev => {
        return prev.map((each) => each.productId._id === id ? data?.cartItem : each)
      })

    } catch (error) {
      console.log(error)
    }
  }
  const DecreaseCount = async (id) => {
    try {
      const res = await fetch(`/api/cart/decrease-quantity/${id}`, {
        method: 'PUT'
      });
      const data = await res.json();

      if (data.success == false) {
        console.log(data.message);
        return
      }

      setCartItems(prev => {
        return prev.map((each) => each.productId._id === id ? data?.cartItem : each)
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
      <div className='w-full max-w-3xl'>
        {
          cartItems?.map((product) => (
            <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
              <div className='w-32 h-32 bg-slate-200 p-2'>
                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
              </div>
              <div className='px-4 py-2 relative'>
                {/**delete product */}
                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'>
                  <MdDelete onClick={() => { removeItem(product?.productId?._id) }} />
                </div>

                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                <div className='flex items-center justify-between'>
                  <p className='text-red-600 font-medium text-lg'>₹{product?.productId?.sellingPrice}</p>
                  <p className='text-slate-600 font-semibold text-lg'>₹{product?.productId?.sellingPrice * product?.quantity}</p>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                  <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '
                    onClick={() => { DecreaseCount(product.productId._id) }}>
                    -
                  </button>
                  <span>{product?.quantity}</span>
                  <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                    onClick={() => { IncreaseCount(product.productId._id) }}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='h-36 w-60 bg-white'>
        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
          <p>Quantity</p>
          <p>{quantity}</p>
        </div>
        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
          <p>Total Price</p>
          <p>₹{totalPrice}</p>
        </div>
        <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>
      </div>
    </div>
  )
}

export default Cart

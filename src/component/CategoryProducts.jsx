import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import useAddToCart from '../helpers/addToCart';

function CategoryProducts() {

  const category = useLocation().search;
  const [products, setProducts] = useState([]);
  const addToCart=useAddToCart()


  useEffect(() => {
    const urlParams = new URLSearchParams(category);

    const getProuducts = async () => {
      try {

        const res = await fetch(`/api/product/all-products?${urlParams.toString()}`);
        const data = await res.json();

        if (data.success == false) {
          toast.error(data.message);
          return
        }

        setProducts(data.products);

      } catch (error) {
        toast.error(error.message)
      }
    }

    if (urlParams) {
      getProuducts();
    }

  }, [category]);

  console.log(products);
  return (
    <div className='container mx-auto px-4 my-6 relative min-h-screen'>
      <h2 className='text-2xl font-semibold py-4 text-center'>{category.split('=')[1]}</h2>
      <div className='flex gap-5 flex-wrap justify-center md:justify-start'>
        {
          products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
              <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                <Link to={`/product-Details/${product._id}`}>
                  <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                </Link>
              </div>
              <div className='p-4 grid gap-3'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                <p className='capitalize text-slate-500'>{product?.category}</p>
                <div className='flex gap-3'>
                  <p className='text-red-600 font-medium'>₹{product?.sellingPrice}</p>
                  <p className='text-slate-500 line-through'>₹{product?.price}</p>
                </div>
                <Button gradientDuoTone={'purpleToBlue'} outline onClick={()=>{addToCart(product._id)}}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryProducts

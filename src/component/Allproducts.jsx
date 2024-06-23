import React, { useEffect, useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function Allproducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {
      try {
        const res = await fetch(`/api/product/all-products`);
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
          return
        }
        setProducts(data.products);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getProducts();

  }, []);


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All product</h2>
        <button className='border border-teal-400 py-1 px-3 rounded-full'>
          <Link to={'/admin-panel/add-product'}>
            Upload product
          </Link>
        </button>
      </div>
      <div className='flex justify-center md:justify-start w-100 min-h-screen md:h-screen flex-wrap gap-4' style={{'overflowY':'scroll'}}>
        {
          products.map((product) => (
            <div className='p-5 flex gap-2 flex-col bg-white rounded-lg mt-2' key={product._id}>
              <img src={product.productImage[0]} className=' h-60 w-60' alt="" />
              <div>
                <p className=' text-xl'>{product.productName.slice(0,20)}</p>
                <p className='font-semibold'>₹{product.price}</p>
              </div>
              <Link to={`/admin-panel/edit-product/${product._id}`}>
                <div className='bg-slate-400 w-fit p-2 rounded-full ms-auto'>
                  <MdModeEditOutline />
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Allproducts
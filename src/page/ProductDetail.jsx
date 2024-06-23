import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalf } from 'react-icons/fa';
import addToCart from '../helpers/addToCart'
import VerticalProducts from '../component/VerticalProducts'
import useAddToCart from '../helpers/addToCart';

function ProductDetail() {

  const [product, setProduct] = useState({});
  const { id } = useParams();
  const addToCart=useAddToCart();
  const [selectedImg, setSelectedImg] = useState();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/product/all-products?id=${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return
        }
        setProduct(data.products[0]);
        setSelectedImg(data?.products[0]?.productImage[0]);
      } catch (error) {
        console.log(error)
      }
    }
    if (id) {
      getProduct();
    }
  }, [id])

  return (
    <>
      <div className='w-screen md:h-[90vh] flex flex-col items-center p-5 overflow-hidden'>
        <div className=' h-2/3 w-screen px-10 flex '>
          <div className='flex w-1/2 '>
            <div className='w-24 h-full flex flex-col gap-2'>
              {
                product?.productImage?.map((image, index) => {
                  return <div className='w-24 h-24' key={index}>
                    <img src={image} alt="" className='w-full h-full cursor-pointer' onMouseEnter={() => { setSelectedImg(image) }} />
                  </div>
                })
              }
            </div>
            <div className='w-full p-5'>
              <img src={selectedImg} alt="image" className='w-full h-full' />
            </div>
          </div>
          <div className='p-5'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{product?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{product?.productName}</h2>
            <p className='capitalize text-slate-400'>{product?.category}</p>

            <div className='text-red-600 flex items-center gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>₹{product.sellingPrice}</p>
              <p className='text-slate-400 line-through'>₹{product.price}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>
                Buy
              </button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'
                onClick={() => { addToCart(product._id) }}>
                Add To Cart
              </button>
            </div>

            <div className='flex flex-wrap items-center gap-1'>
              <p className='text-slate-600 font-medium my-1'>Description : </p>
              <p>{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <VerticalProducts category={product.category} heading={'Recommended Products'} />
    </>
  )
}

export default ProductDetail

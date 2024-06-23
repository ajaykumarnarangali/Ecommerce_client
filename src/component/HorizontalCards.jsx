import { useState, useEffect, useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAddToCart from '../helpers/addToCart'
import scrollToTop from '../helpers/scrollToTop';



function HorizontalCards({ category, heading }) {

    const [products, setProducts] = useState([]);
    const addToCart=useAddToCart()
    const scrollRef = useRef();

    useEffect(() => {

        const getProducts = async () => {
            try {
                const res = await fetch(`/api/product/all-products?category=${category}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    return
                }
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        }
        if (category) {
            getProducts();
        }

    }, [category]);

    const scrollRight = () => {
        scrollRef.current.scrollLeft += 300;
    }
    const scrollLeft = () => {
        scrollRef.current.scrollLeft -= 300;
    }

    return (
        <div className=' h-full mb-5 px-10 py-4'>
            <h1 className='font-semibold text-2xl mb-3'>{heading}</h1>
            <div className='flex items-center relative'>
                <button className='bg-white shadow-md hidden md:block rounded-full p-1 absolute left-0' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md hidden md:block rounded-full p-1 absolute right-0' onClick={scrollRight}><FaAngleRight /></button>
                <div className='w-full h-36 flex gap-3 overflow-x-scroll items-center scrollbar-none transition-all' ref={scrollRef}>
                    {
                        products.length > 0 &&
                        products.map((product) => (
                            <div key={product._id} className='h-36 flex min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white' onClick={scrollToTop}>
                                <div className='flex-1 h-full p-1'>
                                    <Link to={`/product-Details/${product._id}`}>
                                        <img src={product.productImage[0]} alt="" className='h-full w-full' />
                                    </Link>
                                </div>
                                <div className='flex-1 h-full flex flex-col gap-1 px-1'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>₹{product?.sellingPrice}</p>
                                        <p className='text-slate-500 line-through'>₹{product?.price}</p>
                                    </div>
                                    <button className='text-sm mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg'
                                    onClick={()=>{addToCart(product._id)}}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HorizontalCards

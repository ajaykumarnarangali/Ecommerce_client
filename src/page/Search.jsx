import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAddToCart from '../helpers/addToCart'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import productCategory from '../helpers/ProductCategory';

function Search() {

    const [products, setProducts] = useState([]);
    const location = useLocation().search;
    const [sidebarData,setSidebarData]=useState({sort:undefined,category:undefined});
    const navigate=useNavigate();

    const addToCart = useAddToCart();

    useEffect(() => {
        const urlParams = new URLSearchParams(location);

        const getSearchProducts = async () => {
            try {
                const res = await fetch(`/api/product/all-products?${urlParams.toString()}`);
                const data = await res.json();

                if (data.success == false) {
                    console.log(data.message);
                    return
                }
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            }
        }

        getSearchProducts();

    }, [location]);

    const handleSearch=(e)=>{
        const urlParams=new URLSearchParams(location);
        if(sidebarData.sort){
            urlParams.set('sort',sidebarData.sort);
        }
        if(sidebarData.category){
            urlParams.set('category',sidebarData.category);
        }
        navigate(`/search?${urlParams}`)
    }

    return (
        <div className='container mx-auto px-4 my-6 relative min-h-screen flex justify-center w-100'>
            <div className='flex gap-5 flex-wrap justify-center md:justify-start'>
                <div className='h-60 w-96 bg-gray-200 flex flex-col items-center px-3'>
                    <div className="mt-3 flex gap-2 items-center">
                        <label>Sort:</label>
                        <select onChange={(e)=>{setSidebarData({...sidebarData,sort:e.target.value})}}>
                            <option value="asc">Low Price to High</option>
                            <option value="desc">High Price to Low</option>
                        </select>
                    </div>
                    <div className="mt-3 flex gap-2 items-center">
                        <label>Category:</label>
                        <select onChange={(e)=>{setSidebarData({...sidebarData,category:e.target.value})}}>
                            {
                                productCategory.map((category,index)=>(
                                    <option value={category.value} key={index}>{category.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Button className="w-full mt-2" gradientDuoTone={'purpleToBlue'} type="button" onClick={handleSearch}>Search</Button>
                </div>
                {
                    products.length > 0 &&
                    products.map((product) => (
                        <div key={product._id} className='w-full min-w-[280px] h-fit  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center '>
                                <Link to={`/product-Details/${product._id}`}>
                                    <img src={product.productImage[0]} className='object-scale-down w-32 h-full hover:scale-110 transition-all mix-blend-multiply' />
                                </Link>
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>₹{product?.sellingPrice}</p>
                                    <p className='text-slate-500 line-through'>₹{product?.price}</p>
                                </div>
                                <Button gradientDuoTone={'purpleToBlue'} outline onClick={() => { addToCart(product._id) }}>
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

export default Search

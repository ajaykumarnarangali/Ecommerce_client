import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CategoryList() {

    const [catProucts, setCatproducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetCateProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/product/get-each-category-product`);
                const data = await res.json();

                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                    return
                }
                setLoading(false);
                setCatproducts(data.products);

            } catch (error) {
                setLoading(false);
                console.log(error.message);
            }
        }
        fetCateProducts();
    }, []);

    if (loading) {
        return <div className='text-center p-5 font-semibold'>
            Loading...
        </div>
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center px-5 gap-4 justify-between overflow-scroll scrollbar-none'>     {
                catProucts.map((product) => {
                    return (
                        <Link to={"/product-category?category=" + product?.category} className='cursor-pointer' key={product?.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}

export default CategoryList

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { FileInput, TextInput, Select, Button, Textarea } from 'flowbite-react'
import ProductCategory from '../helpers/ProductCategory'
import { useNavigate } from 'react-router-dom'


function Editproduct() {

    const { id } = useParams();
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        const getProduct = async (id) => {
            try {
                const res = await fetch(`/api/product/all-products?id=${id}`);
                const data = await res.json();
                if (data.success === false) {
                    toast.error(data.message);
                    return
                }
                setForm(data?.products[0]);

            } catch (error) {
                toast.error(error.message);
            }
        }
        if (id) {
            getProduct(id);
        }
    }, [])


    const handleUpdation = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/product/edit-products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            const data = await res.json();
            console.log(data)
            if (data.success == false) {
                toast.error(data.message);
                return
            }

            toast.success("product Edited!!")
            navigate('/admin-panel/all-products')

        } catch (error) {
            toast.error(error.message);
        }
    }


    return (
        <>
            <h1 className='my-5 font-semibold text-lg text-center'>Edit product</h1>
            <div className='max-w-2xl mx-auto p-4 border border-teal-500 rounded'>
                <form className='flex flex-col gap-5' onSubmit={handleUpdation}>
                    <div className='flex flex-col gap-2'>
                        <label>Product name:</label>
                        <TextInput type='text' placeholder='Enter Product Name' value={form?.productName || ''} onChange={(e) => { setForm({ ...form, productName: e.target.value }) }} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Brand name:</label>
                        <TextInput type='text' placeholder='Enter Brand Name' value={form?.brandName || ''} onChange={(e) => { setForm({ ...form, brandName: e.target.value }) }} />
                    </div>
                    <div className='flex flex-col md:flex-row justify-between md:items-center items-end border-4 border-violet-500 p-3 border-dotted gap-4 '>
                        <FileInput type='file' accept='image/*' />
                        <Button type='button' outline gradientDuoTone={'purpleToBlue'}>Upload</Button>
                    </div>
                    {
                        form?.productImage?.length > 0 &&
                        <div className='flex gap-2'>
                            {form.productImage.map((image, index) => {
                                return <img src={image} className='w-14' key={index} />
                            })}
                        </div>
                    }
                    <div className='flex flex-col gap-2'>
                        <label>Category:</label>
                        <Select value={form?.category} onChange={(e) => { setForm({ ...form, category: e.target.value }) }}>
                            {
                                ProductCategory.map((category) => {
                                    return <option key={category.id} value={category.value || ''}>{category.label}</option>
                                })
                            }
                        </Select>
                    </div>
                    <div className='flex flex-col md:flex gap-2'>
                        <div className="flex-1 flex flex-col gap-2">
                            <label>Price:</label>
                            <TextInput type='number' value={form?.price || ''} placeholder='Enter price' onChange={(e) => { setForm({ ...form, price: e.target.value }) }} />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <label>Selling Price:</label>
                            <TextInput value={form?.sellingPrice || ''} type='number' placeholder='Enter selling price' onChange={(e) => { setForm({ ...form, sellingPrice: e.target.value }) }} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Description:</label>
                        <Textarea typeof='text' value={form?.description || ''} placeholder='Enter Product Description' rows={4} onChange={(e) => { setForm({ ...form, description: e.target.value }) }} />
                    </div>
                    <Button type='submit' gradientDuoTone={'pinkToOrange'} outline>Update product</Button>
                </form>
            </div>
        </>
    )
}

export default Editproduct

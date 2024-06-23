import React, { useState } from 'react'
import { FileInput, TextInput, Select, Button, Textarea } from 'flowbite-react'
import ProductCategory from '../helpers/ProductCategory'
import uploadImage from '../helpers/uploadImage'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Addproduct() {

  const [form, setForm] = useState({
    productName: '',
    brandName: '',
    category: 'Airpodes',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: ''
  })

  const [file, setFile] = useState();

  const navigate=useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    const uploadTocloudinary = await uploadImage(file);
    setForm({
      ...form, productImage: [...form.productImage, uploadTocloudinary.url]
    })
    toast.success("image uploaded!!");
  }

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {

      const res=await fetch('/api/product/add-product',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(form)
      })

      const data=await res.json();

      if(data.success==false){
        toast.error(data.message);
        return
      }

      toast.success("product added!!")
      navigate('/admin-panel/all-products')
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <h1 className='my-5 font-semibold text-lg text-center'>Add product</h1>
      <div className='max-w-2xl mx-auto p-4 border border-teal-500 rounded'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label>Product name:</label>
            <TextInput placeholder='Enter Product Name' onChange={(e) => { setForm({ ...form, productName: e.target.value }) }} />
          </div>
          <div className='flex flex-col gap-2'>
            <label>Brand name:</label>
            <TextInput placeholder='Enter Brand Name' onChange={(e) => { setForm({ ...form, brandName: e.target.value }) }} />
          </div>
          <div className='flex flex-col md:flex-row justify-between md:items-center items-end border-4 border-violet-500 p-3 border-dotted gap-4 '>
            <FileInput type='file' accept='image/*' onChange={(e) => { setFile(e.target.files[0]) }} />
            <Button type='button' outline gradientDuoTone={'purpleToBlue'} onClick={handleUpload}>Upload</Button>
          </div>
          {
            form?.productImage.length > 0 &&
            <div className='flex gap-2'>
              {form.productImage.map((image) => {
                return <img src={image} className='w-14' />
              })}
            </div>
          }
          <div className='flex flex-col gap-2'>
            <label>Category:</label>
            <Select onChange={(e) => { setForm({ ...form, category: e.target.value }) }}>
              {
                ProductCategory.map((category) => {
                  return <option key={category.id} value={category.value}>{category.label}</option>
                })
              }
            </Select>
          </div>
          <div className='flex flex-col md:flex gap-2'>
            <div className="flex-1 flex flex-col gap-2">
              <label>Price:</label>
              <TextInput type='number' placeholder='Enter price' onChange={(e) => { setForm({ ...form, price: e.target.value }) }} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label>Selling Price:</label>
              <TextInput type='number' placeholder='Enter selling price' onChange={(e) => { setForm({ ...form, sellingPrice: e.target.value }) }} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Description:</label>
            <Textarea placeholder='Enter Product Description' rows={4} onChange={(e) => { setForm({ ...form, description: e.target.value }) }} />
          </div>
          <Button type='submit' gradientDuoTone={'pinkToOrange'} outline>Add product</Button>
        </form>
      </div>
    </>
  )
}

export default Addproduct

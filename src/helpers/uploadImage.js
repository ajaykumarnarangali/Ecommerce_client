const url = "https://api.cloudinary.com/v1_1/dhcc5cqej/image/upload"

const uploadImage = async (image) => {
    try {
        const formData = new FormData()
        formData.append('file', image);
        formData.append('upload_preset', 'mern_ecommerce');
        const res = await fetch(url, {
            method: 'POST',
            body: formData
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export default uploadImage
async function ImageTobase(Image) {

    const fileReader = new FileReader();
    fileReader.readAsDataURL(Image);

    const data=new Promise((resolve,reject)=>{
        fileReader.onload=(e)=>{
            resolve(e.target.result)
        }

        fileReader.onerror=(error)=>{
            reject(error)
        }
    })

    // by using callbacks.pass an callback arguments
    // fileReader.onload = (e) => {
    //     callback(e.target.result)
    // }

    return data
}

export default ImageTobase

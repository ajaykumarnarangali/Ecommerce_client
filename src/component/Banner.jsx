import { useState, useEffect } from 'react'

import image1 from '../assets/img1.webp'
import image2 from '../assets/img2.webp'
import image3 from '../assets/img3.jpg'
import image4 from '../assets/img4.jpg'
import image5 from '../assets/img5.webp'


import image1Mobile from '../assets/img1_mobile.jpg'
import image2Mobile from '../assets/img2_mobile.webp'
import image3Mobile from '../assets/img3_mobile.jpg'
import image4Mobile from '../assets/img4_mobile.jpg'
import image5Mobile from '../assets/img5_mobile.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

function Banner() {

    const [currentPosition, setCurrentPosition] = useState(0);

    const nextImage = () => {
        if (desktopImg.length - 1 > currentPosition) {
            setCurrentPosition(preve => preve + 1)
        }
    }

    const preveImage = () => {
        if (currentPosition != 0) {
            setCurrentPosition(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImg.length - 1 > currentPosition) {
                nextImage();
            } else{
                setCurrentPosition(0);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentPosition]);

    const desktopImg = [image1, image2, image3, image4, image5];
    const mobileImg = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

    return (
        <div className='mx-auto px-10 rounded'>
            <div className='h-72 w-full bg-slate-200 relative overflow-hidden'>
                <div className='absolute z-10 h-full w-full flex items-center '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>
                <div className='flex h-full w-full'>
                    {
                        desktopImg.map((ImageUrl, index) => (
                            <div className='w-full h-full min-w-full min-h-full' key={index}>
                                <img src={ImageUrl} alt="bannerImage" className='w-full h-full' style={{ 'transform': `translateX(-${currentPosition * 100}%)` }} />
                            </div>
                        ))
                    }
                </div>
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImg.map((imageURl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentPosition * 100}%)` }}>
                                    <img src={imageURl} className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Banner

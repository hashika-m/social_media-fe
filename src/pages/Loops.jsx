import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import LoopCard from '../components/LoopCard';
import { useSelector } from 'react-redux';

const Loops = () => {
    const navigate = useNavigate()
    const { loopData } = useSelector(state => state.loop)

    console.log("Loop Data:", loopData)
    return (
        <div className='w-screen h-screen bg-gray-100 overflow-y-scroll flex justify-center'>
            {/* back btn */}
            <div className="w-full h-16 flex gap-5 items-center px-6 top-2.5 left-2.5 fixed z-100">
                <IoMdArrowRoundBack
                    className="w-6 h-6 cursor-pointer hover:text-red-700"
                    onClick={() => navigate(`/home`)}
                />
                <h1 className='font-semibold text-2xl'>Loops</h1>

            </div>
             {/* loop card like reels effect*/}
            <div className='h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide'>
                {loopData?.map((loop, index) => (
                    <div key={index} className='snap-start h-screen'>
                        <LoopCard  loop={loop} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Loops
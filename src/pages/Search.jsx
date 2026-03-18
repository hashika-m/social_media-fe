import React, { useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import profile from '../assets/profile.jpeg';

const Search = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const { searchData } = useSelector(state => state.user); // assuming searchData is stored here

    // fetch search results
    const handleSearch = async () => {
        if (!input) return;
        try {
            const result = await api.get(`/user/search?keyWord=${input}`);
            dispatch(setSearchData(result.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!input) {
                dispatch(setSearchData([])); // clear results if input is empty
            } else {
                handleSearch();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className='w-full min-h-screen bg-gray-200 flex flex-col items-center gap-5 pt-20'>
            {/* header */}
            <div className="w-full h-16 flex items-center gap-5 px-6 fixed top-0 border-b shadow-xl z-10">
                <IoMdArrowRoundBack
                    className="w-6 h-6 cursor-pointer hover:text-red-700"
                    onClick={() => navigate(`/home`)}
                />
                <h1 className='font-semibold text-2xl'>Search</h1>
            </div>

            {/* search input */}
            <div className='w-full flex justify-center mt-4'>
                <div className='w-[90%] max-w-2xl h-12 rounded-full bg-white/80 flex items-center px-4 shadow-md'>
                    <GoSearch className='w-5 h-5 text-gray-500' />
                    <input
                        value={input}
                        type='text'
                        placeholder='Search...'
                        className='w-full h-full outline-none rounded-full px-3 text-gray-700'
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
            </div>

            {/* search results */}
            <div className='w-full flex flex-col gap-3 px-5 mt-4'>
                {Array.isArray(searchData) && searchData.length > 0 ? (
                    searchData.map(user => (
                        <div
                            key={user._id}
                            className='flex items-center gap-4 p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100'
                            onClick={() => navigate(`/profile/${user._id}`)}
                        >
                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                <img
                                    src={user.profilePic || profile}
                                    alt='profile'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-semibold'>{user.name}</span>
                                <span className='text-gray-500 text-sm'>{user.email}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    input && <div className='text-gray-500 text-center mt-4'>No users found</div>
                )}

                {!input && <div className='text-gray-500 text-center mt-4'>
                    Search here to connect.......
                </div>}
            </div>

        </div>
    )
}

export default Search;
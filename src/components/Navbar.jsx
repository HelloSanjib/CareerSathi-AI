import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin, BsMoon, BsSun } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl, ThemeContext } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-[#f3f3f3] dark:bg-gray-950 transition-colors duration-300 flex justify-center px-4 pt-6'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='w-full max-w-6xl bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center relative transition-colors duration-300'>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='bg-black dark:bg-emerald-600 text-white p-2 rounded-lg transition-colors'>
                        <BsRobot size={18} />

                    </div>
                    <h1 className='font-semibold hidden md:block text-lg dark:text-white'>CareerSathi AI</h1>
                </div>

                <div className='flex items-center gap-6  relative'>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? <BsMoon size={18} /> : <BsSun size={18} />}
                    </button>

                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true)
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false)
                        }} className='flex items-center gap-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-md hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer'>
                            <BsCoin size={20} />
                            {userData?.credits || 0}
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                                <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                                <button onClick={() => navigate("/pricing")} className='w-full bg-black text-white py-2 rounded-lg text-sm'>Buy more credits</button>

                            </div>
                        )}
                    </div>

                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }} className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold'>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}

                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                                <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>

                                <button onClick={() => navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>InterView History</button>
                                <button onClick={handleLogout}
                                    className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                                    <HiOutlineLogout size={16} />
                                    Logout</button>
                            </div>
                        )}
                    </div>

                </div>



            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        </div>
    )
}

export default Navbar

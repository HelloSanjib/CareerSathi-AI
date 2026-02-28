import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const result = await axios.post(
                    ServerUrl + "/api/auth/google",
                    { access_token: tokenResponse.access_token },
                    { withCredentials: true }
                );
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log("Authentication failed:", error);
                dispatch(setUserData(null));
            }
        },
        onError: error => console.log('Login Failed:', error)
    });

    return (
        <div className={`
      w-full transition-colors duration-300
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] dark:bg-gray-950 flex items-center justify-center px-6 py-20"}
    `}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className={`
        w-full transition-colors duration-300
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800
      `}>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='bg-black dark:bg-emerald-600 text-white p-2 rounded-lg transition-colors'>
                        <BsRobot size={18} />

                    </div>
                    <h2 className='font-semibold text-lg dark:text-white'>CareerSathi AI</h2>
                </div>

                <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 dark:text-gray-100'>
                    Continue with
                    <span className='bg-green-100 dark:bg-emerald-900/50 text-green-600 dark:text-emerald-400 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                        <IoSparkles size={16} />
                        AI Smart Interview

                    </span>
                </h1>

                <p className='text-gray-500 dark:text-gray-400 text-center text-sm md:text-base leading-relaxed mb-8'>
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>


                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ opacity: 0.9, scale: 1.03 }}
                    whileTap={{ opacity: 1, scale: 0.98 }}
                    className='w-full flex items-center justify-center gap-3 py-3 bg-black dark:bg-gray-800 text-white dark:hover:bg-gray-700 transition-colors rounded-full shadow-md '>
                    <FcGoogle size={20} />
                    Continue with Google


                </motion.button>
            </motion.div>


        </div>
    )
}

export default Auth

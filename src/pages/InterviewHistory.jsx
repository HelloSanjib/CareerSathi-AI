import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])


    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 dark:from-gray-950 dark:to-emerald-950/20 py-10 transition-colors duration-300' >
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800 shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600 dark:text-gray-300' /></button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-gray-800 dark:text-white transition-colors'>
                            Interview History
                        </h1>
                        <p className='text-gray-500 dark:text-gray-400 mt-2 transition-colors'>
                            Track your past interviews and performance reports
                        </p>

                    </div>
                </div>


                {interviews.length === 0 ?
                    <div className='bg-white dark:bg-gray-900 p-10 rounded-2xl shadow border border-gray-100 dark:border-gray-800 text-center transition-colors'>
                        <p className='text-gray-500 dark:text-gray-400'>
                            No interviews found. Start your first interview.
                        </p>

                    </div>

                    :

                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-emerald-900/20 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-800'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors">
                                            {item.role}
                                        </h3>

                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 transition-colors">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 transition-colors">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-500 transition-colors">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-medium transition-colors ${item.status === "completed"
                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                }
            </div>

        </div>
    )
}

export default InterviewHistory

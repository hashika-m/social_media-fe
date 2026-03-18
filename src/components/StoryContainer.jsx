import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import api from '../api/api'

const StoryContainer = ({ story }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()
    const videoRef = useRef(null)

    // Ensure currentStory is always defined
    const currentStory = story?.[currentIndex] || null

    // Auto-advance for images only
    useEffect(() => {
        if (!currentStory) return

        let timer
        if (currentStory.mediaType === 'image') {
            timer = setTimeout(() => {
                if (currentIndex + 1 < story.length) {
                    setCurrentIndex(currentIndex + 1)
                } else {
                    navigate(-1) // close story after last
                }
            }, 5000)
        }

        return () => clearTimeout(timer)
    }, [currentIndex, currentStory, story, navigate])

    if (!currentStory) return null

    const nextStory = () => {
        if (currentIndex + 1 < story.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            navigate(-1)
        }
    }

    // Inside your StoryContainer
    (() => {
        if (!currentStory) return
        // Mark as viewed
        const markAsViewed = async () => {
            try {
                await api.get(`/story/view/${currentStory._id}`, { withCredentials: true })
            } catch (err) {
                console.log(err)
            }
        }
        markAsViewed()
    }, [currentStory])

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50">

            {/* Author Info +  back btn  */}
            <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                <IoMdArrowRoundBack
                    className="w-6 h-6 cursor-pointer hover:text-red-700 text-white"
                    onClick={() => navigate(`/home`)}
                />
                <img
                    src={currentStory.author?.profilePic}
                    alt={currentStory.author?.name}
                    className="w-12 h-12 rounded-full border-2 border-white"
                />
                <span className="text-white font-semibold">{currentStory.author?.name}</span>
            </div>

            {/* Story Media */}
            {currentStory.mediaType === 'image' ? (
                <img
                    src={currentStory.media}
                    alt="story"
                    className="h-[80%] max-w-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={currentStory.media}
                    controls // native play/pause, mute, seek, fullscreen
                    autoPlay
                    // muted
                    playsInline
                    className="h-[80%] max-w-full object-contain"
                    onClick={(e) => e.stopPropagation()} // allow video controls interaction
                    onEnded={nextStory} // auto next when video ends
                />
            )}

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 flex w-full gap-1 p-2 z-10">
                {story.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${i < currentIndex
                            ? 'bg-white'
                            : i === currentIndex
                                ? 'bg-white/70'
                                : 'bg-gray-500/50'
                            }`}
                    />
                ))}
            </div>

            {/* Click to next story — only outside the media */}
            <div
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                onClick={(e) => {
                    // only go next if the click is NOT on video or image
                    if (e.target === e.currentTarget) {
                        nextStory()
                    }
                }}
            />

            {/* Viewers List */}
            <div className="absolute bottom-5 left-5 flex flex-col gap-2 bg-black bg-opacity-50 p-2 rounded">
                <span className="text-white font-semibold">
                    Viewers ({currentStory.viewers?.length || 0})
                </span>
                <div className="flex gap-2 overflow-x-auto">
                    {currentStory.viewers?.map((viewer, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={viewer.profilePic || '/profile.jpeg'}
                                alt={viewer.name}
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                            <span className="text-white text-xs">{viewer.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StoryContainer
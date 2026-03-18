import React, { useRef, useState, useEffect } from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";

const VideoPlayer = ({ media }) => {
    const videoRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        const video = videoRef.current;

        if (video.paused) {
            video.play();
            setPlaying(true);
        } else {
            video.pause();
            setPlaying(false);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        video.muted = !video.muted;
        setMuted(video.muted);
    };

    const updateProgress = () => {
        const video = videoRef.current;
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
    };

    const handleSeek = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        const rect = e.target.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    };

    useEffect(() => {
        const video = videoRef.current;
        video.loop = true;
    }, []);

    return (
        <div
            className="relative w-full max-h-125 h-72 bg-black rounded-2xl overflow-hidden cursor-pointer"
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={media}
                muted={muted}
                className="w-full h-100 object-cover rounded-2xl"
                onTimeUpdate={updateProgress}
            />
            

            {/* Play button */}
            {!playing && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-8xl hover:bg-amber-300">
                    <CiPlay1 className= "bg-black/60 text-white rounded-full px-3 text-center "/>
                </div>
            )}

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="absolute bottom-10 right-4 bg-black/60 text-white text-2xl px-3 py-1 rounded-lg"
            >
                {muted ? <IoVolumeMuteOutline />:  <GoUnmute />}
            </button>

            {/* Progress bar */}
            <div
                className="absolute bottom-0 left-0 w-full h-1 bg-gray-600 cursor-pointer"
                onClick={handleSeek}
            >
                <div
                    className="h-1 bg-red-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
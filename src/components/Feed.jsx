import React from 'react'
import logo from '../assets/icon.png'
import { CiHeart } from "react-icons/ci";
import StoryCard from './StoryCard';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
// import usegetAllPost from '../hooks/usegetAllPost';
import Post from '../components/Post';
import { LuMessageSquareMore } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const { postData } = useSelector(state => state.post)
  const { storyList = [] } = useSelector(state => state.story)
  const { userData , notificationData } = useSelector(state => state.user)

  const navigate = useNavigate()
  const myStories = storyList.filter(
    s => s.author._id === userData?._id
  )

  // Group stories by author
  const friendsStoriesByAuthor = []

  const seenAuthors = new Set()

  storyList.forEach(story => {
    if (story.author._id !== userData?._id && !seenAuthors.has(story.author._id)) {
      friendsStoriesByAuthor.push(story)
      seenAuthors.add(story.author._id)
    }
  })

  // usegetAllPost()
  return (
    <div className='lg:w-[50%] w-full bg-white min-h-screen lg:h-screen relative lg:overflow-y-auto'>
      {/* Top Section */}
      <div className="flex items-center justify-between  lg:hidden">
        <div className='flex  items-center justify-start gap-1.5 px-5 py-2.5 font-semibold text-black text-2xl'>
          <img src={logo} alt="logo" className="w-10" />
          <span>Socila Media Platform</span>
        </div>

        <div className="relative flex items-center gap-5 cursor-pointer pr-5">
          {/* notification part */}
          <div onClick={()=>navigate('/notifications')} className="relative cursor-pointer">
            <CiHeart className="w-6 h-6 text-gray-700 hover:text-red-500 transition duration-200" />

            {(notificationData?.length > 0 &&
              notificationData.some((n) => n.isRead === false)) && (
                <div className="w-3 h-3 bg-red-600 rounded-full absolute -top-1 -right-1"></div>
              )}
          </div>
          {/* <CiHeart className="w-6 h-6 text-gray-700 hover:text-red-500 transition duration-200" /> */}
          {/* <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span> */}
          <LuMessageSquareMore onClick={() => navigate('/messages')}
            className="w-6 h-6 text-gray-700 hover:text-red-500 transition duration-200" />
        </div>


      </div>

      {/* story card */}
      {/* my story */}
      {/* <StoryCard userName={'Your story '} profilePic={userData.profilePic} story={userData.story} /> */}
      <div className="flex w-full overflow-auto gap-3 p-3">
        {/* Your story */}
        <StoryCard
          userName="Your story"
          profilePic={userData?.profilePic}
          hasStory={myStories.length > 0}
          email={userData?.email}
          isOwn={true}
        />

        {/* Friends stories */}
        {friendsStoriesByAuthor.map((story, index) => (
          <StoryCard
            key={index}
            userName={story.author.name}
            profilePic={story.author.profilePic}
            hasStory={true}
            email={story.author.email}
            isOwn={false}
          />
        ))}
      </div>


      {/* Posts Section */}
      <div className="w-full flex flex-col items-center gap-5 p-4 pt-8 bg-gray-100 rounded-t-[40px] pb-10 ">
        {/* Your Post Components Go Here */}
        <Navbar />
        {postData?.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>


    </div>
  )
}

export default Feed


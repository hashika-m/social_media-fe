// // import React, { useEffect } from 'react'
// // import { useParams } from 'react-router-dom'
// // import api from '../api/api'
// // import { useDispatch, useSelector } from 'react-redux'
// // import { SetStoryData } from '../redux/storySlice'
// // import StoryContainer from '../components/StoryContainer'

// // const Story = () => {
// //     const { userEmail } = useParams()
// //     const dispatch = useDispatch()
// //     const {storyData}=useSelector(state=>state.story)
// //     const handleStory = async () => {
// //         try {
// //             const result = await api.get(`/story/getByUserEmail/:${userEmail}`, { withCredentials: true })
// //             dispatch(SetStoryData(result.data))
// //         } catch (error) {
// //             console.log(error)
// //         }
// //     }
// //     useEffect(() => {
// //         if (userEmail) {
// //             handleStory()
// //         }

// //     }, [userEmail])
// //     return (
// //         <div>
// //             <StoryContainer story={storyData}/>
// //         </div>
// //     )
// // }

// // export default Story


// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import api from '../api/api'
// import { useDispatch, useSelector } from 'react-redux'
// import { setStoryData } from '../redux/storySlice'
// import StoryContainer from '../components/StoryContainer'

// const Story = () => {
//     const { email } = useParams()  // use email param
    
//     const dispatch = useDispatch()
//     const { storyData } = useSelector(state => state.story)

//     const fetchStory = async () => {
//         try {
//             const res = await api.get(`/story/getByUserEmail/${email}`, { withCredentials: true })
//             dispatch(setStoryData(res.data))
//             console.log("Stories:", res.data) 
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         if (email) {
//             fetchStory()
//         }
//     }, [email])

//     return <StoryContainer story={storyData} />
// }

// export default Story

// Story.jsx
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'
import StoryContainer from '../components/StoryContainer'

const Story = () => {
  const { email } = useParams()
  const dispatch = useDispatch()
  const { storyData } = useSelector(state => state.story)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get(`/story/getByUserEmail/${email}`, { withCredentials: true })
        dispatch(setStoryData(res.data)) // set array of stories for that user
      } catch (err) {
        console.log(err)
      }
    }

    if (email) fetchStories()
  }, [email, dispatch])

  return <StoryContainer story={storyData} />
}

export default Story
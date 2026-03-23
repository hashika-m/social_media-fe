import { createSlice } from '@reduxjs/toolkit'



const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        suggestedUsers: [],
        authLoading: true,
        profileData:null,
        following:[],
        friends: [],
        searchData:null,
        notificationData:[]
        
       
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            state.following = action.payload.following || []
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload
        },
        setAuthLoading: (state, action) => {
            state.authLoading = action.payload
        },
        setProfileData:(state,action)=>{
            state.profileData=action.payload
        },
        setFollowing:(state,action)=>{
            state.following=action.payload
        },
        setFriends:(state,action)=>{
            state.friends=action.payload
        },
        // toggleFollow:(state,action)=>{
        //     const targetUserId=action.payload
        //     if(state.following.includes(targetUserId)){
        //         state.following=state.following.filter(id=>id!=targetUserId)
        //     }else{
        //         state.following.push(targetUserId)
        //     }
            

        // },
        setSearchData:(state,action)=>{
            state.searchData=action.payload
        },
        setNotificationData:(state,action)=>{
            state.notificationData=action.payload
        },
        
        
    }
})

export const { 
    setUserData,
    setSuggestedUsers,
    setAuthLoading,
    setProfileData,
    // toggleFollow,
    setFollowing,
    setFriends,
    setSearchData,
    setNotificationData
} = userSlice.actions

export default userSlice.reducer
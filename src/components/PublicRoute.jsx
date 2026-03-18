// import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const PublicRoute = ({ children }) => {
//   const { userData } = useSelector((state) => state.user)
  
//   if (userData) {
//     return <Navigate to="/home" replace />
//   }
  
//   return children
// }

// export default PublicRoute

// --------------------auth checking------------------------- 
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ children }) => {
  const { userData, authLoading } = useSelector((state) => state.user)

  if (authLoading) {
    return <div>Loading...</div>
  }

  if (userData) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default PublicRoute

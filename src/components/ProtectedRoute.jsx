
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { userData, authLoading } = useSelector((state) => state.user)

  if (authLoading) {
    return <div>Loading...</div>
  }

  if (!userData) {
    return <Navigate to="/signin" replace />
  }

  return children
}

export default ProtectedRoute


// import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const ProtectedRoute = ({ children }) => {
//   const { userData } = useSelector((state) => state.user)
  
//   if (!userData) {
//     return <Navigate to="/signin" replace />
//   }
  
//   return children
// }

// export default ProtectedRoute

// auth checking

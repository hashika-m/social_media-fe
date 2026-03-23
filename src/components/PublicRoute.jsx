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
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (userData) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default PublicRoute

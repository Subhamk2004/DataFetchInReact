import React from 'react'
import UserListPage from './Components/UserListPage'
import { UserContextProvider } from './Context/UserContext'
import Header from './Components/Header'
import Loader from './Components/Loader'

function App() {
  return (
    <UserContextProvider>
      <Header />
      <UserListPage />
      <Loader />
    </UserContextProvider>
  )
}

export default App
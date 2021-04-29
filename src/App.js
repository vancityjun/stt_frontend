import {useState, useEffect} from 'react'
import './App.scss'
import Dropbox from './component/Dropbox'
import Login from './component/Login'

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    fetch('http://localhost:4000/current-user', {
      method: 'GET',
      headers: {
        authorization: getToken()
      },
    })
      .then(res => res.json())
      .then((result) => {
        setCurrentUser(result.user)
      })
  },[])

  const getToken = () => (
    document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''
  )

  const logout = () => {
    document.cookie = 'token='
    setCurrentUser({})
  }

  return (
    <div className="App">
      <div className='container mx-auto px-6 mt-6'>
        <h1 className='text-lg font-medium leading-6'>Speech To Text</h1>
        {currentUser && <button onClick={()=> logout()}>logout</button>}
        <Dropbox getToken={()=> getToken} />
      </div>
      {!currentUser && <Login setCurrentUser={() => setCurrentUser} />}
    </div>
  )
}

export default App;

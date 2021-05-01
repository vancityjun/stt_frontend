import {useState, useEffect} from 'react'
import './App.scss'
import Dropbox from './component/Dropbox'
import Login from './component/Login'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)
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
    setCurrentUser(null)
  }

  useEffect(()=>{
    console.log(currentUser)
  },[currentUser])
  const method = (value) => {
    debugger
  }

  return (
    <div className="App bg-gray-50 flex">
      <div className='container mx-auto px-6 mt-6'>
        {currentUser ? <Dropbox getToken={()=> getToken()} logout={()=>logout()} /> : <Login method={(value)=>method(value)} setCurrentUser={(value) => setCurrentUser(value)} />}
      </div>
    </div>
  )
}

export default App;

import React, {useState, useReducer} from 'react'
import Field from './Field'

const reducer = (state, { target }) => {
  return { ...state, ...target };
}

function Login({setCurrentUser}) {
  const [register, setRegister] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [state, dispatch] = useReducer(reducer, {})

  const submit = () => {
    // if(resetPassword) {
    //   fetch(`http://localhost:4000/password-reset`, {
    //     method: 'POST',
    //     body: JSON.stringify({userParams: state})
    //   })
    //     .then(res => res.json())
    //     .then((result) => {
    //       console.log(result)
    //     })
    // }

    fetch(`http://localhost:4000/${register ?'register' : 'login'}`, {
      method: 'POST',
      body: JSON.stringify({userParams: state})
    })
      .then(res => res.json())
      .then((result) => {
        document.cookie = `token=${result.token}`
        setCurrentUser(result.user)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <button onClick={()=> setRegister(!register)} className="font-medium text-indigo-600 hover:text-indigo-500">
              {register ? 'sign in' : 'register'}
            </button>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Field onChange={(value) => dispatch({ target: { email: value } })} title='email' type="email" placeholder="Email address" />
            <Field onChange={(value) => dispatch({ target: { password: value } })} title='password' type="password" placeholder="Password" />
            {(resetPassword || register) && <Field onChange={(value) => dispatch({ target: { passwordConfirm: value } })} title='password confirm' type="password" placeholder="Password confirm" />}
            {register && [
              <Field onChange={(value) => dispatch({ target: { firstName: value } })} title='first name' type="text" placeholder="First name" />,
              <Field onChange={(value) => dispatch({ target: { lastName: value } })} title='last name' type="text" placeholder="Last name" />,
            ]
            }
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button onClick={()=> setResetPassword(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </button>
            </div>
          </div>
          <div>
            <button onClick={() => submit() } type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {register ? 'Register' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
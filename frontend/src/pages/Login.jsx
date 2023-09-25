import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
const Login = () => {

  const location = useLocation()
  const [auth, setAuth] = useAuth()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await axios.post('http://54.172.59.173:8080/api/v1/auth/login', { email, password })
      if(res.data){
        
        toast.success(res.data.message)
        setAuth({
          ...auth,
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        setLoading(false)
        navigate(location.state || '/hotel')
      }
      
    } catch (error) {
      
      setLoading(false)
      setShowError(true)
      setError(error.response.data.message)
      
      
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  },[])
  
  return (
    <>
     
    <Header />
    {
      loading ? 
      (<>
        <div className='w-[80%] mx-auto flex h-full flex-col justify-center items-center'>
          <h1 className='text-xl text-black font-semibold'>Loading, Please Do not refresh or leave this page...</h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>) 
      : 
      (<>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    required
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    onChange={(e) => { setPassword(e.target.value) }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                {
                  showError && 
                  (<>
                    <div className='mt-2 mb-2'>
                      <h1 className='text-md text-red-800 font-bold'>{error}</h1>
                    </div>
                  </>)
                }
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
               
              </div>
              
            </form>
            <div className='mt-2 w-inherit'>
              <span className='text-md text-stone-500 font-normal text-center'>New to Travel Buddy? </span>
              <span className='text-md text-indigo-600 font-semibold hover:underline cursor-pointer' onClick={() => { navigate('/register') }} >Register</span>
            </div>
          </div>
        </div>
      </>)
      }
    </>
      
    
  )
}

export default Login

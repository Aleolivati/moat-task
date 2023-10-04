import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import Button from '~/components/Button'
import BgContainer from '~/components/BgContainer'
import { useNavigate } from 'react-router-dom'

type PropsAccess = '' | 'login' | 'register'
type PropsRole = 'user' | 'admin'

const Home = () => {
  const [typeAccess, setTypeAccess] = useState<PropsAccess>('')

  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<PropsRole>('user')
  const [fullnameError, setFullnameError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const apiLogin = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (
      localStorage.getItem('userRole') !== null &&
      localStorage.getItem('createAdminAccount') === null
    ) {
      alert('You are already login! If you want change user, please logout first!')
      navigate('/artists')
    }
    if (localStorage.getItem('createAdminAccount') === 'admin') {
      setTypeAccess('register')
    }
  }, [navigate])

  const goToHome = () => {
    setTypeAccess('')
    setFullnameError(false)
    setUsernameError(false)
    setPasswordError(false)
    setFullname('')
    setPassword('')
    setUsername('')
  }

  const validateInputs = (user: string, full: string, pass: string) => {
    const errors = []
    setUsernameError(false)
    setFullnameError(false)
    setPasswordError(false)

    if (!user) {
      errors.push('USERNAME')
      setUsernameError(true)
    }
    if (!full) {
      errors.push('FULLNAME')
      setFullnameError(true)
    }
    if (!pass) {
      errors.push('PASSWORD')
      setPasswordError(true)
    }

    if (errors.length === 1) {
      alert(`Oops! Please fill in the field ${errors} before continuing...`)
      return false
    }
    if (errors.length > 1) {
      alert(`Oops! Please fill in the following fields: ${errors.join(', ')} before continuing...`)
      return false
    }

    return true
  }

  const nativationResolution = () => {
    goToHome()
    if (localStorage.getItem('createAdminAccount') === 'admin') {
      navigate('/artists')
    }
  }

  // **************************** METHODS ****************************

  const loginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const user = { username: username, password: password }
      const response = await apiLogin.post('/sessions/login', user)
      if (response.status === 200) {
        localStorage.setItem('userRole', response.data.userRole)
        localStorage.setItem('userUsername', response.data.username)
        localStorage.setItem('userToken', response.data.token)
        navigate('/artists')
      }
      if (response.status === 404) {
        alert(`User not found! Please check you're using the right username or create an account.`)
        setUsernameError(true)
      }
      if (response.data === 400) {
        alert('Incorrect password! Please try again.')
        setPasswordError(true)
      }
    } catch (error) {
      console.log(error)
      alert(
        `Sorry, we couldn't find an account with this username. Please check you're using the right username and try again.`,
      )
      setUsernameError(true)
      setPasswordError(true)
    }
  }

  const registerSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isVatidated = validateInputs(username, fullname, password)

    if (isVatidated) {
      try {
        const user = {
          fullname: fullname,
          username: username,
          userPassword: password,
          userRole: role,
        }
        const response = await apiLogin.post('/users', user)

        if (response.status === 200) {
          alert('Yehh! User created successfully!')
          nativationResolution()
        }
        if (response.status === 400) {
          alert('This user already exist! Please try again')
          nativationResolution()
        }
      } catch (error) {
        console.log(error)
        alert('This user already exists! Please log in as this user or create a new user')
        nativationResolution()
      }
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <BgContainer>
        <>
          {/* **************************** Home page **************************** */}

          {typeAccess === '' && (
            <>
              <h2 className='display-4'>Welcome to the </h2>
              <h1 className='display-1'>
                <strong>Musify</strong>!
              </h1>
              <p className='fst-italic '>
                The app for the best and most collaborative music collection!
              </p>
              <Button roleOf='button' title='Login' onClick={() => setTypeAccess('login')} />
              <Button roleOf='button' title='Sign In' onClick={() => setTypeAccess('register')} />
            </>
          )}

          {/* **************************** Login Page **************************** */}

          {typeAccess === 'login' && (
            <form className='ps-md-5 pe-md-5' onSubmit={loginSubmit}>
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input
                className={`form-control text-center mb-2 mw-100 ${
                  usernameError ? 'border border-danger border-4' : ''
                }`}
                type='text'
                id='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <label className='form-label ' htmlFor='password'>
                Password
              </label>
              <input
                className={`form-control text-center mw-100 mb-3 ${
                  passwordError ? 'border border-danger border-4' : ''
                }`}
                type='password'
                id='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button roleOf='button' type='submit' title='Login' />
              <Button roleOf='button' title='Back' onClick={goToHome} />
            </form>
          )}

          {/* **************************** Register Page (Sign in) **************************** */}

          {typeAccess === 'register' && (
            <form className='ps-md-5 pe-md-5' onSubmit={registerSubmit}>
              <label className='form-label' htmlFor='fullname'>
                Fullname
              </label>
              <input
                className={`form-control text-center mw-100 mb-2 ${
                  fullnameError ? 'border border-danger border-4' : ''
                }`}
                type='text'
                id='fullname'
                onChange={({ target }) => setFullname(target.value)}
              />
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input
                className={`form-control text-center mw-100 mb-2 ${
                  usernameError ? 'border border-danger border-4' : ''
                }`}
                type='text'
                id='username'
                onChange={({ target }) => setUsername(target.value)}
              />
              <label className='form-label ' htmlFor='password'>
                Password
              </label>
              <input
                className={`form-control text-center mw-100 mb-3 ${
                  passwordError ? 'border border-danger border-4' : ''
                }`}
                type='password'
                id='password'
                onChange={({ target }) => setPassword(target.value)}
              />
              {localStorage.getItem('createAdminAccount') === 'admin' && (
                <>
                  <div className='form-check d-flex justify-content-center'>
                    <input
                      name='role'
                      className='form-check-input bg-purple col-5'
                      type='radio'
                      id='userRole'
                      value='option1'
                      onChange={() => setRole('user')}
                      checked
                    />
                    <label className='form-check-label col-7' htmlFor='userRole'>
                      User
                    </label>
                  </div>
                  <div className='form-check d-flex justify-content-center mb-3'>
                    <input
                      name='role'
                      className='form-check-input bg-purple col-5'
                      type='radio'
                      id='adminRole'
                      value='option2'
                      onChange={() => setRole('admin')}
                    />
                    <label className='form-check-label col-7' htmlFor='adminRole'>
                      Admin
                    </label>
                  </div>
                </>
              )}
              <Button
                roleOf='button'
                type='submit'
                title={`${
                  localStorage.getItem('createAdminAccount') === 'admin'
                    ? 'Create account'
                    : 'Sign In'
                }`}
              />
              <Button roleOf='button' title='Back' onClick={nativationResolution} />
            </form>
          )}
        </>
      </BgContainer>
    </div>
  )
}

export default Home

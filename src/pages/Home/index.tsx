import { FormEvent, useState } from 'react'
import axios from 'axios'

import Button from '~/components/Button'
import BgContainer from '~/components/BgContainer'
import { useNavigate } from 'react-router-dom'

type PropsAccess = '' | 'login' | 'register'
type PropsRole = 'user' | 'admin'

const Home = () => {
  const [typeAccess, setTypeAccess] = useState<PropsAccess>('')

  const [error, setError] = useState(false)
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<PropsRole>('user')

  const navigate = useNavigate()

  const loginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const user = { username, password }
      const response = await axios.post('http://localhost:3001/login', user)
      if (response.status === 200) {
        localStorage.setItem('userRole', response.data.role)
        localStorage.setItem('userUsername', response.data.username)
        navigate('/artists')
      }
    } catch (error) {
      console.log(error)
      alert(
        `Sorry, we couldn't find an account with this username. Please check you're using the right username and try again.`,
      )
      setError(true)
    }
  }

  const goToHome = () => {
    setTypeAccess('')
    setError(false)
    setFullname('')
    setPassword('')
    setUsername('')
  }

  const registerSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!username || !fullname || !fullname) {
      alert('Oops! Please try to fill all the fields before continue...')
      setError(true)
    } else {
      try {
        const user = { fullname: fullname, username: username, password: password, role: role }
        const response = await axios.post('http://localhost:3001/login', user)

        if (response.status === 201) {
          alert('Yehh! User created successfully! Now login with the new account')
          setTypeAccess('')
          setError(false)
        }
      } catch (error) {
        console.log(error)
        alert('This user already exists! Please log in as this user or create a new user')
        goToHome()
      }
    }
  }

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <BgContainer>
        <>
          {typeAccess === '' && (
            <>
              <h2 className='display-4'>Welcome to the </h2>
              <h1 className='display-1'>
                <strong>Musify</strong>!
              </h1>
              <p className='fst-italic '>
                The app for the finest and collaborative music collection!
              </p>
              <Button roleOf='button' title='Login' onClick={() => setTypeAccess('login')} />
              <Button roleOf='button' title='Sign In' onClick={() => setTypeAccess('register')} />
            </>
          )}
          {typeAccess === 'login' && (
            <form className='ps-md-5 pe-md-5' onSubmit={loginSubmit}>
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input
                className={`form-control text-center mb-2 mw-100 ${
                  error ? 'border border-danger border-4' : ''
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
                  error ? 'border border-danger border-4' : ''
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
          {typeAccess === 'register' && (
            <form className='ps-md-5 pe-md-5' onSubmit={registerSubmit}>
              <label className='form-label' htmlFor='fullname'>
                Fullname
              </label>
              <input
                className={`form-control text-center mw-100 mb-2 ${
                  error ? 'border border-danger border-4' : ''
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
                  error ? 'border border-danger border-4' : ''
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
                  error ? 'border border-danger border-4' : ''
                }`}
                type='password'
                id='password'
                onChange={({ target }) => setPassword(target.value)}
              />
              {role === 'admin' && (
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
              <Button roleOf='button' type='submit' title='Sign In' />
              <Button roleOf='button' title='Back' onClick={goToHome} />
            </form>
          )}
        </>
      </BgContainer>
    </div>
  )
}

export default Home

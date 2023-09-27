import Button from '~/components/Button/intex'
import BgContainer from '~/components/BgContainer'
import { useState } from 'react'

type PropsAccess = {
  type: '' | 'login' | 'register'
}

const Home = () => {
  const [typeAccess, setTypeAccess] = useState<PropsAccess>({ type: '' })

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <BgContainer>
        <>
          {typeAccess.type === '' && (
            <>
              <h2 className='display-4'>Welcome to the </h2>
              <h1 className='display-1'>
                <strong>Musify</strong>!
              </h1>
              <p className='fst-italic '>The app for your finest and personal music collection!</p>
              <Button
                role='button'
                title='Login'
                onClick={() => setTypeAccess({ type: 'login' })}
              />
              <Button
                role='button'
                title='Sign In'
                onClick={() => setTypeAccess({ type: 'register' })}
              />
            </>
          )}
          {typeAccess.type === 'login' && (
            <form className='ps-md-5 pe-md-5'>
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input className='form-control text-center mb-2 mw-100' type='text' id='username' />
              <label className='form-label ' htmlFor='password'>
                Password
              </label>
              <input
                className='form-control text-center mw-100 mb-3'
                type='password'
                id='password'
              />
              <Button role='button' type='submit' title='Login' />
            </form>
          )}
          {typeAccess.type === 'register' && (
            <form className='ps-md-5 pe-md-5'>
              <label className='form-label' htmlFor='fullname'>
                Fullname
              </label>
              <input className='form-control text-center mw-100 mb-2' type='text' id='fullname' />
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input className='form-control text-center mw-100 mb-2' type='text' id='username' />
              <label className='form-label ' htmlFor='password'>
                Password
              </label>
              <input
                className='form-control text-center mw-100 mb-3'
                type='password'
                id='password'
              />
              <div className='form-check d-flex justify-content-center'>
                <input
                  name='role'
                  className='form-check-input bg-purple col-5'
                  type='radio'
                  id='userRole'
                  value='option1'
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
                />
                <label className='form-check-label col-7' htmlFor='adminRole'>
                  Admin
                </label>
              </div>
              <Button role='button' type='submit' title='Sign In' />
            </form>
          )}
        </>
      </BgContainer>
    </div>
  )
}

export default Home

import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Album from '~/components/Album'
import BgContainer from '~/components/BgContainer'
import Button from '~/components/Button'

export type PropsAlbuns = {
  id: number
  artist: string
  name: string
  releasedYear: number
  created_at: string
  updated_at: string | null
}

type PropsArtistsApi = {
  json: [
    [
      {
        id: number
        twitter: string
        name: string
      },
    ],
  ]
}

const Artists = () => {
  const navigate = useNavigate()

  const [albums, setAlbums] = useState<PropsAlbuns[]>()
  const [artistsOptions, setArtistsOptions] = useState<PropsArtistsApi>()
  const [selectArtist, setSelectArtist] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [albumName, setAlbumName] = useState('')
  const [yearAlbum, setYearAlbum] = useState(0)
  const [nameError, setNameError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const apiAlbum = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: { Authorization: `${localStorage.getItem('userToken')}` },
  })

  useEffect(() => {
    if (localStorage.getItem('userRole') === null) {
      alert('Please log in before accessing the app content! xD')
      navigate('/')
    } else {
      axios
        .get('/api/artists-api-controller', {
          headers: {
            authorization: 'Basic ZGV2ZWxvcGVyOlpHVjJaV3h2Y0dWeQ==',
          },
        })
        .then((res) => {
          setArtistsOptions(res.data)
        })
    }
  }, [navigate])

  const cancelAddAlbum = () => {
    setAlbumName('')
    setYearAlbum(0)
    setIsAdding(false)
    setNameError(false)
    setYearError(false)
  }

  const validateInputs = (name: string, year: number) => {
    const errors = []
    setNameError(false)
    setYearError(false)

    if (name.length < 1) {
      errors.push('ALBUM NAME')
      setNameError(true)
    }
    if (year < 1000) {
      errors.push('YEAR')
      setYearError(true)
    }
    if (errors.length > 0) {
      alert(
        `Oops! Please fill in the following fields correctly: ${errors.join(', ')} before continuing...`,
      )
      return false
    }

    return true
  }

  // **************************** HEADER FUNCTIONS ****************************

  const logout = async () => {
    const isConfirmed = confirm('You really want logout?')
    if (isConfirmed) {
      const logout = await apiAlbum.post('/sessions/logout')
      try {
        if (logout.status === 204) {
          localStorage.clear()
          navigate('/')
        }
      } catch (error) {
        console.log(error)
        localStorage.clear()
        navigate('/')
      }
    }
  }

  const createAdminAccount = () => {
    localStorage.setItem('createAdminAccount', 'admin')
    localStorage.setItem('registerPage', 'register')
    navigate('/')
  }

  // **************************** METHODS ****************************

  const getAlbums = async () => {
    const response = await apiAlbum.get(`/albums?artist=${selectArtist}`)
    try {
      if (response.status === 200) {
        setAlbums(response.data)
      }
    } catch (error) {
      alert('Sorry, the data could not be updated. Contact the admin for more information! =(')
      localStorage.clear()
      navigate('/')
    }
  }

  const addAlbum = async (e: FormEvent, album_name: string, year: number) => {
    e.preventDefault()

    const isValidated = validateInputs(albumName, yearAlbum)

    if (isValidated) {
      const albumAlreadyExists = albums?.find(
        (album) => album.name.toLowerCase() === album_name.toLowerCase(),
      )
      if (albumAlreadyExists) {
        alert('This album has already been added... Please add a new album only!')
        setNameError(true)
        setYearError(true)
      } else {
        const newAlbum = {
          artist: selectArtist,
          name: album_name,
          releasedYear: year,
        }
        try {
          const response = await apiAlbum.post('/albums', newAlbum)
          if (response.status === 201) {
            alert('Album added successfully! =D')
            cancelAddAlbum()
            getAlbums()
          }
        } catch (error) {
          console.log(error)
          alert('Sorry, the album cannot be added. Try again later... =/')
          setNameError(true)
          setYearError(true)
        }
      }
    }
  }

  const deleteAlbum = async (id: number) => {
    const isConfirmed = confirm('Do you really really really want to delete this album?')
    if (isConfirmed) {
      try {
        const response = await apiAlbum.delete(`/albums/${id}`)
        if (response.status === 204) {
          alert('Album deleted successfully!')
          getAlbums()
        }
      } catch (error) {
        alert('It was NOT possible to delete the album at the moment. Please try again later...')
      }
    }
  }

  return (
    <>
      {/* **************************** Modal to Adding Albums **************************** */}

      <div
        className={`w-100 h-100 position-absolute justify-content-center align-items-center bg-modal ${
          isAdding ? 'd-flex' : 'd-none'
        }`}
        style={{ zIndex: '100' }}
      >
        <BgContainer modal>
          <>
            <h3>
              Add Album to <strong>{selectArtist}</strong> collection&apos;s
            </h3>
            <form className='ps-md-5 pe-md-5' onSubmit={(e) => addAlbum(e, albumName, yearAlbum)}>
              <label className='form-label' htmlFor='username'>
                Album Name
              </label>
              <input
                className={`form-control text-center mb-2 mw-100 ${
                  nameError ? 'border border-danger border-4' : ''
                }`}
                type='text'
                id='album_name'
                value={albumName}
                onChange={({ target }) => setAlbumName(target.value)}
              />
              <label className='form-label ' htmlFor='album_name'>
                Year
              </label>
              <input
                className={`form-control text-center mw-100 mb-3 hiddeInnerSpinButton ${
                  yearError ? 'border border-danger border-4' : ''
                }`}
                type='number'
                id='year'
                value={yearAlbum}
                min={0}
                onChange={({ target }) => setYearAlbum(target.valueAsNumber)}
              />
              <Button roleOf='button' type='submit' title='Add Album' />
              <Button roleOf='button' type='button' title='Cancel' onClick={cancelAddAlbum} />
            </form>
          </>
        </BgContainer>
      </div>

      {/* **************************** HEADER of page with Hello, Logout, and Create Account for admin **************************** */}

      <div className='container d-flex flex-column justify-content-center align-items-center'>
        <div className='col-11 col-sm-9 col-lg-7 col-xl-6'>
          <p className='col-12 text-center'>
            Hello <strong>{localStorage.getItem('userUsername')}</strong> !
          </p>
          <div className='d-flex justify-content-between'>
            {localStorage.getItem('userRole') === 'admin' && (
              <button
                className='transparent mb-2 text-decoration-underline text-start ps-md-4'
                onClick={createAdminAccount}
              >
                Create account
              </button>
            )}
            <button
              className='transparent mb-2 text-decoration-underline text-end pe-md-4'
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* **************************** SELECT with artists list created on click **************************** */}

        <BgContainer paddingLarge={false}>
          <select
            className='fs-3 rounded-4 ps-3 ps-md-5 pe-3 pe-md-5 text-center'
            onClick={getAlbums}
            onChange={(e) => setSelectArtist(e.target.value)}
          >
            {artistsOptions ? <option></option> : <option>Loading...</option>}
            {artistsOptions &&
              artistsOptions.json.map((data) => {
                const artist = data[0]
                return (
                  <option key={artist.id} value={artist.name}>
                    {artist.name}
                  </option>
                )
              })}
          </select>
        </BgContainer>

        {/* **************************** Show's when NONE of the artists of the list was selected **************************** */}

        <BgContainer paddingLarge={false}>
          <>
            {selectArtist === '' ? (
              <>
                <div className='row text-start d-flex align-items-center justify-content-between ps-md-4 pe-4'>
                  <p className='col-12 fs-6 m-0'>Albuns Collection of the Artist:</p>
                  <h2 className='col-10 text-wrap display-4'>
                    Select an artist to see their albums!
                  </h2>
                  <hr />
                  <hr />
                </div>
                <div className='blank-space'></div>
              </>
            ) : (
              <>
                {/* **************************** Show's when SOME of the artists of the list was selected **************************** */}

                <div className='row text-start d-flex align-items-center justify-content-between ps-md-4 pe-3'>
                  <p className='col-12 fs-6 m-0'>Albuns Collection of the Artist:</p>
                  <h2 className='col-10 text-wrap display-4'>{selectArtist}</h2>
                  <Button roleOf='crud' icon='add' onClick={() => setIsAdding(true)} />
                  <hr />
                  <hr />
                </div>

                {/* **************************** MAP of the filtered albums of the artist **************************** */}

                <div className='row text-start d-flex align-items-center ps-md-4 overflow'>
                  {albums && albums.length !== 0 ? (
                    albums.map((album) => {
                      return (
                        <Album
                          key={album.id}
                          albums={albums}
                          albumId={album.id}
                          albumName={album.name}
                          albumYear={album.releasedYear}
                          deleteButton={() => deleteAlbum(album.id)}
                          selectArtist={selectArtist}
                        />
                      )
                    })
                  ) : (
                    // {/* **************************** Show's when there is NO albums for the artist **************************** */}

                    <div className='row d-flex justify-content-between align-items-center mb-3'>
                      <h3 className='col-12 transparent h3 text-wrap'>
                        There is NO albums here yet!
                      </h3>
                      <p className='col-12 transparent fs-4 text-wrap'>
                        Help us and ADD some Album to this Artist!
                      </p>
                      <hr />
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        </BgContainer>
      </div>
    </>
  )
}

export default Artists

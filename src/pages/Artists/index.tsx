import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Album from '~/components/Album'
import BgContainer from '~/components/BgContainer'
import Button from '~/components/Button'

type PropsAlbuns = {
  id: number
  artist: string
  album_name: string
  year: string
  created_at: string
  updated_at: string | null
}

export const Albuns: PropsAlbuns[] = [
  {
    id: 1,
    artist: 'Shakira',
    album_name: 'Teste 1',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 2,
    artist: 'Shakira',
    album_name: 'Teste 2',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 3,
    artist: 'Shakira',
    album_name: 'Teste 3',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 4,
    artist: 'Shakira',
    album_name: 'Teste 4',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 11,
    artist: 'Justin Bieber',
    album_name: 'Teste 11',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 12,
    artist: 'Justin Bieber',
    album_name: 'Teste 12',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 13,
    artist: 'Justin Bieber',
    album_name: 'Teste 13',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
  {
    id: 14,
    artist: 'Justin Bieber',
    album_name: 'Teste 14',
    year: '1990',
    created_at: '2023-09-22T12:00:00.000Z',
    updated_at: null,
  },
]

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

  const getDateNow = () => {
    const now = new Date()
    const year = String(now.getFullYear()).padStart(4, '0')
    const month = String(now.getMonth()).padStart(2, '0')
    const day = String(now.getDay()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const dateNow = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
    return dateNow
  }

  const [albums, setAlbums] = useState<PropsAlbuns[]>()
  const [selectArtist, setSelectArtist] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [albumName, setAlbumName] = useState('')
  const [yearAlbum, setYearAlbum] = useState('')
  const [error, setError] = useState(false)
  const [albunsToShow, setAlbunsToShow] = useState<PropsAlbuns[]>()

  useEffect(() => {
    if (localStorage.getItem('userRole') === null) {
      alert('Please log in before accessing the app content! xD')
      navigate('/')
    }
  }, [navigate])

  // **************************** HEADER FUNCTIONS ****************************

  const logout = () => {
    const isConfirmed = confirm('You really want logout?')
    if (isConfirmed) {
      localStorage.clear()
      navigate('/')
    }
  }

  const createAdminAccount = () => {
    localStorage.setItem('createAdminAccount', 'admin')
    localStorage.setItem('registerPage', 'register')
    navigate('/')
  }

  // **************************** METHODS ****************************

  const getAlbums = async () => {
    const response = await axios.get('/')
    try {
      if (response.status === 200) {
        setAlbums(response.data)
      }
    } catch (error) {
      alert('Sorry, the data could not be updated. Contact the admin for more information! =(')
      // localStorage.clear()
      // navigate('/')
    }
  }

  const addAlbum = async (e: FormEvent, album_name: string, year: string) => {
    e.preventDefault()
    if (albumName.length < 1 || yearAlbum.length < 4) {
      alert('Oops! Please try to fill all the fields correctly before continue...')
      setError(true)
    } else {
      const albumAlreadyExists = albunsToShow?.find(
        (album) => album.album_name.toLowerCase() === album_name.toLowerCase(),
      )
      if (albumAlreadyExists) {
        alert('This album has already been added... Please add a new album only!')
        setError(true)
      } else {
        const lastId = Albuns[Albuns.length - 1]
        const newId = lastId ? lastId.id + 1 : 1
        const newAlbum = {
          id: newId,
          artist: selectArtist,
          album_name: album_name,
          year: year,
          created_at: getDateNow(),
          updated_at: null,
        }
        try {
          const response = await axios.post('', newAlbum)
          if (response.status === 201) {
            alert('Album added successfully! =D')
            setAlbumName('')
            setYearAlbum('')
            setIsAdding(false)
            setError(false)
            getAlbums()
          }
        } catch (error) {
          console.log(error)
          alert('Sorry, the album cannot be added. Try again later... =/')
          setError(true)
        }
      }
    }
  }

  const [artistsOptions, setArtistsOptions] = useState<PropsArtistsApi>()

  const showOptions = () => {
    axios
      .get('/api/artists-api-controller', {
        headers: {
          authorization: 'Basic ZGV2ZWxvcGVyOlpHVjJaV3h2Y0dWeQ==',
        },
      })
      .then((res) => {
        setArtistsOptions(res.data)
      })
    const findAlbuns = Albuns.filter((album) => album.artist === selectArtist)
    setAlbunsToShow(findAlbuns)
  }

  const cancelAddAlbum = () => {
    setAlbumName('')
    setYearAlbum('')
    setIsAdding(false)
    setError(false)
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
                  error ? 'border border-danger border-4' : ''
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
                className={`form-control text-center mw-100 mb-3 ${
                  error ? 'border border-danger border-4' : ''
                }`}
                type='number'
                id='year'
                value={yearAlbum}
                onChange={({ target }) => setYearAlbum(target.value)}
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
                Create admin account
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
            onClick={showOptions}
            onChange={(e) => setSelectArtist(e.target.value)}
          >
            <option></option>
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
                  {albunsToShow && albunsToShow.length !== 0 ? (
                    albunsToShow.map((album) => {
                      return (
                        <Album
                          key={album.id}
                          albumName={album.album_name}
                          albumYear={album.year}
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
                        Hellp us and add some Album to this Artist!
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

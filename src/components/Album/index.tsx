import { useEffect, useState } from 'react'
import Button from '../Button'
import { PropsAlbuns } from '~/pages/Artists'
import axios from 'axios'

type PropsAlbum = {
  albumId: number
  albumName: string
  albumYear: number
  selectArtist: string
  deleteButton: () => void
  albums: PropsAlbuns[]
}

const Album = ({
  albums,
  albumId,
  albumName: originalAlbumName,
  albumYear: originalAlbumYear,
  selectArtist,
  deleteButton,
}: PropsAlbum) => {
  const [isEditing, setIsEditing] = useState(false)
  const [albumName, setAlbumName] = useState('')
  const [albumYear, setAlbumYear] = useState(0)

  const apiAlbum = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: { Authorization: `${localStorage.getItem('userToken')}` },
  })

  useEffect(() => {
    if (originalAlbumName.length > 0) {
      setAlbumName(originalAlbumName)
    }

    if (originalAlbumYear > 0) {
      setAlbumYear(originalAlbumYear)
    }
  }, [originalAlbumName, originalAlbumYear])

  const cancelEdit = () => {
    setIsEditing(false)
    setAlbumName(originalAlbumName)
    setAlbumYear(originalAlbumYear)
  }

  const validateAlbum = () => {
    const albunsWithoutEditing = albums.filter(
      (album) => album.name.toLowerCase() !== originalAlbumName.toLowerCase(),
    )
    const albumAlreadyExists = albunsWithoutEditing.find(
      (album) => album.name.toLowerCase() === albumName.toLowerCase(),
    )

    if (albumAlreadyExists) {
      alert('An album with that name has already been added! Please try again...')
      return false
    }
    if (albumName === originalAlbumName && albumYear === originalAlbumYear) {
      const isConfirmed = confirm(
        'No editing was performed on the fields. Do you want to CANCEL editing?',
      )
      if (isConfirmed) {
        alert('The edition has been CANCELLED!')
        cancelEdit()
        return false
      } else {
        setIsEditing(true)
        return false
      }
    }
    return true
  }

  const validateInputs = () => {
    if (albumName.length === 0 && albumYear < 1000) {
      alert('Oops! Please try to fill ALL the fields correctly before continue...')
      return false
    }
    if (albumName.length === 0) {
      alert('Oops! Please try to fill the field ALBUM NAME correctly before continue...')
      return false
    }
    if (albumYear < 1000) {
      alert('Oops! Please try to fill the field YEAR correctly before continue...')
      return false
    }
    return true
  }

  // **************************** METHODS ****************************

  const editAlbum = async () => {
    const albumIsValid = validateAlbum() && validateInputs()

    if (albumIsValid) {
      try {
        const albumEdited = {
          artist: selectArtist,
          name: albumName,
          releasedYear: albumYear,
        }
        const response = await apiAlbum.put(`/albums/${albumId}`, albumEdited)
        if (response.status === 200) {
          alert('Album edited successfully!')
          setIsEditing(false)
        }
      } catch (error) {
        alert('Unable to update the album at the moment. Try again later!')
      }
    }
  }

  return (
    <div className='row d-flex justify-content-between align-items-center mb-3'>
      <input
        type='text'
        className={`col-9 transparent h3 ${
          isEditing ? 'border border-warning border-3 rounded-3 ' : ''
        }`}
        disabled={!isEditing}
        value={albumName}
        onChange={({ target }) => setAlbumName(target.value)}
      />
      {!isEditing ? (
        <Button roleOf='crud' icon='edit' onClick={() => setIsEditing(true)} />
      ) : (
        <Button roleOf='crud' icon='save' onClick={editAlbum} />
      )}
      <input
        className={`col-9 transparent fs-4 hiddeInnerSpinButton ${
          isEditing ? 'border border-warning border-3 rounded-3 ' : ''
        }`}
        type='number'
        value={albumYear}
        onChange={({ target }) => setAlbumYear(target.valueAsNumber)}
        disabled={!isEditing}
      />
      {!isEditing ? (
        localStorage.getItem('userRole') === 'admin' && (
          <Button roleOf='crud' icon='delete' onClick={deleteButton} />
        )
      ) : (
        <Button roleOf='crud' icon='cancel' onClick={cancelEdit} />
      )}
      <hr />
    </div>
  )
}

export default Album

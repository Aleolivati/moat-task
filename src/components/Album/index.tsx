import { useEffect, useState } from 'react'
import Button from '../Button'
import { Albuns } from '~/pages/Artists'
import axios from 'axios'

type PropsAlbum = {
  key: number
  albumName: string
  albumYear: string
  selectArtist: string
}

const Album = ({ key, albumName: originalAlbumName, albumYear: originalAlbumYear, selectArtist }: PropsAlbum) => {
  const [isEditing, setIsEditing] = useState(false)
  const [albumName, setAlbumName] = useState('')
  const [albumYear, setAlbumYear] = useState('')

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

  useEffect(() => {
    if (originalAlbumName.length > 0) {
      setAlbumName(originalAlbumName)
    }

    if (originalAlbumYear.length > 0) {
      setAlbumYear(originalAlbumYear)
    }
  }, [originalAlbumName, originalAlbumYear])

  const cancelEdit = () => {
    setIsEditing(false)
    setAlbumName(originalAlbumName)
    setAlbumYear(originalAlbumYear)
  }

  const editAlbum = async () => {
    const albunsWithoutEditing = Albuns.filter(
      (album) => album.album_name.toLowerCase() !== originalAlbumName.toLowerCase(),
    )

    const albumAlreadyExists = albunsWithoutEditing.find(
      (album) => album.album_name.toLowerCase() === albumName.toLowerCase(),
    )

    if (albumAlreadyExists) {
      alert('An album with that name has already been added! Please try again...')
    } else {
      try {
        const albumEdited = {
          id: key,
          artist: selectArtist,
          album_name: albumName,
          year: albumYear,
          update_at: getDateNow(),
        }
        const response = await axios.patch('', albumEdited)
        if (response.status === 200) {
          alert('Album edited successfully!')
          setIsEditing(false)
        }
      } catch (error) {
        alert('Unable to update the album at the moment. Try again later!')
      }
    }
  }

  const deleteAlbum = async (id: number) => {
    const isConfirmed = confirm('Do you really really really want to delete this album?')
    if (isConfirmed) {
      try {
        const response = await axios.delete(`/${id}`)
        if (response.status === 200) {
          alert('Album deleted successfully!')
          // atualizar base
        }
      } catch (error) {
        console.log(error)
        alert('It was NOT possible to delete the album at the moment. Please try again later...')
      }
    }
  }

  return (
    <div className='row d-flex justify-content-between align-items-center mb-3' key={key}>
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
        <Button roleOf='crud' icon='save' onClick={editAlbum}/>
      )}
      <input
        className={`col-9 transparent fs-4 ${
          isEditing ? 'border border-warning border-3 rounded-3 ' : ''
        }`}
        type='number'
        value={albumYear}
        onChange={({ target }) => setAlbumYear(target.value)}
        disabled={!isEditing}
      />
      {!isEditing ? (
        localStorage.getItem('userRole') === 'admin' && (
          <Button roleOf='crud' icon='delete' onClick={() => deleteAlbum(key)} />
        )
      ) : (
        <Button roleOf='crud' icon='cancel' onClick={cancelEdit} />
      )}
      <hr />
    </div>
  )
}

export default Album

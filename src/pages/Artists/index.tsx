/* eslint-disable jsx-a11y/aria-role */
import BgContainer from '~/components/BgContainer'
import Button from '~/components/Button/intex'

const Artists = () => {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
      <BgContainer paddingLarge={false}>
        <select className='fs-3 rounded-4 ps-5 pe-5 text-center'>
          <option>Artista 1</option>
          <option>Artista 2</option>
          <option>Artista 3</option>
          <option>Artista 4</option>
          <option>Artista 5</option>
          <option>Artista 1</option>
          <option>Artista 2</option>
          <option>Artista 3</option>
          <option>Artista 4</option>
          <option>Artista 5</option>
          <option>Artista 1</option>
          <option>Artista 2</option>
          <option>Artista 3</option>
          <option>Artista 4</option>
          <option>Artista 5</option>
          <option>Artista 1</option>
          <option>Artista 2</option>
          <option>Artista 3</option>
          <option>Artista 4</option>
          <option>Artista 5</option>
        </select>
      </BgContainer>
      <BgContainer paddingLarge={false}>
        <>
          <div className='row text-start d-flex align-items-center justify-content-between ps-md-4 pe-4'>
            <p className='col-12 fs-6 m-0'>Albuns Collection of the Artist:</p>
            <h2 className='col-10 text-wrap display-2'>Artist artist artist Artist 1</h2>
            <Button role='crud' icon='https://via.placeholder.com/15x15' />
            <hr />
            <hr />
          </div>
          <div className='row text-start d-flex align-items-center ps-md-4 overflow'>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
            <div className='row d-flex justify-content-between align-items-center mb-3'>
              <h3 className='col-9'>Album Name</h3>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <p className='col-9'>Year</p>
              <Button role='crud' icon='https://via.placeholder.com/15x15' />
              <hr />
            </div>
          </div>
        </>
      </BgContainer>
    </div>
  )
}

export default Artists

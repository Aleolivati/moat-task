import { Route, Routes } from 'react-router-dom'
import Home from '~/pages/Home'
import Artists from '~/pages/Artists'

const RoutePages = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/artists' element={<Artists />} />
  </Routes>
)

export default RoutePages

import { BrowserRouter } from 'react-router-dom'

import RoutePages from '~/routes'

const App = () => {
  return (
    <BrowserRouter>
      <RoutePages />
    </BrowserRouter>
  )
}

export default App

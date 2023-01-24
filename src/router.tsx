import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './components/NotFound'
import { Main } from './pages/Main/'
import { Repository } from './pages/Repository/'

export default function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repository/:repository' element={<Repository />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
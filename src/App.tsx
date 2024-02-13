import { Header } from './modules/Header'
import { About } from './modules/About'
import { Main } from './modules/Main'
import { useEffect } from 'react'
import { useActions } from './redux/hooks'

function App() {
  const {getInfo} = useActions()

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div className='wrapper'>
      <Header />
      <About />
      <Main />
    </div>
  )
}

export default App

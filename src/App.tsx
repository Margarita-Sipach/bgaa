import { Header } from './modules/Header'
import { About } from './modules/About'
import { Main } from './modules/Main'
import { useEffect } from 'react'
import { useActions, useTypedSelector } from './redux/hooks'
import { Button } from 'antd'

function App() {
  const {getInfo, addInfo} = useActions()
  const {info, isLoading, error} = useTypedSelector(state => state.info)
  const {data, teachers} = info


  useEffect(() => {
    getInfo()
  }, [])

  return data?.map((i: any) => (
        <div className='wrapper' key={i.uniqueId}>
        <Header />
        <About data={i} />
        <Main data={i} teachers={teachers}/>
        <Button onClick={addInfo} className='save-button'>Сохранить</Button>
      </div>
  ))
}

export default App

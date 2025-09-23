import { useState } from 'react'
import Linker from './Components/Linker'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Linker />
    </>
  )
}

export default App

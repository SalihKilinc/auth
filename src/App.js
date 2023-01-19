import React from 'react'
import { StoreProvider } from './store'

const App = () => {
  return (

    <StoreProvider> 
    <div>App</div>
    </StoreProvider>
  )
}

export default App
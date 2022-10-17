import './App.css'
import { LengthConverter } from './components/LengthConverter'
import { LengthContextProvider } from './contexts/LengthContext'

function App() {
  return (
    <LengthContextProvider>
      <LengthConverter />
    </LengthContextProvider>
  )
}

export default App

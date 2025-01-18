import './App.css'
import Console from './components/Console'
import Navbar from './components/Navbar'
import { AnthillProvider } from './contexts/AnthillContext'
import { AnthillIdProvider } from './contexts/AnthillIdContext'
import { SimulationProvider } from './contexts/AnthillSimulationContext'
import { DevToolsProvider } from './contexts/DevToolsContext'
import { FocusProvider } from './contexts/FocusContext'

function App() {
  return (
    <AnthillIdProvider>
      <AnthillProvider>
        <SimulationProvider>
          <DevToolsProvider>
            <FocusProvider>
              <div className='main'>
                <Console />
                <Navbar />
              </div>
            </FocusProvider>
          </DevToolsProvider>
        </SimulationProvider>
      </AnthillProvider>
    </AnthillIdProvider>
  )
}

export default App

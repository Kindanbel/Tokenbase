import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import CreateScreen from './Screens/CreateScreen/CreateScreen'
import { DesignContextProvider } from './context/DesignContext'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import LogScreen from './Screens/LoginScreen/LogScreen'
import GroupScreen from './Screens/GroupScreen/GroupScreen'

function App() {

  return (
    <DesignContextProvider>
    <BrowserRouter>
    <div className='bg-gray-100 h-[100vh]'>
      <Routes>
        <Route path="/" element={<CreateScreen />}/>
        <Route path="/login" element={<LogScreen />}/>
        <Route path="/main/:id/:design_title" element={<HomeScreen />} />
        <Route path="/group/:design_id/*" element={<GroupScreen />} />
      </Routes>
      
    </div>
    </BrowserRouter>
    </DesignContextProvider>
  )
}

export default App

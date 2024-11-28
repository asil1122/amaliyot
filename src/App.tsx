import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/login"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App

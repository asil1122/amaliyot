import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/login"
import { MainLayout } from "./layout/main-layout"
import { CategoryList } from "./pages/category/category-list"
import { Create } from "./pages/create"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/app" element={<MainLayout/>}>
          <Route index element={<CategoryList/>}/>
          <Route path="/app/create" element={<Create/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

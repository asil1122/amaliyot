import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/login"
import { MainLayout } from "./layout/main-layout"
import { CategoryList } from "./pages/category/category-list"
import { Create } from "./pages/create"
import { SubCategory } from "./pages/subCategory"
import { EditCategory } from "./pages/editCategory"
// import { SubForm } from "./components/sub-form"
import { SubCreate } from "./pages/sub-create"
import { EditSubCategory } from "./pages/edit-sub-category"
import { BannerList } from "./pages/banner-list/banner-list"
import { BrandList } from "./pages/brand-list"
import { BannerCreate } from "./pages/banner-create"
import { EditBanner } from "./pages/edit-banner"
import { BrandCreate } from "./pages/brand-create"
import { BrandEdit } from "./pages/brand-edit"
import { ProductList } from "./pages/product-list"
import { ProductCreate } from "./pages/product-create/product-create"
import { ProductEdit } from "./pages/product-edit"
import { Variants } from "./pages/product-variant"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/app" element={<MainLayout/>}>
          <Route index element={<CategoryList/>}/>
          <Route path="/app/create" element={<Create/>}/>
          <Route path="/app/edit/:id" element={<EditCategory/>}/>
          <Route path="/app/sub-category" element={<SubCategory/>}/>
          <Route path="/app/sub-category/create" element={<SubCreate/>}/>
          <Route path="/app/sub-category/edit/:id" element={<EditSubCategory/>}/>
          <Route path="/app/banner-list" element={<BannerList/>} />
          <Route path="/app/brand-list" element={<BrandList/>}/>
          <Route path="/app/banner-list/create" element={<BannerCreate/>}/>
          <Route path="/app/banner-list/edit/:id" element={<EditBanner/>}/>
          <Route path="/app/brand-list/create" element={<BrandCreate/>}/>
          <Route path="/app/brand-list/edit/:id" element={<BrandEdit/>}/>
          <Route path="/app/product-list" element= {<ProductList/>} />
          <Route path="/app/product-list/create" element={<ProductCreate/>}/>
          <Route path="/app/product-list/edit/:id" element={<ProductEdit/>}/>
          <Route path="/app/product-list/variants/:id" element={<Variants/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

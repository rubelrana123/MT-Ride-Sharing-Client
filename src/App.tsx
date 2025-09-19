import { Outlet } from "react-router"
 
import CommonLayout from "./components/layout/CommonLayout"
import generateRoute from "./utils/generateRoute"
import { adminSidebarItems } from "./routes/adminSliderItems";
 
 

  
function App() {
//  console.log(generateRoute(adminSidebarItems));

  return (
    <CommonLayout>
 
      <Outlet/>
 
    </CommonLayout>
  )
}

export default App
import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";

const App=()=>{
  return (
    <BrowserRouter>
    <DefaultLayout />
    </BrowserRouter>
  )
}

export default App;
import Home from "./UserInterface/screens/Home"
import {BrowserRouter,Routes,Route} from'react-router-dom';
import AdminLogin from './administrator/screens/AdminLogin'
import AdminDashboard from './administrator/screens/Admindashboard';
import SecondPage from "./UserInterface/screens/SecondePage";
import ThirdPage from "./UserInterface/screens/ThirdPage"
import AddBag from "./UserInterface/screens/AddBag"
import JoinSignComponent from "./UserInterface/components/JoinSignComponent";
import UserSignin from "./UserInterface/screens/UserSignin"
import UserJoinin from "./UserInterface/screens/UserJoinin"
import UserCheckout  from "./UserInterface/screens/UserCheckout"


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
        <Route  element={<AddBag />} path={"/addbag"} /> 
        <Route  element={<ThirdPage />} path={"/thirdpage"} /> 
        <Route  element={<SecondPage />} path={"/secondpage"} /> 
        <Route  element={<Home />} path={"/home"} /> 
        <Route  element={<AdminLogin />} path={"/adminlogin"} />
        <Route  element={<AdminDashboard />} path={"/admindashboard/*"} />
        <Route  element={<JoinSignComponent />} path={"/joinsign"} />
        <Route  element={<UserSignin/>} path={"/usersignin"} />
        <Route  element={<UserJoinin/>} path={"/userjoinin"} />
        <Route  element={<UserCheckout/>} path={"/usercheckout"} />
        </Routes>
      </BrowserRouter>
          
    </div>
  )
}

export default App;

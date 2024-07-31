import Appbar from "../components/AppBar";
import Header from "../components/Header"
import ProductComponent from "../components/ProductComponent";
import ShowAllDropDown from "../components/ShowAllDropDown"
import PaymentCardComponent from "../components/PaymentCardComponent"
import Bottom from "../components/Bottom"
import AppBar from "../components/AppBar"
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer" 
import HomeBar from "../components/HomeBar";
import { useEffect,useState } from "react";
import { postData } from "../../services/FetchDjangoApiService";


export default function SecondPage(props){
    const [productlist, setProductList] = useState([])

    const location=useLocation()
    console.log('LLOOCCAATTTION:',location)
    console.log(location.state)

    var pageview = location.state.pageview;
    var products = location.state.products;
     

    const setPage = async () => {
   
    if (pageview === 'MainCategory') {
        // alert("2")
        var result = await postData("user_p_list_by_mcat", { mainCategory: products.id });
        console.log("RRRRESSS:",result)
        setProductList(result.data);
    }
}
      useEffect(function(){
        setPage()
       
     },[])


   

    return(<div style={{width:'100%'}} >
        
    <div style={{width:'100%'}} >
        <Header />
        <AppBar position="static" />
      
        <HomeBar category={products.maincategoryname} />
       <ShowAllDropDown/>
       </div> 
      <ProductComponent data={productlist} />
      <PaymentCardComponent/>
         <Bottom/>
         <Footer/>    
    </div>)
}
import SubCategoryComponent from "../components/SubCategoryComponent"
import Header from "../components/Header"
import PicComponent from "../components/PicComponent"
import Banner2 from "../components/Banner2"
import Banner3 from "../components/Banner3"
import MainCategory from "../components/MainCategory"
import LogoComponent from "../components/LogoComponent"
import SliderComponent from "../components/SliderComponent"
import PaymentCardComponent from "../components/PaymentCardComponent"
import Bottom from "../components/Bottom"
import {useState,useEffect} from "react"
import { getData } from "../../services/FetchDjangoApiService"
import Footer from "../components/Footer" 
export default function Home(props)
{
    const [listBanner,setListBanner]=useState([])
    const [listSubCategory,setListSubCategory] =useState([])
    const [listMainCategory,setListMainCategory]=useState([])
    const [brandList,setBrandList]=useState([])

    const fetchAllMainCategory=async()=>{
        var result=await getData("user_maincategory_list")
        setListMainCategory(result.data)

    }

    const fetchAllBanners=async()=>{
        var result=await getData("banner_list")
        var images=result.data.bannericon.split(",")
        setListBanner(images)

    }
    const fetchAllSubCategory=async()=>{
        var result=await getData("user_subcategory_list")
        setListSubCategory(result.data)
        // alert(JSON.stringify(result.data))

    }

    useEffect(function(){
        fetchAllBanners()
        fetchAllSubCategory()
        fetchAllMainCategory()
        fetchAllBrands()
    },[])
  

    const fetchAllBrands=async()=>{
        var result=await getData("all_brand_list")
        setBrandList(result.data)
        // alert(JSON.stringify(result.data))

    }

    return(<div style={{position:'relative',width:'100%'}}>
         <Header/>
         <div style={{display:'flex',width:'99%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
         <div style={{marginTop:20,width:'98%',display:'flex',justifyContent:'center'}}>
     <SliderComponent data={listBanner}/> 
        </div>
         <PicComponent/> 
        
        <div style={{width:'85%',display:'flex',justifyContent:'center',marginTop:'5px'}}>
            <SubCategoryComponent data={listSubCategory}/>
         </div>
         <Banner2/>
         <Banner3/>
         <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'30px'}}>
            <MainCategory data={listMainCategory}/>
         </div>
         <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'30px'}}>
         <LogoComponent data={brandList}/>
         </div>
         <PaymentCardComponent/>
         <Bottom/>
         <Footer/>
      </div>  
    </div>)
}
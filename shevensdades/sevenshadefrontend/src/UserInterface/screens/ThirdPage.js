import Header from "../components/Header"
import AppBar from "../components/AppBar"
import ProductDetailComponent from "../components/ProductDetailComponent"
import { useState, useEffect } from 'react';
import Footer from "../components/Footer"
import PaymentCardComponent from "../components/PaymentCardComponent"
import Bottom from "../components/Bottom"
import { useLocation } from "react-router-dom";
import { postData } from "../../services/FetchDjangoApiService";
import { Divider } from "@mui/material";
import ProductComponent from "../components/ProductComponent";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { serverURL } from "../../services/FetchDjangoApiService";
import { Navigate, useNavigate } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery'

export default function ThridPage(props) {
  const [icon, setIcon] = useState()
  const [productdetaillist, setProductDetailList] = useState([])
  const [productList, setProductList] = useState([])
  const [maincategoryid, setMainCategoryId] = useState('')

  const sm_matches = useMediaQuery('(min-width:600px)')
  const md_matches = useMediaQuery('(min-width:768px)')

  var nevigate = useNavigate()

  const location = useLocation()
  const [pageRefresh, setPageRefresh] = useState(false)

  console.log('LLOc:', location)
  console.log("stateeee", location.state)
  var productid = location.state.product


  const handlenextpage = (item) => {

    nevigate('/thirdpage', { state: { product: item?.id } })

  }



  const setPageView = async () => {
    var result = await postData("dispaly_product_by_id", { product: productid });
    console.log("RRRRESSS:", result.data)
    setProductDetailList(result.data);
    console.log("QQQQQQQ", result.data[0].mainCategory.id)
    setMainCategoryId(result.data[0].mainCategory.id)
    setPage(result.data[0].mainCategory.id)
  }
 

  const setPage = async (mid) => {
     console.log("Cccccccc",mid)
    var result = await postData("user_p_list_by_mcat", { mainCategory: mid });
    console.log("REsulttttttt:", result.data)
    setProductList(result.data);

  }
  useEffect(function () {
    setPage()
    setPageView()


  }, [])

  const ShowProduct = () => {
    return productList?.map((item, index) => {
      if (item.id != productid) {
        return (<div style={{ cursor: 'pointer', width: sm_matches ? 140 : md_matches ? 100 : 80, display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center', marginTop: '5px', position: 'relative' }} onClick={() => handlenextpage(item)}>
          <img src={`${serverURL}/${item.producticon}`} loading="lazy" style={{ width: sm_matches ? 150 : md_matches ? 90 : 60, height: sm_matches ? 170 : md_matches ? 'auto' : 'auto' }} />

          <div style={{
            width: sm_matches ? 20 : md_matches ? 15 : 10,
            height: sm_matches ? 20 : md_matches ? 15 : 10,
            borderRedius: '50%',
            background: '#FFFFEC',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 2,
            marginLeft: sm_matches ? "60%" : md_matches ? '55%' : '45%',
            marginTop: sm_matches ? "70%" : md_matches ? '55%' : '35%'
          }}>
            {icon == index ? <FavoriteIcon onMouseOver={() => setIcon(index)} onMouseLeave={() => setIcon()} style={{ position: 'absolute', zIndex: 3, fontSize: 12 }} /> : <FavoriteBorderIcon onMouseOver={() => setIcon(index)} onMouseLeave={() => setIcon(index)} style={{ position: 'absolute', zIndex: 3, fontSize: 12 }} />} </div>
          <div style={{ textAlign: 'center', height: sm_matches ? 50 : md_matches ? 30 : 'auto', fontSize: sm_matches ? 14 : md_matches ? 12 : 10 }}>{item.productname}</div>
        </div>)
      }
    })

  }




  return (<div>
    <Header />
    <AppBar position="static" />
    <ProductDetailComponent data={productdetaillist} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
    <Divider style={{ marginTop: '20px' }} />

    <div style={{ width: '60%', marginLeft: sm_matches ? 220 : md_matches ? 170 : 10, padding: 5 }}>
      <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: 0.5 }}>YOU MIGHT ALSO LIKE</div>


      <div style={{ width: '90%', marginTop: '30px', display: 'flex', flexWrap: "wrap", alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
        {ShowProduct()}
      </div>


    </div>
    <PaymentCardComponent />
    <Bottom />
    <Footer />
  </div>)



}
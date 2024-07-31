import * as React from 'react';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {serverURL,postData}  from "../../services/FetchDjangoApiService"
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Bottom from "../components/Bottom"
import Footer from '../components/Footer';
import { Divider } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sevenshades
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();


export default function UserCheckout(props){
  var user=useSelector(state=>state.user)
  // console.log("GGGGGGggggg",user)
  var userData=Object.values(user)[0]


     
  const cartData = useSelector((state) => state.product);
  const items = Object.values(cartData);
  console.log("******",items)
  
  var totalamount = items?.reduce((item1, item2) => {
    var amt = item1 + item2.price * item2.quntity;
    return amt;
  }, 0);

  var actualamount = items?.reduce((item1, item2) => {
    var amt =
      item1 +
      (item2.offerprice > 0
        ? item2.offerprice * item2.quntity
        : item2.price * item2.quntity);
    return amt;
  }, 0);

  var saveamount = totalamount - actualamount;


  const [firstname,setFirstName]=useState(userData?.firstname)  
  const [lastname,setLastName]=useState(userData?.lastname)  
  const [mobileno,setMobileno]=useState(userData?.mobileno)
    const [address,setAddress]=useState('')
    const[country,setCountry]=useState('IN')
    const [city,setCity]=useState('')
    const [postcode,setPostcode]=useState('')
    const [addressList,setAddressList]=useState([])
    const [open ,setOpen]=useState(false)
 
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));
  
  var cards = [{ id: '1', brandicon: 'visa.png' }, { id: '2', brandicon: 'MasterCard.png' }, { id: '2', brandicon: 'pay.png' }, { id: '3', brandicon: 'american.png' }, { id: '4', brandicon: 'viisa.png' }]
  const ShowAllCards = () => {
    return cards.map((item, index) => {
      return (<div >
        <img src={`${serverURL}/static/${item.brandicon}`} loading="lazy" style={{ width: '50%', marginLeft: '1px' }} />
      </div>)
    })
  }

  const fetchUserAddress=async()=>{
    var result=await postData('fetch_user_address',{mobile:userData?.mobileno})
    if(result.status)

      {
        //  alert(JSON.stringify(result.data))
        setAddressList(result.data)
        setOpen(false)
      }
      else
      {
        setOpen(true)
      }
 
  }
  useEffect(()=>{

    fetchUserAddress()
  },[])

  const showAddressList = () => {
    return addressList?.map((item) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{item.address}</div>
          <div>
            {item.city},{item.country}
          </div>
          <div>{item.postcode}</div>
        </div>
      );
    });
  };


  const showAddress = () => {
    return addressList.map((item)=>{
      return <div>
        
        <div>{userData?.address} </div>
        <div>{userData?.city}, {userData?.country},{userData?.postcode} </div>
      </div>
    })


  }

  const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('country',country)
    formData.append('address',address)
    formData.append('city',city)
    formData.append('postcode',postcode)
    formData.append('mobileno',userData.mobileno)

    
    var result=await postData('address_submit',formData)
    if(result.status)
      {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
      toast:true,
    });
    setOpen(false)
  }
  else
  {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
      toast:true
    });
  }
  }
  return (
    <div style={{ background: '#eee',height:'auto' }}> 
      <div style={{width:970,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginLeft:10}}>
       <div style={{marginTop:40,marginLeft:50,textAlign: 'center',  color: 'black', fontSize: '2vw', fontStyle: 'bold', fontWeight: 900, letterSpacing: 1}}>SevenShades</div>
       <div style={{marginTop:30, textAlign: 'center', color: 'black', fontSize: '2vw', fontWeight: 'bold',fontWeight: 900, letterSpacing: 1 }}>CHECK OUT</div>
      </div>
  <ThemeProvider theme={defaultTheme}  >
      <Container component="main" maxWidth="xl" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
            
          }}
        >
        
          <Box  sx={{  width: sm_matches?'100%':md_matches?'80%':'70%' }}>
        <Grid container spacing={2}>
         {sm_matches?<></>:md_matches?<></>:<Grid  item xs={2} ></Grid>}

        
       <Grid item  xs={12} sm={10} md={5} >
       <div style={{ marginTop:1, backgroundColor: 'white',height:120, width: '100%', display: 'flex',flexDirection:'column', padding: '0.8%' }}>
            <div style={{ marginLeft:5,fontWeight: 'bold', fontSize: '2vw' }}>ADDRESS</div>
            <div style={{color:'black',fontWeight:'bold',fontSize:'1vw',marginBottom:'2%'}}>
        {userData?.firstname} {userData?.lastname}
        {showAddressList()}
               
            </div> 

             
            <div style={{color:'black',fontWeight:'bold',textAlign:'left',fontSize:'.8vw',marginBottom:'2%'}}>
            {
            addressList.length==0?<div><Button>ADD NEW ADDRESS</Button></div>:showAddress()}
            
            </div> 
          </div>



          {open?AddAdress():<></>}

    <div style={{width:'100%',backgroundColor:'white',paddingLeft:'5%',paddingTop:'5%',marginTop: '5%'}}>  
<Box  sx={{ mt: 1 }}>
        <div style={{color:'black',fontWeight:'bold',textAlign:'left',fontSize:'1vw',marginTop:'2%',marginBottom:'2%'}}>
             <div style={{color:'black',fontWeight:'bold',textAlign:'left',fontSize:'1vw',marginTop:'1%',marginBottom:'1%'}}>PAYMENT TYPE</div>
        </div> 
  </Box>
  </div> 
          <div style={{height:50,marginTop:'-2%',display: 'flex', flexDirection: 'row',alignItems:'center',justifyContent:'center',backgroundColor:'#a2a6a4' ,width:'100%'}}>
          <div style={{ fontWeight: 'bold',width:'60%',marginTop:5,textAlign:'center' }}>WE ACCEPT:</div>
          <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
            {ShowAllCards()}
          </div>


  {sm_matches? <div style={{ backgroundColor: 'white', width: '60%', padding: '1%', marginTop: 5 }}>
            {showTotal()}
          </div>:md_matches? <div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: 5 }}>
           {showTotal()}
          </div>:<></>}        
        </div> 
        

                </Grid>
               { sm_matches?<></>:md_matches?<></>:<Grid item xs={4} >
          <div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: 5 }}>
            {showTotal()}
          </div>
        </Grid> }
 </Grid>
</Box>
          
        </Box>
       
       
      </Container>
        </ThemeProvider>
     {/* </div>  */}
     <Divider component="li" />
     <Bottom />
    <Footer />
   
 </div>
  
  );
}

import { useState } from "react"
import { serverURL } from "../../services/FetchDjangoApiService"
import Divider from '@mui/material/Divider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef,useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export  default function LogoComponent(props){
  
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));   
 const sldr=useRef()
    var items=props.data
 
      
      var settings = {
       dots:false,
       infinite: true,
       
       autoPlay:true,
       autoplaySpeed:3000,
       slidesToShow: sm_matches?1:md_matches?4:7,
       slidesToScroll: 1,
       arrows:false
       
     };
 
     const handleNext=()=>{
       sldr.current.slickNext()
     }
     const handlePrevious=()=>{
      sldr.current.slickPrev()
 
     }
            
    
    const ShowAllBrand=()=>{
        return items.map((item,index)=>{
            return(<div >
                <img src={`${serverURL}/${item.brandicon}`} loading="lazy" style={{width:80,height:80}} />
            </div>)
        })
    } 

    
    
    return(<div style={{width:'65%',height:'35%',position:'relative',marginTop:'10px' ,}}>
     
    <div style={{cursor:'pointer', position:'absolute',left:'-6%',top:'28%',zIndex:3,}} onClick={handlePrevious}><ArrowBackIosIcon style={{color:'grey',fontSize:'3vw'}}/></div>
    <Slider ref={sldr} {...settings}>
    {ShowAllBrand()}
    </Slider> 
    <div style={{cursor:'pointer', position:'absolute',right:'-2%',top:'28%',zIndex:3}}><ArrowForwardIosIcon style={{color:'grey',fontSize:'3vw'}} onClick={handleNext}/></div>
    </div>
    )          
}
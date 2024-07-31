import { serverURL } from "../../services/FetchDjangoApiService"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRef } from "react";

export default function SubCategoryComponent(props){
    const nevigate=useNavigate()
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));
    const sldr=useRef()
    
      var settings = {
                dots: true,
                infinite: true,
                speed: 1000,
                slidesToShow: sm_matches?1:md_matches?2:4,
                slidesToScroll: 1,
                autoplay:true,
                arrows:false
              };

    var data=props.data

    const ShowAllItems=()=>{
        return data.map((item)=>{
        
            return(<div style={{display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
                     <div>
                <img src={`${serverURL}${item.subcategoryicon}`} loading="lazy" style={{width:'90%',height:'100%'}}/>
                </div>
                     <div style={{fontWeight:"bold",fontSize:18,letterSpacing:0.5}}>
                        {item.subcategoryname}
                     </div>
                   
            </div>)
        })
    }          

const handleNext=()=>{
    sldr.current.slickNext()
}


const handlePrevious=()=>{
    sldr.current.slickPrev()
}

    return( <div style={{width:'100%',position:'relative'}}>
            <div style={{cursor:'pointer', position:'absolute',left:'-6%',top:'34%',zIndex:3}}><ArrowBackIosNewIcon style={{color:'grey',fontSize:'6vw'}} onClick={handlePrevious}/></div>
            <Slider  ref={sldr} {...settings}>
           {ShowAllItems()}
           </Slider>
        
           <div style={{cursor:'pointer', position:'absolute',right:'-6%',top:'34%',zIndex:3}}><ArrowForwardIosIcon style={{color:'grey',fontSize:'6vw'}} onClick={handleNext}/></div>
    
    </div>)
}
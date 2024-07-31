
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchDjangoApiService";

export default function SliderComponent(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  var data=props.data

  const ShowSlider=()=>{
    return data?.map((item)=>{
      return (<div >
         <img src={`${serverURL}/static/${item}` } style={{width:"95%",height:'45%'}}/>
      </div>)
    })
  }          
  return (
    <div style={{width:'100%'}}>
    <Slider {...settings}>
     {ShowSlider()}
    </Slider>
    </div>
  );
}
import { Grid, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { serverURL, getData } from '../../services/FetchDjangoApiService';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useRef } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Rowing } from '@mui/icons-material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Divider from '@mui/material/Divider';
import PlusMinusComponent from './PlusMinusComponent';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductComponent from "../components/ProductComponent";
import { useLocation } from "react-router-dom";
import { postData } from "../../services/FetchDjangoApiService";

export default function ProductDetailComponent(props) {

  const sldr = useRef()
  const dispatch = useDispatch()

  const theme = useTheme();
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));
  const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [index, setIndex] = useState(0)
  const [btn, setBtn] = useState('true')
  const [mouse, setMouse] = useState('false')
  const [proList, setProList] = useState([])


  const handleChange = (v, productlist) => {
    // alert(v)
console.log("zzzzzzzz",productlist)
    productlist['quntity'] = v
    if (v >= 1) {
      dispatch({ type: 'ADD_PRODUCT', payload: [productlist.id, productlist] })
    }
    else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [productlist.id] })
    }
    props.setPageRefresh(!props.pageRefresh)
  }


  try {
    var productlist = props?.data[index]
    console.log("DDDDDDDD", productlist)
    var items = productlist.picture.split(",")

  }
  catch (e) {
    var items = []
    var productlist = {}
  }


  const ShowAllPictures = () => {
    return items?.map((item) => {
      return (<div >
        <img src={`${serverURL}/static/${item}`} loading="lazy" style={{ width: 60, height: 80, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      </div>)
    })
  }
  const ShowPictures = () => {
    return items?.map((item) => {
      return (<div >
        <img src={`${serverURL}/static/${item}`} loading="lazy" style={{justifyContent:sm_matches?'space-evenly':md_matches?'space-between':'center'}} />
        <div style={{ width: 40, height: 40, borderRedius: '50%', background: '#FFFFEC', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', position: 'absolute', zIndex: 2, marginLeft: "60%", marginTop: '70%' }}>
          <FavoriteIcon /> </div>

      </div>)
    })
  }



  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  const handleNext = () => {
    sldr.current.slickNext()
  }


  const handlePrevious = () => {
    sldr.current.slickPrev()
  }

  const ShowProductDetail = () => {
    return (<div>
      <div style={{ color: '#2d2d2d', fontSize: '1.5vw', fontWeight: 'bolder', letterSpacing: 0.6 }}>
        {productlist?.product?.productname}</div>
      <div style={{ color: '#2d2d2d', fontSize: '1vw', fontWeight: 600, letterSpacing: 0.6 }}>{productlist?.subproductname}</div>


      <div style={{ width: 150, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'red', fontSize: 16, fontWeight: 700 }}>Now:</span>
        <span style={{ color: '#666', fontWeight: 'bold', marginTop: 12, fontSize: 16 }}>{productlist?.offerprice > 0 ? <div style={{ marginTop: '-10px' }}>

          <span style={{ marginLeft: 5 }}><s>&#8377;{productlist?.price}</s></span>
          <span style={{ color: '#000', marginLeft: 15 }}>&#8377;{productlist?.offerprice}</span></div> : <span>{productlist?.price}</span>}</span>

      </div>


      <div style={{
        background: '#cde2f5', width: '58%', height: '12%', marginTop: '12px', textAlign: 'center', alignContent: 'center'
      }}>
        <span style={{ marginLeft: 8, marginTop: '5px' }}><LocalOfferOutlinedIcon fontSize='samll' /></span> <span style={{ marginLeft: 6, marginRight: 5 }}>Sale:Extra20%of stected style Win Code:GOSALE</span>
      </div>

      < div style={{ marginTop: '12px', fontSize: 15, fontWeight: 700 }}>
        Colour: {productlist?.colour}
      </div>

      <div style={{ marginTop: '15px', fontSize: 15, fontWeight: 500 }}>
        <span>Size: {productlist?.size}</span>
        <span style={{ textDecoration: "underline", fontSize: 12, marginLeft: 70 }}>Find Your Fit Assistanst Size</span>
      </div>

      <div style={{ marginTop: '5px', width: '58%', }}>
        <FormControl fullWidth style={{ height: '40%' }} >
          <InputLabel id="size" style={{ fontSize: 14, fontFamily: "kanit", color: "'#2d2d2d'" }}>Please Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="size"
            value={items.size}
            label="size"
          // onChange={handleChange}
          >
            <MenuItem value={1}>XXS</MenuItem>
            <MenuItem value={2}>XS</MenuItem>
            <MenuItem value={3}>S</MenuItem>
            <MenuItem value={3}>M</MenuItem>
            <MenuItem value={3}>L</MenuItem>
            <MenuItem value={3}>XL</MenuItem>
            <MenuItem value={3}>XL+</MenuItem>
          </Select>
        </FormControl>

      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>

        <PlusMinusComponent value={0} onChange={(v) => handleChange(v, productlist)} />
        <div style={{ marginLeft:sm_matches?'120px':md_matches?'90px':'15px', width: 40, height: 40, borderRadius: '50%', background: '#E4E4D0', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {mouse ? <FavoriteIcon onMouseOver={() => setMouse(true)} onMouseLeave={() => setMouse(false)} style={{ position: 'absolute', zIndex: 3 }} /> : <FavoriteBorderIcon onMouseOver={() => setMouse(true)} onMouseLeave={() => setMouse(false)} style={{ position: 'absolute', zIndex: 3 }} />}
        </div>
      </div>

      <div style={{ fontSize: 11, width: '60%', height: 120, marginTop: '12px', borderWidth: 1, borderStyle: 'solid', color: '#2d2d2d', borderColor: '#eee' }}>
        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <div >< LocalShippingOutlinedIcon /></div>
          <div style={{ marginLeft: 10, }}>
            <div style={{ marginTop: '10px' }}>Free delivery of qualified order</div>
            <div style={{ marginTop: '10px', textDecoration: 'underline' }}>view your Delivery & Return Policy<ContentCopyRoundedIcon style={{ marginLeft: 1.5, fontSize: 11 }} /></div>
          </div>
        </div>

        <Divider component="li" />
        <div style={{ textDecoration: 'underline', textAlign: 'center', marginTop: '20px' }}>This Product Has Shipping Restirction</div>
      </div>

      <div style={{ marginTop: "10px",width:'60%',display:'flex',flexDirection:'column' }}>
       <Button variant="text" onClick={() => setBtn(false)} style={{ height: 30, color: '#254336', borderTopWidth: 1.5, borderRadius: 0, borderStyle: 'solid', fontWeight: 900, borderColor: '#eee', fontSize: 11 }}><span style={{textAlign:'left',width:'90%',marginTop: '8px' }}>Product Detail</span><span style={{ fontSize: '6', marginTop: '8px' }}>{btn ? <AddIcon /> : <RemoveIcon />}</span>
        </Button>
        <Button variant="text" onClick={() => setBtn(false)} style={{ height: 30, color: '#254336', borderTopWidth: 1.5, borderRadius: 0, borderStyle: 'solid', fontWeight: 900, borderColor: '#eee', fontSize: 11 }}><span style={{ textAlign:'left',width:'100%',marginTop: '8px' }}>Size & Fit</span><span style={{ fontSize: '6', marginTop: '8px' }}>{btn ? <AddIcon /> : <RemoveIcon />}</span>
        </Button>
        <Button variant="text" onClick={() => setBtn(false)} style={{ height: 30, color: '#254336', borderTopWidth: 1.5, borderRadius: 0, borderStyle: 'solid', fontWeight: 900, borderColor: '#eee', fontSize: 11 }}><span style={{textAlign:'left',width:'90%', marginTop: '8px' }}>Look After Me</span><span style={{  fontSize: '6', marginTop: '8px' }}>{btn ? <AddIcon /> : <RemoveIcon />}</span>
        </Button>
        <Button variant="text" onMouseLeave={() => setBtn(true)} onClick={() => setBtn(false)} style={{ height: 30, color: '#254336', borderTopWidth: 1.5, borderBottomWidth: 1.5, borderRadius: 0, borderStyle: 'solid', fontWeight: 900, borderColor: '#eee', fontSize: 11 }}><span style={{textAlign:'left',width:'90%', marginTop: '8px' }}>About Me</span><span style={{fontSize: '6', marginTop: '8px' }}>{btn ? <AddIcon /> : <RemoveIcon />}</span>
        </Button>
      </div>
      <div style={{ marginTop: '18px', textDecoration: 'underline', fontSize: 12 }}>Report a Ligal Concern<ContentCopyRoundedIcon style={{ marginLeft: 1.5, fontSize: 11, marginTop: '18px' }} /></div><div></div>
    </div>)
  }


  return (<div>
    <div style={{ height: 40, letterSpacing: 1.5, fontSize: 11, fontFamily: 'Josefin+Sans', alignContent: 'center', marginLeft: '100px' }}>Home<ArrowForwardIosIcon style={{ fontSize: 10 }} />Menu<ArrowForwardIosIcon style={{ fontSize: 10 }} />{productlist?.subCategory?.subcategoryname}<ArrowForwardIosIcon style={{ fontSize: 10 }} />{productlist?.product?.productname}<ArrowForwardIosIcon style={{ fontSize: 10 }} />{productlist?.description}</div>
    <div style={{ width: '100%', height: 'auto', marginTop: '10`px' }}>
      <Grid container spacing={2}>
        {sm_matches ? <></>  :
          <Grid item xs={3} sm={1} >
            {ShowAllPictures()}
          </Grid>}`

        <Grid item  xs={12} sm={10} md={5} >
          <div style={{ width: '100%' }}>
            <div>
              <div style={{ cursor: 'pointer', position: 'absolute', left:'100px', top: '450px', zIndex: 3 }}><ArrowBackIosNewIcon style={{ color: 'grey', fontSize: '6vw' }} onClick={handlePrevious} /></div>
              <Slider ref={sldr} {...settings}>
                {ShowPictures()}
              </Slider>
              <div style={{ cursor: 'pointer', position: 'absolute', right:"600px", top: '450px', zIndex: 3 }}><ArrowForwardIosIcon style={{ color: 'grey', fontSize: '6vw' }} onClick={handleNext} /></div>
            </div>
            
            {sm_matches ? <div style={{ justifyContent: 'space-around' }}>{ShowProductDetail()}</div> :
              md_matches ? <div >{ShowProductDetail()}</div> : <></>}
          </div>
        </Grid>

        {sm_matches ? <></> : md_matches ? <></> :
          <Grid item xs={4}>
            {ShowProductDetail()}
          </Grid>
        }
      </Grid>

    </div>

   
  </div>)
}
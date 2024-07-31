import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useState, useEffect } from 'react';
import { postData, getData, serverURL } from '../../services/FetchDjangoApiService';
import SearchBarComponent from './SearchBarComponent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import DrawerComponent from './DrawerComponent';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const theme = useTheme();
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));
  const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));
  var navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [subcategoryList, setSubCategoryList] = useState([])
  const [backgroundColor, setBackGroundColor] = useState('')
  const [brandList, setBrandList] = useState([])
  const [statusSubmenu, setSatusSubMenu] = useState(false)
  const [productList, setProductList] = useState([])

  var products = useSelector(state => state.product)
  var keys = Object.values(products)

  var users = useSelector(state => state.user)
  var userData = {}
  try {
    var userData = Object.values(users)[0]
    // alert(userData)
    console.log(userData)
  } catch (e) { }

  const handleGotoCartPage = () => {
    navigate('/addbag')
  }

  const handleLoginPage = () => {
    navigate('/usersignin ')
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  useEffect(function () {
    fetchSubCategory(3);
    fetchBrandList()
    fetchProductList()
  }, []);

  const fetchSubCategory = async (id) => {
    var result = await postData('user_subCat_list_by_mainCatId', { mainCategory: id });
    setSubCategoryList(result.data);
    setBackGroundColor(id)
  };

  const fetchBrandList = async (sid) => {
    var result = await postData('user_brand_list', { mainCategory: backgroundColor, subCategory: sid });
    setBrandList(result.data);
    console.log("bbbbb",result.data)
    console.log("IIII",sid)

  };

  const fetchProductList = async (sid) => {
    var result = await postData('product_list_by_subcat', { mainCategory: backgroundColor, subCategory: sid });
    setProductList(result.data);
    console.log(result.data)

  };


  const handleSubMenu = (item) => {
    // alert(item.sid)
    fetchBrandList(item.id)
    fetchProductList(item.id)
    setSatusSubMenu(true)
  }

  const ShowAllProduct = () => {
    return productList?.map((item) => {
      return (<div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        <span><img src={`${serverURL}${item?.producticon}`} style={{ width: 30, height: 30, borderRadius: 15 }} /></span>
        <span>{item?.productname}</span></div>)
    })
  }


  const ShowAllBrand = () => {
    return brandList?.map((item) => {
      return (<div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        <span><img src={`${serverURL}${item?.brandicon}`} style={{ width: 30, height: 30, borderRadius: 15 }} /></span>
        <span>{item?.brandname}</span></div>)
    })
  }

  const ShowSubMenu = (item) => {
    return (<div onMouseLeave={() => setSatusSubMenu(false)} style={{ padding: 25, width: "60%", height: 300, backgroundColor: '#ffff', position: 'absolute', Top: 100, zIndex: 2, left: 100 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{ fontWeight: 'bold', color: '#95a5a6', letterSpacing: 1 }}>SHOP BY PRODUCT
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column' }}>{ShowAllProduct()}</div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ fontWeight: 'bold', color: '#95a5a6', letterSpacing: 1 }}>SHOP BY BRAND
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column' }}>{ShowAllBrand()}</div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ fontWeight: 'bold', color: '#95a5a6', letterSpacing: 1 }}>SHOP BY CATEGORY
            <Divider />
          </div>
        </Grid>
      </Grid>
    </div>)

  }


  const ShowAllSubCategory = () => {
    return subcategoryList?.map((item) => {
      return (<div onMouseOver={() => handleSubMenu(item)} style={{ marginRight: 20 }}>{item.subcategoryname}</div>)
    })
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#2d2d2d" }} position="static">
        <Toolbar>
          {sm_matches ? <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton> : <div></div>}
          <Typography variant="h6" component="div" style={{ cursor: 'pointer', fontWeight: 525, fontFamily: 'Playfair+Display', flexGrow: 0, fontSize: 30 }}>
            SevenShades
          </Typography>
          {sm_matches ? <></> :
            <div style={{ width: 200, marginTop: 22, marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
              <Divider orientation="vertical" style={{ marginLeft: 5, display: 'flex', alignItems: 'center', border: '0.5px solid', borderColor: 'black', borderRadius: 1, }} flexItem />
              <Button
                color="inherit"
                style={{ fontFamily: 'Roboto', fontSize: 17, background: backgroundColor == 3 ? "#6c757d" : "#2d2d2d", borderRadius: 0 }}
                onMouseOver={() => fetchSubCategory(3)}>MEN</Button>
              <Divider orientation="vertical" style={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: '#0000', borderRadius: 1, }} flexItem />
              <Button
                color="inherit"
                style={{ fontFamily: 'Roboto', fontSize: 17, background: backgroundColor == 4 ? "#6c757d" : "#2d2d2d", borderRadius: 0 }}
                onMouseOver={() => fetchSubCategory(4)}>WOMEN</Button>
              <Divider orientation="vertical" style={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'black', borderRadius: 1, }} flexItem />
            </div>}

          {md_matches ? <div></div> : <SearchBarComponent />}

          <div style={{ marginLeft: 120, display: 'flex', width: 100, height: 30, alignItem: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <PersonOutlineOutlinedIcon onClick={handleLoginPage} />
              <div style={{ color: '#fff', fontSize: '0.7vw' }}>{userData?.firstname}</div>
            </div>
            <Badge badgeContent={keys.length} color="primary">
              <ShoppingBagOutlinedIcon onClick={handleGotoCartPage} />
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
      {md_matches ? <div></div> :
        <AppBar style={{ background: "#6c757d" }} position='static'>
          <Toolbar>
            {ShowAllSubCategory()}
          </Toolbar>
        </AppBar>}
      <DrawerComponent open={open} setOpen={setOpen} />
      {statusSubmenu ? ShowSubMenu() : <></>}
    </Box>
  );
}
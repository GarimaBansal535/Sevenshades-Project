import MaterialTable from "@material-table/core";
import { useStyles } from "./ProductDetailCss";
import TitleComponent from "../components/admin/TitleComponent";
import { useEffect, useState } from "react";
import { getData, serverURL,postData } from "../../services/FetchDjangoApiService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Select, FormControl, InputLabel, TextField, Avatar, Button, MenuItem } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"


export default function DisplayProductDetail(){
    var classes=useStyles()
    var navigate=useNavigate()
    const[productDetailList,setProductDetailList]=useState([])
    const[id,setId]=useState("")
    const[open,setOpen]=useState(false)
    const[tempIcon,setTempIcon]=useState('')
    const[btnStatus,setBtnStatus]=useState(true)
    //////////////////////////////////////////////////////////////////////////

    const [mainCategoryId, setMainCategoryId] = useState('')
const [subCategoryId, setSubCategoryId] = useState('')
const [productId,setProductId]=useState('')
const [brandId, setBrandId] = useState('')
const [subProductName, setSubProductName] = useState('')
const [description, setDescription] = useState('')
const [quntity, setQuntity] = useState([])
const [price,setPrice] = useState('')
const [offerPrice, setOfferPrice] = useState('')
const [offerType, setOfferType] = useState('')
const [picture, setPicture] = useState({ file:[], bytes:[] })
const [formError, setFormError] = useState(false)
const [mainCategoryList, setMainCategoryList] = useState([])
const [subCategoryList, setSubCategoryList] = useState([])
const [brandList, setBrandList] = useState([])
const [productList, setProductList] = useState([])

const handleChange = (event) => {
    var files=Object.values(event.target.files)
    if(files.length>=4 && files.length<=7)
    setPicture({file:files,bytes:event.target.files})
    else 
    alert('Pls Input Min 4 and Max 7 Images')
   
}
const showImages=()=>{
    return picture?.file?.map((item)=>{
       return  <span><img src={URL.createObjectURL(item)} style={{width:40,height:40,borderRadius:10,marginRight:3}}/></span>
       
    })
}
const fetchAllCB = async () => {
    var result = await getData('maincategory_list')
    setMainCategoryList(result.data)

   
}

const fillMainCategory = () => {
    return mainCategoryList.map((item) => {
        return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
    })
}

const handleFetchSubCategory=(event)=>{
    setMainCategoryId(event.target.value)
    fetchSubCategory(event.target.value)
}


const fetchSubCategory = async (mid) => {
   
    var result = await postData('subCat_list_by_MainCatId',{mainCategory:mid})
    // alert(JSON.stringify(result.data))
    setSubCategoryList(result.data)
}

const fillSubCategory = () => {
    return subCategoryList.map((item) => {
        return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
    })
}

const handlefecthAllProduct=(event)=>{
    setSubCategoryId(event.target.value)
    fetchAllProduct(event.target.value)

}

const fetchAllProduct=async(sid)=>{
    var result = await postData('p_list_by_subcat',{subCategory:sid})
    alert(JSON.stringify(result.data))
    setProductList(result.data)

}

const fillProduct = () => {
    return productList.map((item) => {
        return <MenuItem value={item.id}>{item.productname}</MenuItem>
    })
}

const handleFetchAllBrand=(event)=>{
    setProductId(event.target.value)
    fetchAllBrand(event.target.value)

}



const fetchAllBrand=async(pid)=>{
    var result = await postData('brand_List_by_P',{product:pid})
    alert(JSON.stringify(result.data))
    setBrandList(result.data)

}

const fillBrand = () => {
    return brandList.map((item) => {
        return <MenuItem value={item.brand.id}>{item.brand.brandname}</MenuItem>
    })
}
const handleCancel=()=>{
    setPicture({file:tempIcon,bytes:""})
    setBtnStatus(true)
}

const handleClose=()=>{
    setOpen(false)
  }
  const handleEditData= async () => {
    var body={id:id,mainCategory:mainCategoryId,subCategory:subCategoryId,brand:brandId
              ,subproductname:subProductName,description:description,product:productId,quntity:quntity,offertype:offerType,offerprice:offerPrice}
     var result = await postData('editproductdetail_data', body)
     if(result.status){
        Swal.fire({
            title: "Seven Shades",
            text: result.message,
            icon: "success"
        });
     }
     else{
        Swal.fire({
            title: "Seven Shades",
            text: result.message,
            icon: "error"
        });
     }
    }

    const handleEditIcon=async()=>{
        
        var formData=new FormData()
        formData.append('id',id)
        formData.append('picture',picture.bytes)
        var result=await postData('editproductdetail_icon',formData)
        if(result.status){
            Swal.fire({
                title: 'Seven Shades',
                text: result.message,
                icon: 'success',
              });
        }
        
        
        else{
            Swal.fire({
                title: 'Seven Shades',
                text: result.message,
                icon: 'error',
              });
    
        }
    
    }
      

    function ProductDetailDialog(){
        return(
            <Dialog open={open}>
                <DialogTitle>
                    <TitleComponent title="Update ProductDetail" listicon=""/>
                </DialogTitle>
                <DialogContent>
                    <div>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TitleComponent title="Product" listicon='list.png' />
                    </Grid>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>MainCategory</InputLabel>
                        <Select value={mainCategoryId}
                               label='Main Category'
                               onChange={handleFetchSubCategory}
                              >
                            <MenuItem value='Select MainCategory'>Select MainCategory</MenuItem>
                            {fillMainCategory()}
                        </Select>
                       
                    </FormControl>
                </Grid>
    
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>SubCategory</InputLabel>
                        <Select value={subCategoryId} 
                                label='Sub Category'
                                onChange={handlefecthAllProduct}
                                 >
                            <MenuItem value='Select SubCategory'>Select SubCategory</MenuItem>
                            {fillSubCategory()}
                        </Select>
                       
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Product</InputLabel>
                        <Select value={productId} 
                                label='Product'
                                onChange={handleFetchAllBrand}
                                 >
                            <MenuItem value='Select Product'>Select Product</MenuItem>
                             {fillProduct()} 
                        </Select>
                        
                    </FormControl>
                </Grid>
    
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select value={brandId} 
                                label='Brand'
                                onChange={(event)=>setBrandId(event.target.value)}
                                >
                            <MenuItem value='Select Product'>Select Brand</MenuItem>
                             {fillBrand()} 
                        </Select>
                        
                    </FormControl>
                </Grid>            
    
                <Grid item xs={12}>
                    <TextField fullWidth 
                    label='SubProductName' 
                    value={subProductName}
                    onChange={(event) => setSubProductName(event.target.value)} 
                   
                
                    />
                </Grid>
    
                
    
                <Grid item xs={12}>
                    <TextField fullWidth 
                    label='Desciription' 
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    
                 />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth 
                    label='Quntity' 
                    value={quntity}
                    onChange={(event) => setQuntity(event.target.value)}
                  
                 />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth 
                    label='Price' 
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    />
                  
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth 
                    label='Offer Price' 
                    value={offerPrice}
                    onChange={(event) => setOfferPrice(event.target.value)}
                    />
                    
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth 
                    label='Offer Type' 
                    value={offerType}
                    onChange={(event) => setOfferType(event.target.value)}
                    
                 />
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column' }}>
                {btnStatus?<div><Button variant="contained" fullWidth component='label' startIcon={<CloudUploadIcon />}>
                        Upload icon
                        <input input type='file' hidden accept="images/*" onChange={handleChange} />
                    </Button></div>:(
           <div style={{ display: 'flex', width: 160, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleEditIcon}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </div>)}
                   
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                   {showImages}
                </Grid >
                </Grid>
                    </div>
                    </DialogContent>
                <DialogActions>
                    <Button variant="contained"onClick={handleEditData} >Edit Data</Button>
                    <Button variant="contained" onClick={handleClose}>Close</Button>
                </DialogActions>
    
            </Dialog>
        )
    }  
    
    

    ///////////////////////////////////////////////////////////////////////////

    useEffect(function(){
        fetchAllProductDetail()
        fetchAllCB()
    },[])
    
    
      const fetchAllProductDetail=async()=>{
        var result=await getData('productdetail_list')
        setProductDetailList(result.data)
      }
    

       
    const handleDeleteData=async(rowData)=>{
        Swal.fire({
          title: "Do you want to Delete Product?",
          showDenyButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Don't Delete`
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            var body={id:rowData.id}
            var result=await postData('deleteproductdetaildata',body)
            if(result.status)
            {
              Swal.fire("Deleted!", "", "success");
            }
            fetchAllProductDetail() 
            
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }    

      const handleOpenDailog=(rowData)=>{
        setId(rowData.id)
        setSubProductName(rowData.subProductName)
        setPicture({ file: `${serverURL}${rowData.picture}`, bytes: '' })
        setDescription(rowData.description)
        setMainCategoryId(rowData.mainCategory.id)
        setSubCategoryId(rowData.subCategory.id)
        setBrandId(rowData.brand.id)
        setTempIcon(`${serverURL}${rowData.picture}`)
        setOpen(true)
        setProductId(rowData.product.id)
        setQuntity(rowData.qty)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerPrice)
        setOfferType(rowData.offerType)
        setPicture({file:`${serverURL}${rowData.picture}`,bytes:''})
        setTempIcon(`${serverURL}${rowData.picture}`)
        setOpen(true)
      }


    function listAllProductDetail() {
        return (
          <MaterialTable
            title={<TitleComponent width={160} title={'List Product Detail'} listicon=''/>}
            columns={[
          
              { title: ' Ids', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}>
                       <div>{rowData.mainCategory.id}/{rowData.mainCategory.maincategoryname}</div>
                       <div>{rowData.subCategory.id}/{rowData.subCategory.subcategoryname}</div> 
                       <div>{rowData.brand.id}/{rowData.brand.brandname}</div></div> },

              { title: 'Product Id', render:(rowData)=><div style={{display:'flex',flexDirection:'column',width:150}}>
               <div>{rowData.product.id}/{rowData.product.productname}</div>
               <div>{rowData.id}/{rowData.subproductname}</div>
               </div> },
              
              { title: 'Product Sub Description', field: 'description' },
              { title: 'Quantity', field: 'quntity' },

              { title: 'Price', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}>
                <div>{rowData.price}</div>
                <div>{rowData.offertype}</div>
                <div>{rowData.offerprice}</div>
                </div> },

              { title: 'Icon',render:(row)=><div style={{width:110,display:'flex',flexWrap:'wrap'}}>
                {row?.picture?.split(',').map((item)=><img src={` ${serverURL}/static/${item}`} style={{margin:2,width:30,height:30,borderRadius:5}}/>)}</div>}
               ]}
            data={productDetailList}  //fetch all products     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpenDailog(rowData)
              },
              
              {
                icon: 'delete',
                tooltip: 'Remove  Product',
                 onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New ProductDetaul',
                isFreeAction:true,
                onClick: (event, rowData) => navigate('/admindashboard/productdetail')
              }
              
            ]}
          />
        )
      }


    return(<div className={classes.display_root}>
        <div className={classes.display_box}>
            {listAllProductDetail()}
        </div>
        {ProductDetailDialog()}
    </div>)
}
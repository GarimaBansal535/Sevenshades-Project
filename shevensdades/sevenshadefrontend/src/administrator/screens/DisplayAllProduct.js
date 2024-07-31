import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoryCss";
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

export default function DisplayAllProduct(){
  var classes=useStyles()
  var navigate=useNavigate()
  const[productList,setProductList]=useState([])
  const[id,setId]=useState("")
  const[open,setOpen]=useState(false)
  const[tempIcon,setTempIcon]=useState('')
  const[btnStatus,setBtnStatus]=useState(true)

  //////////////////////////UPDATE PRODUCT/////////////////
  const [mainCategoryId, setMainCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [productIcon, setProductIcon] = useState({ file: 'icon.png', bytes: "" })
  const [mainCategoryList, setMainCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])

  const handleChange = (event) => {
      setProductIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      setBtnStatus(false)
  }

  useEffect(function () {
      fetchAllCategory()
  }, [])

  const fetchAllCategory = async () => {
      var result = await getData('maincategory_list')
      setMainCategoryList(result.data)
  }

  const fillMainCategory = () => {
      return mainCategoryList.map((item) => {
          return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
      })
  }


  useEffect(function () {
      fetchSubCategory()
  }, [])

  const fetchSubCategory = async () => {

      var result = await getData('subcategory_list')
      setSubCategoryList(result.data)
  }

  const fillSubCategory = () => {
      return subCategoryList.map((item) => {
          return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
      })
  }


  useEffect(function () {
      fetchAllBrand()
  }, [])

  const fetchAllBrand = async () => {

      var result = await getData('brand_list')
      setBrandList(result.data)
  }

  const fillBrand = () => {
      return brandList.map((item) => {
          return <MenuItem value={item.id}>{item.brandname}</MenuItem>
      })
  }

 
  ////////////////////////////////////////////////////////

useEffect(function(){
    fetchAllProduct()
},[])


  const fetchAllProduct=async()=>{
    var result=await getData('product_list')
    setProductList(result.data)
  }

const handleOpenDailog=(rowData)=>{
    setId(rowData.id)
    setProductName(rowData.productname)
    setProductIcon({ file: `${serverURL}${rowData.producticon}`, bytes: '' })
    setDescription(rowData.description)
    setMainCategoryId(rowData.mainCategory.id)
    setSubCategoryId(rowData.subCategory.id)
    setBrandId(rowData.brand.id)
    setTempIcon(`${serverURL}${rowData.producticon}`)
    setOpen(true)

}

const handleEditData = async () => {
    var body={id:id,mainCategory:mainCategoryId,subCategory:subCategoryId,brand:brandId
              ,productname:productName,description:description}
     var result = await postData('editproduct_data', body)
     if (result.status) {
         Swal.fire({
             title: "Seven Shades",
             text: result.message,
             icon: "success"
         });
     }
     else {
         Swal.fire({
             title: "Seven Shades",
             text: result.message,
             icon: "error"
         });
     }
 }

function ProductDialog(){
    return(
        <Dialog open={open}>
            <DialogTitle>
                <TitleComponent title="Update Product" listicon=""/>
            </DialogTitle>
            <DialogContent>
                <div>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title="Product" listicon='list.png' />
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>MainCategory</InputLabel>
                        <Select value={mainCategoryId} label='Main Category'
                            onChange={(event) => setMainCategoryId(event.target.value)} >
                            <MenuItem value='Select MainCategory'>Select MainCategory</MenuItem>
                            {fillMainCategory()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>SubCategory</InputLabel>
                        <Select value={subCategoryId} label='Sub Category'
                            onChange={(event) => setSubCategoryId(event.target.value)}>
                            <MenuItem value='Select SubCategory'>Select SubCategory</MenuItem>
                            {fillSubCategory()}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select value={brandId} label='Brand'
                            onChange={(event) => setBrandId(event.target.value)} >
                            <MenuItem value='Select Brand'>Select Brand</MenuItem>
                            {fillBrand()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label='Product Name' value={productName}
                        onChange={(event) => setProductName(event.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth label='Desciription' value={description}
                        onChange={(event) => setDescription(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column' }}>
                   {btnStatus?<div> <Button variant="contained" fullWidth component='label' startIcon={<CloudUploadIcon />}>
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
                    <Avatar
                        alt='Icon'
                        variant="rounded"
                        src={productIcon.file}
                        sx={{ width: 70, height: 70 }}
                    />
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

const handleClose=()=>{
    setOpen(false)
}

const handleEditIcon=async()=>{
    
    var formData=new FormData
    formData.append('id',id)
    formData.append('producticon',productIcon.bytes)
    var result=await postData('editproduct_icon',formData)
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
const handleCancel=()=>{
    setProductIcon({file:tempIcon,bytes:""})
    setBtnStatus(true)
}

const handleDelete=async(rowData)=>{
    Swal.fire({
        title: "Do you want to Delete Product Data?",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var body={id:rowData.id}
            var result=await postData('delete_product',body)
            if(result.status)
            {
             Swal.fire("Delete!", "", "success");
            }
            fetchAllProduct()
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

}


  function listAllProduct(){
   return(
     <MaterialTable
      title=<TitleComponent title="Product List" listicon=''/>
      columns={[
        { title: 'Id', field: 'id' },
        { title: 'ProductName', field: 'productname' },
        { title: 'Description', field: 'description' },
        { title: 'MainCategoryId', render:(rowData)=><div><div>{rowData.mainCategory.id}</div><div>{rowData.mainCategory.maincategoryname}</div></div>},
        { title: 'SubCategoryId', render:(rowData)=><div><div>{rowData.subCategory.id}</div><div>{rowData.subCategory.subcategoryname}</div></div> },
        { title: 'BrandId', render:(rowData)=><div><div>{rowData.brand.id}</div><div>{rowData.brand.brandname}</div></div>},
        { title: 'ProductIcon', render:(rowData)=><img src={`${serverURL}${rowData.producticon}`} style={{ width: 60, height:60,borderRadius:6}}/> },
        
      ]}
      data={productList}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit User',
          onClick: (event, rowData) => handleOpenDailog(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => handleDelete(rowData)
        },
        {
            icon: 'add',
            tooltip: 'Add New Product',
            isFreeAction:true,
            onClick: (event, rowData) => navigate('/admindashboard/product')
          }
      ]}
    />
  )
   }

    return(<div className={classes.display_root}>
        <div className={classes.display_box}>
            {listAllProduct()}
        </div>
        {ProductDialog()}
    </div>)
}
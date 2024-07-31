import { Grid, Select, FormControl, InputLabel, 
    TextField, Avatar, Button, MenuItem,FormHelperText } from "@mui/material";
import { useStyles } from "./ProductDetailCss";
import TitleComponent from "../components/admin/TitleComponent";
import { useState, useEffect } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getData, postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"



export default function Product(props) {
    var navigate=useNavigate()
const [mainCategoryId, setMainCategoryId] = useState('')
const [subCategoryId, setSubCategoryId] = useState('')
const [productId,setProductId]=useState('')
const [brandId, setBrandId] = useState('')
const [subProductName, setSubProductName] = useState('')
const [description, setDescription] = useState('')
const [colour,setColour]=useState('')
const [size,setSize]=useState('')
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
    handleError(false,"picture")

}
const showImages=()=>{
    return picture?.file?.map((item)=>{
       return  <span><img src={URL.createObjectURL(item)} style={{width:40,height:40,borderRadius:10,marginRight:3}}/></span>
       
    })
}

useEffect(function () {
    fetchAllCB()
}, [])

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
const handleError=(errormassage,label)=>{
   setFormError((prev)=>({...prev,[label]:errormassage}))
   
}

const handleReset = () => {
    setMainCategoryId('')
    setSubCategoryId('')
    setBrandId('')
    setSubProductName('')
    setDescription('')
    setColour('')
    setSize("")
    setPicture([])
}

const handleSubmit = async () => {
    var err=false
    if(subProductName.length==0)
    {
        handleError('please input product Name','productname')
        err=true
    }
    if(description.length==0)
    {
        handleError('please input description','ddescription')
        err=true
    }
    if(picture.length==0)
    {
        handleError('please input product Icon','producticon')
        err=true
    }
    if(mainCategoryId.length==0)
    {
        handleError('please input Main category','maincategoryid')
        err=true
    }
    if(subCategoryId.length==0)
    {
        handleError('please input sub category','subcategoryid')
        err=true
    }
    if(brandId.length==0)
    {
        handleError('please input brand','brandid')
        err=true
    }
    if(productId.length==0)
    {
        handleError('please input product','productid')
        err=true
    }
    if(colour.length==0)
    {
        handleError('please input Colour','ccolour')
        err=true
    }
    if(size.length==0)
    {
        handleError('please input Size','ssize')
        err=true
    }
    if(quntity.length==0)
    {
        handleError('please input Quntity','qquntity')
        err=true
    }
    if(price.length==0)
    {
        handleError('please input price','pprice')
        err=true
    }
    if(offerPrice.length==0)
    {
        handleError('please input offerprice','offerprice')
        err=true
    }
    if(offerType.length==0)
    {
        handleError('please input offer type','offertype')
        err=true
    }
    if(err==false)
    {
    var formData = new FormData()
    formData.append('mainCategory', mainCategoryId)
    formData.append('subCategory', subCategoryId)
    formData.append('brand', brandId)
    formData.append('product', productId)
    formData.append('subproduct', subProductName)
    formData.append('description', description)
    formData.append('colour', colour)
    formData.append('size', size)
    formData.append('quntity', quntity)
    formData.append('price', price)
    formData.append('offerprice', offerPrice)
    formData.append('offertype', offerType)
    picture?.file?.map((item,i)=>{
        formData.append('icon', item)
    })
    

    var result = await postData('p_submit', formData)
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
}


var classes = useStyles()
return (<div className={classes.root}>
    <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title="Product" listicon={listimage} link='/admindashboard/displayproductdetail'/>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>MainCategory</InputLabel>
                    <Select value={mainCategoryId}
                           label='Main Category'
                           onChange={handleFetchSubCategory}
                           error={formError.maincategoryid}
                           onFocus={()=>handleError(false,'maincategoryid')} >
                        <MenuItem value='Select MainCategory'>Select MainCategory</MenuItem>
                        {fillMainCategory()}
                    </Select>
                    <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.maincategoryid}</helperText>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>SubCategory</InputLabel>
                    <Select value={subCategoryId} 
                            label='Sub Category'
                            onChange={handlefecthAllProduct}
                            error={formError.subcategoryid}
                            onFocus={()=>handleError(false,'subcategory')} >
                        <MenuItem value='Select SubCategory'>Select SubCategory</MenuItem>
                        {fillSubCategory()}
                    </Select>
                    <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.subcategoryid}</helperText>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select value={productId} 
                            label='Product'
                            onChange={handleFetchAllBrand}
                            error={formError.productid}
                            onFocus={()=>handleError(false,'pruductid')} >
                        <MenuItem value='Select Product'>Select Product</MenuItem>
                         {fillProduct()} 
                    </Select>
                    <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.subcategoryid}</helperText>
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select value={brandId} 
                            label='Brand'
                            onChange={(event)=>setBrandId(event.target.value)}
                            error={formError.brandid}
                            onFocus={()=>handleError(false,'brandid')} >
                        <MenuItem value='Select Product'>Select Brand</MenuItem>
                         {fillBrand()} 
                    </Select>
                    <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.brandid}</helperText>
                </FormControl>
            </Grid>            

            <Grid item xs={12}>
                <TextField fullWidth 
                label='SubProductName' 
                value={subProductName}
                onChange={(event) => setSubProductName(event.target.value)} 
                error={formError.subproductname}
                onFocus={()=>handleError(false,'subproductname')}
                helperText={formError.subproductname} 
            
                />
            </Grid>

            

            <Grid item xs={12}>
                <TextField fullWidth 
                label='Desciription' 
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                error={formError.ddescription}
                onFocus={()=>handleError(false,'ddescription')}
                helperText={formError.ddescription} 
             />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth 
                label='colour' 
                value={colour}
                onChange={(event) => setColour(event.target.value)}
                error={formError.ccolour}
                onFocus={()=>handleError(false,'ccolour')}
                helperText={formError.ccolour} 
             />
             </Grid>
             <Grid item xs={6}>
                <TextField fullWidth 
                label='Size' 
                value={size}
                onChange={(event) =>setSize(event.target.value)}
                error={formError.ssize}
                onFocus={()=>handleError(false,'ssize')}
                helperText={formError.ssize} 
             />
             </Grid>
            <Grid item xs={6}>
                <TextField fullWidth 
                label='Quntity' 
                value={quntity}
                onChange={(event) => setQuntity(event.target.value)}
                error={formError.qquntity}
                onFocus={()=>handleError(false,'qquntity')}
                helperText={formError.qquntity} 
             />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth 
                label='Price' 
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                error={formError.pprice}
                onFocus={()=>handleError(false,'pprice')}
                helperText={formError.pprice} 
             />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth 
                label='Offer Price' 
                value={offerPrice}
                onChange={(event) => setOfferPrice(event.target.value)}
                error={formError.offerprice}
                onFocus={()=>handleError(false,'offerprice')}
                helperText={formError.offerprice} 
             />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth 
                label='Offer Type' 
                value={offerType}
                onChange={(event) => setOfferType(event.target.value)}
                error={formError.offertype}
                onFocus={()=>handleError(false,'offertype')}
                helperText={formError.offertype} 
             />
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column' }}>
                <Button variant="contained" fullWidth component='label' startIcon={<CloudUploadIcon />}>
                    Upload icon
                    <input input type='file' hidden accept="image/*" onChange={handleChange} multiple />
                </Button>
                {formError.picture ?<FormHelperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.picture}</FormHelperText> : <></>}
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                {showImages()}
            </Grid >

            <Grid item xs={6}>
                <Button variant="contained" onClick={handleSubmit} fullWidth>Submit</Button>
            </Grid>


            <Grid item xs={6}>
                <Button variant="contained" onClick={handleReset} fullWidth>Reset</Button>
            </Grid>


        </Grid>
    </div>
</div>)
}
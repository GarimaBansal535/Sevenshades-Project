import { Grid, Select, FormControl, InputLabel, 
        TextField, Avatar, Button, MenuItem,FormHelperText } from "@mui/material";
import { useStyles } from "./CategoryCss";
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
    const [brandId, setBrandId] = useState('')
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [productIcon, setProductIcon] = useState({ file: 'icon.png', bytes: "" })
    const [formError, setFormError] = useState(false)
    const [mainCategoryList, setMainCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])

    const handleChange = (event) => {
        setProductIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    useEffect(function () {
        fetchAllCB()
    }, [])

    const fetchAllCB = async () => {
        var result = await getData('maincategory_list')
        setMainCategoryList(result.data)

        var result = await getData('brand_list')
        setBrandList(result.data)
   
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
        alert(JSON.stringify(result.data))
        setSubCategoryList(result.data)
    }

    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
        })
    }


   

    const fillBrand = () => {
        return brandList.map((item) => {
            return <MenuItem value={item.id}>{item.brandname}</MenuItem>
        })
    }

    const handleError=(errormassage,label)=>{
       setFormError((prev)=>({...prev,[label]:errormassage}))
       
    }

    const handleReset = () => {
        setMainCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProductName('')
        setDescription('')
        setProductIcon({ file: 'icon.png', bytes: '' })
    }

    const handleSubmit = async () => {
        var err=false
        if(productName.length==0)
        {
            handleError('please input product Name','productname')
            err=true
        }
        if(description.length==0)
        {
            handleError('please input description','ddescription')
            err=true
        }
        if(productIcon.length==0)
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
        if(err==false)
        {
        var formData = new FormData()
        formData.append('mainCategory', mainCategoryId)
        formData.append('subCategory', subCategoryId)
        formData.append('brand', brandId)
        formData.append('productname', productName)
        formData.append('description', description)
        formData.append('producticon', productIcon.bytes)
        console.log(productIcon)
        var result = await postData('product_submit', formData)
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
                    <TitleComponent title="Product" listicon={listimage} link="/admindashboard/displayallproduct" />
                </Grid>

                <Grid item xs={6}>
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

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>SubCategory</InputLabel>
                        <Select value={subCategoryId} 
                                label='Sub Category'
                                onChange={(event) => setSubCategoryId(event.target.value)}
                                error={formError.subcategoryid}
                                onFocus={()=>handleError(false,'subcategory')} >
                            <MenuItem value='Select SubCategory'>Select SubCategory</MenuItem>
                            {fillSubCategory()}
                        </Select>
                        <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.subcategoryid}</helperText>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select value={brandId} label='Brand'
                            onChange={(event) => setBrandId(event.target.value)}
                            error={formError.brandid}
                            onFocus={()=>handleError(false,'brandid')} >
                            <MenuItem value='Select Brand'>Select Brand</MenuItem>
                            {fillBrand()}
                        </Select>
                        <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.brandid}</helperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth 
                    label='Product Name' 
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)} 
                    error={formError.productname}
                    onFocus={()=>handleError(false,'productname')}
                    helperText={formError.productname} 
                
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
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column' }}>
                    <Button variant="contained" fullWidth component='label' startIcon={<CloudUploadIcon />}>
                        Upload icon
                        <input input type='file' hidden accept="images/*" onChange={handleChange} />
                    </Button>
                    {formError.producticon ?<FormHelperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.producticon}</FormHelperText> : <></>}
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <Avatar
                        alt='Icon'
                        variant="rounded"
                        src={productIcon.file}
                        sx={{ width: 70, height: 70 }}
                    />
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
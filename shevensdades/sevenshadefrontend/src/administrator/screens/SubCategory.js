import {Select,InputLabel,FormControl, Button, Grid, TextField, FormHelperText, MenuItem } from "@mui/material";
import { useStyles } from "./BannerCss";
import TitleComponent from "../components/admin/TitleComponent";
import { useState ,useEffect} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import { getData, postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"




export default function SubCategory(props) {
    var classes = useStyles()
    var navigate=useNavigate()
    const [mainCategoryId, setMainCategoryId] = useState("")
    const [subCategoryName, setSubCategoryName] = useState("")
    const [subCategoryIcon, setSubCategoryIcon] = useState({ file: "icon.png", bytes: "" })
    const [formError, setFormError] = useState({ icon: false })
    const [mainCategoryList,setMainCategoryList]=useState([])

    useEffect(function(){
     fetchAllCategory()
    },[])

    const fetchAllCategory=async()=>{
        var result= await getData('maincategory_list')
        setMainCategoryList(result.data) 
    }

    const fillMainCategory=()=>{
        return mainCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
        })
    }

    const handleClick = async () => {
        var err = false
        if (mainCategoryId.length == 0) {
            handleError("pls input Main Category Id", "maincategoryid")
            err = true
        }

        if (subCategoryName.length == 0) {
            handleError("pls input Sub Category Name", "subcategoryname")
            err = true
        }

        if (subCategoryIcon.bytes.length == 0) {
            handleError("Pls select icon", "subcategoryicon")
            err = true
        }
        if (err == false) {
            var formData = new FormData()
            formData.append("mainCategory", mainCategoryId)
            formData.append("subcategoryname", subCategoryName)
            formData.append('subcategoryicon', subCategoryIcon.bytes)
            var result = await postData('subcategory_submit', formData)
            console.log(result.message)
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

    const handleError = (errormassage, label) => {
        setFormError((prev) => ({ ...prev, [label]: errormassage }))

    }

    const handleReset=()=>{
        setMainCategoryId('')
        setSubCategoryName('')
        setSubCategoryIcon({file:'icon.png',bytes:''})
       }  


    const handleChange = (event) => {
        setSubCategoryIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    return (<div className={classes.root} >
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title={"SubCategory"} listicon={listimage} link='/admindashboard/displaysubcategory' />
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>MainCategoryId</InputLabel>
                        <Select value={mainCategoryId} label="MainCategoryId" 
                        onFocus={()=>handleError(false,'maincategoryid')} 
                        onChange={(event)=>setMainCategoryId(event.target.value)} 
                        error={formError.maincategoryid}>
                           <MenuItem value="Select Category">Select Category</MenuItem>
                              {fillMainCategory()}
                        </Select>
                    <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.maincategoryid}</helperText>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <TextField label='SubCategoryName' value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)}
                        onFocus={() => handleError(false, 'subcategoryname')} error={formError.subcategoryname}
                        helperText={formError.subcategoryname}
                    />
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column' }}>
                    <Button variant="contained" component='label' startIcon={<CloudUploadIcon />} >
                        Upload Icon
                        <input type='file' hidden accept="images/*" onChange={handleChange} />
                    </Button>
                    {formError.subcategoryicon ? <FormHelperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.subcategoryicon}</FormHelperText> : <></>}
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <Avatar
                        alt='Icon'
                        variant="rounded"
                        src={subCategoryIcon.file}
                        sx={{ width: 70, height: 70 }}
                    />
                </Grid>
                <Grid item xs={6}>
                <Button onClick={handleClick} fullWidth variant="contained">Submit</Button>
            </Grid> 
            <Grid item xs={6}>
                <Button  onClick={handleReset} fullWidth variant="contained">Reset</Button>
            </Grid> 
               
            </Grid>

        </div>

    </div>)
}
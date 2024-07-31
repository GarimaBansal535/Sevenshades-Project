import { Button, Grid, TextField ,Avatar, Icon,FormHelperText} from "@mui/material";
import { useState } from "react";
import {useStyles } from "./BannerCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import listimage from "../../images/list.png"
import iconimage from "../../images/icon.png"
import { useNavigate } from 'react-router-dom';


export default function Category(props)
{var classes=useStyles()
    var navigate=useNavigate()
    const [mainCategoryName,setMainCategoryName]=useState('')
    const [icon,setIcon]=useState({file:'icon.png',bytes:''})
    const [formError,setFormError]=useState({icon:false})

     const handleReset=()=>{
            setMainCategoryName('')
            setIcon({file:'iconimage',bytes:''})
           }   

    const handleChange=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        
    }
    const handleError=(errormassage,label)=>{
        setFormError((prev)=>({...prev,[label]:errormassage}))
        // handleError(false,"icon")
    }

    const handleClick=async()=>{
        var err=false
         if(mainCategoryName.length==0)
         {
            handleError("Pls input main category","maincategoryname")
            err=true
        }
        if(icon.bytes.length==0)
         {
            handleError("Pls select icon","icon")
            err=true
        }
         if(err==false)
         {
          var formData= new FormData()
          formData.append('maincategoryname',mainCategoryName)
          formData.append('icon',icon.bytes)
          var result=await postData("maincategory_submit",formData)
          console.log(result.message)
          if(result.status)
          {
          Swal.fire({
             title: "Seven Shades",
             text: result.message,
             icon: "success"
            });
         }
         else
         {
            Swal.fire({
                title: "Seven Shades",
                text: result.message,
                icon: "error"
               });
         }
    }
}

    return(<div className={classes.root}>
           <div className={classes.box}>
           <Grid container spacing={2}>  
           <Grid item xs={12}>
           <TitleComponent title={'Main Category'} listicon={listimage} link="/admindashboard/displayallcategory" />
           </Grid>
            <Grid item xs={12}>
                <TextField 
                onFocus={()=>handleError(false,"maincategoryname")}
                error={formError.maincategoryname}
                helperText={formError.maincategoryname} 

                onChange={(event)=>setMainCategoryName(event.target.value)}
                fullWidth 
                label='Main Category Name'
                value={mainCategoryName} />
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                
                <Button onClick={()=>handleError(false,'icon')} variant="contained" component='label' startIcon={<CloudUploadIcon />}  >
                    Upload Icon
                    <input type='file' hidden accept="images/*" onChange={handleChange}/>
                </Button>
                {formError.icon?<FormHelperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.icon}</FormHelperText>:<></>}
                
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Avatar
              alt='Icon'
              variant="rounded"
              src={icon.file}
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
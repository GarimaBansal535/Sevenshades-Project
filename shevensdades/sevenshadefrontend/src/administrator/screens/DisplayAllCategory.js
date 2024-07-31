import MaterialTable from "@material-table/core"
import { useStyles } from "./CategoryCss"
import TitleComponent from "../components/admin/TitleComponent"
import { useEffect,useState } from "react"
import { getData,serverURL,postData } from "../../services/FetchDjangoApiService"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button ,Grid,Avatar,FormHelperText,TextField} from "@mui/material"
import Swal from "sweetalert2"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"

export default function DisplayAllCategory()
{   var classes=useStyles()
    var navigate=useNavigate()
    const [open,setOpen]=useState(false) 
    const[mainCategoryList,setMainCategoryList]=useState([])
    const [id,setId]=useState()
    const [btnStatus,setBtnStatus]=useState(true)
    const [tempIcon,setTempIcon]=useState()

    ///////////////////Category Update/////////////////////
    const [mainCategoryName,setMainCategoryName]=useState('')
    const [icon,setIcon]=useState({file:'icon.png',bytes:''})
    const [formError,setFormError]=useState({icon:false})

     const handleReset=()=>{
            setMainCategoryName('')
            setIcon({file:'icon.png',bytes:''})
           }   

    const handleChange=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError(false,"icon")
        setBtnStatus(false)
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
   
    ////////////////////////////////////////////////////////
       
    
    useEffect(function(){
        fetchAllMainCategory()

        },[])

     
    const fetchAllMainCategory=async()=>{
      var result=await getData('maincategory_list')
      setMainCategoryList(result.data)
    } 

    
    const handleOpenDiloag=(rowData)=>{
      setId(rowData.id)
      setMainCategoryName(rowData.maincategoryname)
      setIcon({file:`${serverURL}${rowData.icon}`,bytes:""})
      setTempIcon(`${serverURL}${rowData.icon}`)
      setOpen(true)

    }
                                  
    const handleClose=()=>{
      setOpen(false)
    }

    function listAllCategory() 
    {
        return (
          <MaterialTable
            title={<TitleComponent title={"List of Category"} listicon={false}/>}

            columns={[
              { title: 'Id', field: 'id' },
              { title: 'Category Name', field: 'maincategoryname' },
              { title: 'icon', render:(row)=><><img src={`${serverURL}${row.icon}`} style={{width:60,height:60,borderRadius:15}}/></>}
              
            ]}
            data={mainCategoryList }  
    
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpenDiloag(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Category',
                onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Category',
                isFreeAction:true,
                onClick: (event, rowData) => navigate('/admindashboard/category')
              }
            ]}
          />
          
        )
      }

      const handleEditData=async()=>{
        var body={id:id,maincategoryname:mainCategoryName}
        
        var result=await postData("editcategory_data",body)
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
       fetchAllMainCategory()
        }    
          

        const handleDeleteData=async(rowData)=>{
          Swal.fire({
            title: "Do you want to Delete Main Category?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={id:rowData.id}
              var result=await postData('deletecategory_data',body)
              if(result.status)
              {
                Swal.fire("Deleted!", "", "success");
              }
              fetchAllMainCategory() 
              
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
      
      }  
      
   

  

  const handleEditIcon=async()=>{
  var formData=new FormData()
  formData.append('id',id)
  formData.append('icon',icon.bytes)
  var result=await postData("editcategory_icon",formData)
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
 fetchAllMainCategory()
  }    

  const handleCancel=()=>{
    setIcon({file:tempIcon,bytes:" "})
    setBtnStatus(true)
  }    

  const showCategoryDialog=()=>{
    return(<Dialog open={open}>
      <DialogTitle>
      <TitleComponent title={"Update Category"} listicon={false}/>
      </DialogTitle>
      <DialogContent>
      <div style={{margin:5}}>
      <Grid container spacing={2}>  
            <Grid item xs={12}>
                <TextField 
                value={mainCategoryName}
                onFocus={()=>handleError(false,"maincategoryname")}
                error={formError.maincategoryname}
                helperText={formError.maincategoryname} 
                onChange={(event)=>setMainCategoryName(event.target.value)}
                fullWidth 
                label='Main Category Name'
                />
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                {btnStatus?<div>
                <Button onClick={()=>handleError(false,'icon')} variant="contained" component='label' startIcon={<CloudUploadIcon />} >
                    Upload Icon
                    <input type='file' hidden accept="images/*" onChange={handleChange}/>
                </Button>
                {formError.icon?<FormHelperText style={{ color: 'red' }}>{formError.icon}</FormHelperText>:<></>}
                 </div>:<div style={{display:'flex',width:160,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                  <Button variant="outlined" onClick={handleEditIcon}>Save</Button><Button variant="outlined" onClick={handleCancel}>Cancel</Button></div>}
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
          </Grid>    
          </div>

      </DialogContent>
      <DialogActions>
      <Button onClick={handleEditData}>Edit Data</Button>
      <Button onClick={handleClose}>Close</Button>
      </DialogActions>
      </Dialog>)
  }



   return(<div className={classes.display_root}>
    <div className={classes.display_box}>
    {listAllCategory()}
    </div> 
    {showCategoryDialog()}
    </div>)
}
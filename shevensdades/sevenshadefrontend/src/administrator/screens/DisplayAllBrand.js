import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { useState,useEffect } from "react";
import { getData,serverURL,postData } from "../../services/FetchDjangoApiService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button,Avatar,Grid,TextField,FormHelperText } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"


export default function DaisplayAllBrand(){
    var classes=useStyles()
    var navigate=useNavigate()
    const [brandList,setBrandList]=useState([])
    const [open,setOpen]=useState(false)
    const[id,setId]=useState('')
    const[btnStatus,setBtnStatus]=useState(true)
    const [tempIcon,setTempIcon]=useState({file:'',bytes:""})
    ////////////////////edit brands////////
    
    const [brandName, setBrandName] = useState("")
    const [brandIcon, setBrandIcon] = useState({ file: 'icon.png', bytes: 'hgy' })
    const [formError, setFormError] = useState({ icon: false })


    const handleChange = (event) => {
        setBrandIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(false)
    }

 const handleError = (errormassage, label) => {
        setFormError((prev) => ({ ...prev, [label]: errormassage }))
      
    }

    //////////////////////////////////////////

    useEffect(()=>{
      fetchBrandList()
    },[])

    const fetchBrandList=async()=>{
        var result=await getData('brand_list')
        setBrandList(result.data)
    }

    const handleOpenDialog=(rowData)=>{
      setId(rowData.id)
      setBrandName(rowData.brandname)
      setBrandIcon({file:`${serverURL}${rowData.brandicon}`,bytes:''})
      setTempIcon(`${serverURL}${rowData.brandicon}`)
      setOpen(true)

    }

 function OpenBrandDailog(){
      return(
       <Dialog open={open}>
        <DialogTitle>
          <TitleComponent title="Update Brand" listicon=""/>
        </DialogTitle>
        <DialogContent>
    <div style={{margin:5}} >
        <Grid container spacing={3}>
 <Grid item xs={12} >
    <TextField fullWidth
        label="Brands"
        value={brandName}
        onChange={(event) => setBrandName(event.target.value)}
        error={formError.brandname}
        onFocus={() => handleError(false, 'brandname')}
        helper Text={formError.brandname}
    />
</Grid>

<Grid item xs={6} fullWidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
   {btnStatus?<div>
                <Button  variant="contained" component='label' startIcon={<CloudUploadIcon />} >
                    Upload Icon
                    <input type='file' hidden accept="images/*" onChange={handleChange}/>
                </Button>
              </div>:<div style={{display:'flex',width:160,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                  <Button variant="outlined" onClick={handleEditIcon}>Save</Button>
                  <Button variant="outlined" onClick={handleCancel}>Cancel</Button></div>}
            </Grid>

<Grid item xs={6} fullWidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Avatar
        alt='Icon'
        variant="rounded"
        src={brandIcon.file}
        sx={{ width: 70, height: 70 }}
    />
</Grid>

</Grid>
</div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleEditData}>Edit Data</Button>
          <Button variant="contained" onClick={handleClose}>Close</Button>
        </DialogActions>


       </Dialog>
      )
    }
  
    const handleEditIcon=async()=>{
      var formData=new FormData()
      formData.append('brandicon',brandIcon.bytes)
      var result=await postData('edit_brandicon',formData)
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
      fetchBrandList()
    }

    const handleCancel=()=>{
      setBrandIcon({file:'tempIcon',bytes:""})
      setBtnStatus(true)
    }

    const handleEditData=async()=>{
      var err = false
      if (brandName.length == 0) {
           handleError("Pls input Brand Name", "brandname")
          err = true
          }
          
      if(err == false)
      {
      var body={id:id,brandname:brandName}
      var result=await postData('edit_branddata',body)
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

    const handleClose=()=>{
      setOpen(false)
    }

    function listAllBrand(){
        return(
            <MaterialTable
            title=<TitleComponent title='Brand List' listicon=''/>
            columns={[
              { title: 'Id', field: 'id' },
              { title: 'Brandname', field: 'brandname' },
              { title: 'Brand Icon', render:(row)=><><img src={`${serverURL}${row.brandicon}`} style={{width:60,height:60,borderRadius:15}}/></> },
             
            ]}
            data={brandList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
           
                {
                  icon: 'delete',
                  tooltip: 'Delete User',
                  onClick: (event, rowData) => handleDeleteData(rowData)
                },{
                  icon: 'add',
                  tooltip: 'Add New Brand',
                  isFreeAction:true,
                  onClick: (event, rowData) => navigate('/admindashboard/brands')
                }
              ]}
          />

        )
    }

    const handleDeleteData=async(rowData)=>{
      Swal.fire({
        title: "Do you want to Delete Brand?",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var body={id:rowData.id}
          var result=await postData('delete_branddata',body)
          if(result.status)
          {
            Swal.fire("Deleted!", "", "success");
          }
          fetchBrandList() 
          
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  
  }  
  

    return(<div className={classes.display_root} >
        <div className={classes.display_box}>
       {listAllBrand()}
        </div>
        {OpenBrandDailog()}
        </div>)
} 
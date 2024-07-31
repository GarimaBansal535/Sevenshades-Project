import MaterialTable from "@material-table/core"
import { useStyles } from "./CategoryCss"
import TitleComponent from "../components/admin/TitleComponent"
import { useEffect,useState } from "react"
import { getData,serverURL,postData } from "../../services/FetchDjangoApiService"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button ,Grid,Avatar,Select,MenuItem,InputLabel,FormControl,TextField} from "@mui/material"
import Swal from "sweetalert2"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"



export default function DisplaySubCategory()
 {
  const classes = useStyles();
  var navigate=useNavigate()
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [mainCategoryId, setMainCategoryId] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryIcon, setSubCategoryIcon] = useState({ file: 'icon.png', bytes: '' });
  const [formError, setFormError] = useState({ icon: false });
  const [btnStatus, setBtnStatus] = useState(true);
  const [tempIcon, setTempIcon] = useState('');
  const [mainCategoryList,setMainCategoryList]=useState([])

  useEffect(function() 
  {
    fetchSubCategory();
  }, []);

  const fetchSubCategory=async()=> 
  {
    var result = await getData('subcategory_list');
    setSubCategoryList(result.data);
    
  };

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
        var result=await postData('deletesubcategory_data',body)
        if(result.status)
        {
          Swal.fire("Deleted!", "", "success");
        }
        fetchSubCategory() 
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

}  

  function listSubCategory() 
  {
    return (
      <MaterialTable
        title={<TitleComponent title={'Sub Category List'} listicon={false} />}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'SubCategoryName', field:'subcategoryname'},
          {title: 'SubCategoryIcon',render: (row) => <img src={`${serverURL}${row.subcategoryicon}`} style={{ width: 60, height:60,borderRadius:6}} />,
          },
          { title: 'MainCategoryId', render:(rowData)=><div><div>{rowData.mainCategory.id}</div><div>{rowData.mainCategory.maincategoryname}</div></div>}
        ]}
        data={subCategoryList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleOpenDialog(rowData),
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleDeleteData(rowData),
          },
          {
            icon: 'add',
            tooltip: 'Add New SubCategory',
            isFreeAction:true,
            onClick: (event, rowData) => navigate('/admindashboard/subcategory')
          }
        ]}
      />
    );
  }

  const handleOpenDialog = (rowData) => {
    setId(rowData.id);
    setMainCategoryId(rowData.mainCategory.id);
    setSubCategoryName(rowData.subcategoryname);
    setSubCategoryIcon({ file: `${serverURL}${rowData.subcategoryicon}`, bytes: '' });
    setTempIcon(`${serverURL}${rowData.subcategoryicon}`);
    setOpen(true);
  };

  const handleChange = (event) => {
    setSubCategoryIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
    setBtnStatus(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setSubCategoryIcon({ file: tempIcon, bytes: '' });
    setBtnStatus(true);
  };

  const handleEditIcon = async () => {
    var formData = new FormData();
    formData.append('id', id);
    formData.append('subcategoryicon', subCategoryIcon.bytes);
    var result = await postData('editsubcategory_icon', formData);
    if (result.status) {
      Swal.fire({
        title: 'Seven Shades',
        text: result.message,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Seven Shades',
        text: result.message,
        icon: 'error',
      });
    }
    fetchSubCategory();
  };

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

  const handleEditData=async()=>{
    var err = false
    if (mainCategoryId.length == 0)
      console.log(mainCategoryId.length)
     {
        handleError("pls input Main Category Id", "maincategoryid")
        err = true
    }

    if (subCategoryName.length == 0) {
        handleError("pls input Sub Category Name", "subcategoryname")
        err = true
    }

    if (err == false) {
    var body={id:id,mainCategory:mainCategoryId,subcategoryname:subCategoryName}
    
    var result=await postData("editsubcategory_data",body)
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
   fetchSubCategory()
    } 
  }   
      
  const handleError = (errormessage, label) => {
    setFormError((prev) => ({ ...prev, [label]: errormessage }));
  };

  const OpenSubCategoryDialog=()=> {
    return (
      <Dialog open={open}>
        <DialogTitle>
          <TitleComponent title={'UpdateSubCategory'} listicon={false} />
        </DialogTitle>
        <DialogContent>
          <div style={{ margin: 5 }}>
            <Grid container spacing={3}>
            <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>MainCategoryId</InputLabel>
                        <Select value={mainCategoryId} label="MainCategoryId" onFocus={()=>handleError(false,'maincategoryid')} 
                        onChange={(event)=>setMainCategoryId(event.target.value)} error={formError.maincategoryid}>
                           <MenuItem value="Select Category">Select Category</MenuItem>
                              {fillMainCategory()}
                        </Select>
                    <helperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.maincategoryid}</helperText>
                    </FormControl>
                </Grid>

              <Grid item xs={6}>
                <TextField
                  label="SubCategoryName"
                  value={subCategoryName}
                  onChange={(event) => setSubCategoryName(event.target.value)}
                  onFocus={() => handleError(false, 'subcategoryname')}
                  error={formError.subcategoryname}
                  helperText={formError.subcategoryname}
                />
              </Grid>

              <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  {btnStatus ? (
    <div>
      <Button
        onClick={() => handleError(false, 'icon')}
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload Icon
        <input type="file" hidden accept="images/*" onChange={handleChange} />
      </Button>
    </div>) : (
    <div style={{ display: 'flex', width: 160, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button variant="outlined" onClick={handleEditIcon}>
        Save
      </Button>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  )}
</Grid>
 <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <Avatar
                        alt='Icon'
                        variant="rounded"
                        src={subCategoryIcon.file}
                        sx={{ width: 70, height: 70 }}
                    />
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
        {listSubCategory()}
        </div>
        {OpenSubCategoryDialog()}
    </div>)
}
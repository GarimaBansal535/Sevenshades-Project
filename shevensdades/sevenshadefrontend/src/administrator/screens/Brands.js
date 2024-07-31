import { Grid, TextField, Button, FormHelperText } from '@mui/material'
import { useStyles } from './BannerCss'
import TitleComponent from '../components/admin/TitleComponent'
import { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import { postData } from '../../services/FetchDjangoApiService';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"

export default function Brands(props) {
    var classes = useStyles()
    var navigate=useNavigate()
    const [brandName, setBrandName] = useState("")
    const [brandIcon, setBrandIcon] = useState({ file: 'icon.png', bytes: 'hgy' })
    const [formError, setFormError] = useState({ icon: false })


    const handleChange = (event) => {
        setBrandIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }


    const handleReset=()=> {
        setBrandName('')
        setBrandIcon({ file: 'icon.png', bytes: '' })
    }

    const handleError = (errormassage, label) => {
        setFormError((prev) => ({ ...prev, [label]: errormassage }))
    }


    const handlesubmit = async () => {
        var err = false
        if (brandName.length == 0) {
            handleError("Pls input Brand Name", "brandname")
            err = true
        }
        if (brandIcon.bytes.length == 0) {
            handleError("Pls input Brand Icon", "brandicon")
            err = true
        }
        if (err == false) {
            var formData = new FormData()
            formData.append('brandname', brandName)
            formData.append('brandicon', brandIcon.bytes)
            var result = await postData('brand_submit', formData)
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


    return (<div className={classes.root}>
        <div className={classes.box}>
            
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <TitleComponent title="Brands" listicon={listimage} link="/admindashboard/displayallbrand" />
            </Grid>

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
                    <Button onClick={() => handleError(false, 'brandicon')} variant='contained' component='label' startIcon={<CloudUploadIcon />}>
                        Upload Icon
                        <input type='file' hidden accept="images/*" onChange={handleChange} />
                    </Button>
                    {formError.brandicon ? <FormHelperText style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', marginTop: 5, color: '#d32f2f', fontSize: '0.75rem', fontWeight: 400, }}>{formError.brandicon}</FormHelperText> : <></>}
                </Grid>

                <Grid item xs={6} fullWidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        alt='Icon'
                        variant="rounded"
                        src={brandIcon.file}
                        sx={{ width: 70, height: 70 }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={handlesubmit}>Submit</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={handleReset}>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>)

}
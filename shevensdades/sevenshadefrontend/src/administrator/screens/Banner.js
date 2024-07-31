import { Button, Grid, TextField, Avatar, Icon, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useStyles } from "./BannerCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom"
import listimage from "../../images/list.png"

export default function Banner(props) {
    var classes = useStyles()
    var navigate=useNavigate()
    const [bannerDescription, setBannerDescription] = useState('')
    const [bannerIcon, setBannerIcon] = useState([])
    const [formError, setFormError] = useState({ icon: false })

    const handleReset = () => {
        setBannerDescription('')
        setBannerIcon([])
    }

    const handleChange = (event) => {
        var files = Object.values(event.target.files);
        if (files.length >= 4 && files.length <= 7)
            setBannerIcon({ file: files, bytes: event.target.files });
        else alert("Pls Input Min 4 and Max 7 Images");
        handleError(false, "bannericon");
    };


    const showImages = () => {
        return bannerIcon?.file?.map((item) => {
            return (
                <span>
                    <img
                        src={URL.createObjectURL(item)}
                        style={{ width: 40, height: 40, borderRadius: 10, marginRight: 3 }}
                    />
                </span>
            );
        });
    }

    const handleError = (errormassage, label) => {
        setFormError((prev) => ({ ...prev, [label]: errormassage }))
        // handleError(false,"icon")
    }

    const handleClick = async () => {
        var err = false
        if (bannerDescription.length == 0) {
            handleError("Pls input Banner description", "bannerdescription")
            err = true
        }
        if (bannerIcon.bytes.length == 0) {
            handleError("Pls select bannericon", "bannericon")
            err = true
        }
        if (err == false) {
            var formData = new FormData()
            formData.append('bannerdescription', bannerDescription)
            bannerIcon?.file?.map((item, i) => {
                formData.append('bannericon', item)
            })
            var result = await postData("banner_submit", formData)
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



    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title={'Banner'} listicon={listimage} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onFocus={() => handleError(false, "bannerdescription")}
                        error={formError.bannerdescription}
                        helperText={formError.bannerdescription}

                        onChange={(event) => setBannerDescription(event.target.value)}
                        fullWidth
                        label='Banner Description'
                        value={bannerDescription} />
                </Grid>

                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                    <Button onClick={() => handleError(false, 'bannerIcon')} variant="contained" component='label' startIcon={<CloudUploadIcon />}  >
                        Upload Icon
                        <input type='file' hidden accept="image/*" onChange={handleChange} multiple />
                    </Button>
                    {formError.icon ? <FormHelperText style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', marginTop: 5, color: '#d32f2f', fontSize: '0.75rem', fontWeight: 400, }}>{formError.icon}</FormHelperText> : <></>}

                </Grid>

                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {showImages()}
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleClick} fullWidth variant="contained">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleReset} fullWidth variant="contained">Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>)
} 
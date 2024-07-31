import * as React from 'react';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import JoinSignComponent from '../components/JoinSignComponent';
import { serverURL ,postData} from '../../services/FetchDjangoApiService';
import SocailMedia from '../components/SocialMedia';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       SevenShades
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.



var cards = [{ id: '1', brandicon: 'visa.png' }, { id: '2', brandicon: 'MasterCard.png' }, { id: '2', brandicon: 'pay.png' }, { id: '3', brandicon: 'american.png' }, { id: '4', brandicon: 'viisa.png' }]
const ShowAllCards = () => {
  return cards.map((item, index) => {
    return (<div >
      <img src={`${serverURL}/static/${item.brandicon}`} loading="lazy" style={{ width: '70%', margin:1 }} />
    </div>)
  })
}

const defaultTheme = createTheme();

export default function UserSignin() {
  const [date,setDate]=React.useState("")
  const [emailid,setEmailid]=useState('') 
  const [mobileno,setMobileno]=useState('') 
  const [firstname,setFirstName]=useState('')  
  const [lastname,setLastName]=useState('')  
  const [password,setPassword]=useState('')
  const[joincolour,setJoinColour] =useState('true')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('') 

  const dispatch=useDispatch()

  const sm_matches = useMediaQuery('(min-width:600px)')
  const md_matches = useMediaQuery('(min-width:768px)')

   
  const handleSubmit = async(event) => {
    var dob=year+"-"+month+"-"+date
    var body={emailid,mobileno,firstname,lastname,password,dob}
    var result = await postData('custmer_submit', body)
    // alert(jiiii)
    if (result.status) {
        Swal.fire({
            title: "Seven Shades",
            text: result.message,
            icon: "success"
        });
        dispatch({type:'ADD_USER',payload:[mobileno,body]})
    }
    else {
        Swal.fire({
            title: "Seven Shades",
            text: result.message,
            icon: "error"
        });
    }
  };

  return (
<div style={{background:'#ececec',justifyContent:'center',padding:'5%',alignItems:'center'}}>
         <div style={{ textAlign:'center',color:'black',fontSize:'3vw',fontStyle:'bold',fontWeight:900,letterSpacing:1,marginTop:0}}>SevenShades</div>
            <div style={{ textAlign:'center',color:'black',fontSize:'1.5vw',fontWeight:'bold',letterSpacing:1,padding:5}}>CHECK OUT</div>
       <div style={{background:'#ffff', width: sm_matches?'80%':md_matches?'60%':'50%',marginLeft:'25%',padding:'2%'}}> 

       <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: sm_matches?'70%':md_matches?'80%':'100%' }}>
          
          <JoinSignComponent joincolour={joincolour} setJoinColour={setJoinColour}/>
          
          <div style={{marginTop:'15%'}}>
          <SocailMedia/>
          </div>
          
          <label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>MOBILE NUMBER :</label>
            <TextField
              margin="normal"
              
              fullWidth
              id="mobileno"
              name="mobileno"
              autoComplete="mobileno"
              autoFocus
              onChange={(e)=>setMobileno(e.target.value)}
            />



          <label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>EMAIL ADDRESS :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmailid(e.target.value)}
            />

<label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>FIRST NAME :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              name="first name"
              autoComplete="first name"
              autoFocus
              onChange={(e)=>setFirstName(e.target.value)}
            />


<label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>LAST NAME</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              name="last name"
              autoComplete="last name"
              autoFocus
              onChange={(e)=>setLastName(e.target.value)}
            />

<label style={{ width: '100%', fontWeight:'bold'}}>PASSWORD :</label>
            <TextField
              
               margin="normal"
               
               fullWidth
               name="password"
               type="password"
               id="password"
               autoComplete="current-password"
               onChange={(e)=>setPassword(e.target.value)}
            
            />
<label style={{ width: '100%', fontWeight:'bold'}}>DATE OF BIRTH</label>
<div style={{display: "flex", gap: "10px"}} >


      <FormControl style={{ flex: 1,gap:5 }}>
        <InputLabel>Date</InputLabel>
        <Select value={date}
         onChange={(e) => setDate(e.target.value)}>
          <MenuItem value="">Date</MenuItem>
          {[...Array(31)].map((_, index) => {
            return <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
          })}
        </Select>
      </FormControl>

      <FormControl style={{flex: 1}}>
        <InputLabel>Month</InputLabel>
        <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
        >
            <MenuItem value="">Month</MenuItem>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="February">March</MenuItem>
            <MenuItem value="February">April</MenuItem>
            <MenuItem value="February">May</MenuItem>
            <MenuItem value="February">June</MenuItem>
            <MenuItem value="February">July</MenuItem>
            <MenuItem value="February">August</MenuItem>
            <MenuItem value="February">September</MenuItem>
            <MenuItem value="February">October</MenuItem>
            <MenuItem value="February">November</MenuItem>
            <MenuItem value="February">December</MenuItem>
            
        </Select>
    </FormControl>

    <FormControl style={{flex: 1}}>
        <InputLabel>Year</InputLabel>
        <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
        >
            <MenuItem value="">Year</MenuItem>
            {[...Array(100)].map((_, i) => {
            return <MenuItem key={2024 - i} value={2024 - i}>{2024 - i}</MenuItem>
          })}
                
           
        </Select>
    </FormControl>

    </div>
  

           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:'black'}}
            >
            CONTINUE TO CHECKOUT
            </Button>

  
            
             </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
       
      </Container>
        </ThemeProvider>
    </div>
    <div  style={{background:'white',padding:"1%",marginTop:'2%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style={{ fontWeight: 'bold',fontSize:'1vw',color:'#767676' ,marginLeft:'15%'}}>WE ACCEPT :</div>
          <div style={{ display: 'flex', justifyContent: 'center' ,marginLeft:5}}>
            {ShowAllCards()}
          </div>
        </div>
    </div>
  
  );
}

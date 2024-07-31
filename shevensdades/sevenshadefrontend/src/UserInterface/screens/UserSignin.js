import * as React from 'react';
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
import { getData, serverURL } from '../../services/FetchDjangoApiService';
import SocailMedia from '../components/SocialMedia';
import { useState } from 'react';
import { postData } from '../../services/FetchDjangoApiService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import Bottom from "../components/Bottom"
import Footer from '../components/Footer';
import { Divider } from '@mui/material';

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
      <img src={`${serverURL}/static/${item.brandicon}`} loading="lazy" style={{ width: '70%', margin: 1 }} />
    </div>)
  })
}

const defaultTheme = createTheme();

export default function UserSignin() {
  const [mobileno, setMobileno] = useState("")
  const [signcolour, setSignColour] = useState('true')
  const [password, setPassword] = useState("")
  var navigate = useNavigate()
  var dispatch=useDispatch()
  
  const sm_matches = useMediaQuery('(min-width:600px)')
  const md_matches = useMediaQuery('(min-width:768px)')

  const handleSubmit = async (event) => {
    var body = { mobileno, password }

    var result = await postData('check_user_login', body)
    if (result.status) {
      navigate('/home')
      dispatch({type:'ADD_USER',payload:[mobileno,result.data[0]]})
    }
    else
      alert('Invalid Admin Id Password')

  }

  return (
    <div style={{  background: '#ececec', justifyContent: 'center', padding: '5%', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', color: 'black', fontSize: '3vw', fontStyle: 'bold', fontWeight: 900, letterSpacing: 1, marginTop: 0 }}>SevenShades</div>
      <div style={{ textAlign: 'center', color: 'black', fontSize: '1.5vw', fontWeight: 'bold', letterSpacing: 1, padding: 5 }}>CHECK OUT</div>
      <div style={{ background: '#ffff', width: sm_matches?'80%':md_matches?'70%':'50%', marginLeft:sm_matches? '10%':md_matches?'15%':'25%', padding: '2%' }}>

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

              <Box sx={{  width: sm_matches?'100%':md_matches?'90%':'80%' }}>

                <JoinSignComponent signcolour={signcolour} setSignColour={setSignColour} />

                <div style={{ marginTop: 25 }}>
                  <label style={{ width: sm_matches?'60%':md_matches?'80%':'100%', fontWeight: 'bold' }}>MOBILE NO :</label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="mobileno"
                    name="mobile no"
                    autoComplete="mobile no"
                    autoFocus
                    onChange={(e) => setMobileno(e.target.value)}
                  />

                  <label style={{ width: '100%', fontWeight: 'bold' }}>PASSWORD :</label>
                  <TextField

                    margin="normal"

                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}

                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: 'black' }}
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                </div>

                <SocailMedia />

              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />

          </Container>
        </ThemeProvider>
      </div>
      <div style={{ background: 'white', padding: "1%", marginTop: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1vw', color: '#767676', marginLeft: '15%' }}>WE ACCEPT :</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginLeft: 5 }}>
          {ShowAllCards()}
        </div>
      </div>
      <Divider component="li" />
     <Bottom />
    <Footer />
    </div>

  );
}

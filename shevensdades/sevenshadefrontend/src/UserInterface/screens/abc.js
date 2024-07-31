import { Button, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";

export default function UserCheckout(props){
 const [firstname,setFirstName]=useState('')
 const [lastname,setLasttName]=useState('')
 const [mobile,setMobile]=useState('')
 const[country,setCountry]=useState('')
 const [city,setCity]=useState('')
 const [postcode,setPostcode]=useState('')

 function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  

    const showTotal = () => {
        return (
          <div style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: '5%' }}>
            <div style={{}}>
              <div style={{ fontWeight: 1000 }}>TOTAL</div>
              <hr style={{ width: '100%', borderTop: '1px solid #ececec', margin: '20px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>
    
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Total Amount:</div>
                  <div style={{ flex: '1', textAlign: 'right' }}>&#8377;</div>
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                  <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Amount to Pay:</div>
                  <div style={{ flex: '1', textAlign: 'right' }}>&#8377;</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                  <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>You Save:</div>
                  <div style={{ flex: '1', textAlign: 'right' }}>&#8377;</div>
    
                </div>
    
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                  <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Delivery:</div>
                  <div style={{ flex: '1', textAlign: 'right' }}>&#8377;{0}</div>
                </div>
                <hr style={{ width: '100%', borderTop: '1px solid #2d2d2d', margin: '10px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                  <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Net Amount:</div>
                  <div style={{ flex: '1', textAlign: 'right' }}>&#8377;</div>
                </div>
              </div>
              <hr style={{ width: '100%', borderTop: '1px solid #2d2d2d', margin: '10px 0' }} />
    
            </div>
            <button style={{ backgroundColor: '#018849', color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 16, paddingBlock: 4, justifyContent: 'space-evenly', paddingRight: 10, paddingLeft: 10, width: '100%', borderBlockColor: '#018849' }}>CHECKOUT</button>
    
          
          </div>
        );
      };


    return(<div style={{ background: '#eee' }}>
         
        <Grid container spacing={2}>
       <Grid  item xs={2}></Grid>

       <Grid item xs={5}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:40}}>
       <div style={{ textAlign: 'left',  color: 'black', fontSize: '2vw', fontStyle: 'bold', fontWeight: 900, letterSpacing: 1}}>SevenShades</div>
       <div style={{ textAlign: 'right', color: 'black', fontSize: '2vw', fontWeight: 'bold',fontWeight: 900, letterSpacing: 1 }}>CHECK OUT</div>
      </div>
       <div style={{ marginTop: 40, backgroundColor: 'white',height:70, width: '99%', display: 'flex',flexDirection:'column', padding: '0.8%' }}>
            <div style={{ marginLeft:5,fontWeight: 'bold', fontSize: '2vw' }}>ADDRESS</div>
            <div style={{ marginLeft:5,fontSize: '1vw' }}>Items are r</div>
          </div>

          <div style={{ marginTop: 15, backgroundColor: 'white', width: '99%', display: 'flex',flexDirection:'column',justifyContent:"center",alignItems:'center' ,padding: '0.8%' }}>
            <div style={{marginTop:15, fontWeight: 'bold', fontSize: '2vw',width:'60%' }}>DELIVERY ADDRESS</div>
            <div style={{ fontSize: '1.5vw',marginTop:20,fontWeight:700,width:'60%' }}>ADD ADDRESS</div>
          

          <div style={{ marginTop: 25,width:'60%'  }}>
        

<label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>FIRST NAME :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              name="first name"
              autoComplete="first name"
              autoFocus
            //   onChange={(e)=>setFirstName(e.target.value)}
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
            //   onChange={(e)=>setLastName(e.target.value)}
            />

<label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>MOBILE :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              name="mobile"
              autoComplete="mobile"
              autoFocus
             onChange={(e)=>setMobile(e.target.value)}
            />

<label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>COUNTRY :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              name="country"
              autoComplete="country"
              autoFocus
             onChange={(e)=>setCountry(e.target.value)}
            />
<label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>CITY :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              name="city"
              autoComplete="city"
              autoFocus
              onChange={(e)=>setCity(e.target.value)}
            />
            <label style={{ width: '100%', fontWeight:'bold',color:'#767676'}}>POSTCODE:</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="postcode"
              name="postcode"
              autoComplete="postcode"
              autoFocus
              onChange={(e)=>setPostcode(e.target.value)}
            />




<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:'black'}}
            >
            DELIVERY TO THIS ADDRESS
            </Button>

            <Copyright sx={{ mt: 8, mb: 4 }} />


                 </div>
                </div> 
       </Grid>
       <Grid item xs={4} >
          <div style={{ backgroundColor: 'white', width: '70%', padding: '1%', marginTop: 115 }}>
            {showTotal()}
          </div>
        </Grid>

        </Grid>
    </div>)
}
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { serverURL, postData } from "../../services/FetchDjangoApiService"
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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
        Sevenshades
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();


export default function UserCheckout(props) {
  var user = useSelector(state => state.user)
  // console.log("GGGGGGggggg",user)
  var userData = Object.values(user)[0]



  const cartData = useSelector((state) => state.product);
  const items = Object.values(cartData);
  console.log("******", items)

  var totalamount = items?.reduce((item1, item2) => {
    var amt = item1 + item2.price * item2.quntity;
    return amt;
  }, 0);

  var actualamount = items?.reduce((item1, item2) => {
    var amt =
      item1 +
      (item2.offerprice > 0
        ? item2.offerprice * item2.quntity
        : item2.price * item2.quntity);
    return amt;
  }, 0);

  var saveamount = totalamount - actualamount;


  const [firstname, setFirstName] = useState(userData?.firstname)
  const [lastname, setLastName] = useState(userData?.lastname)
  const [mobileno, setMobileno] = useState(userData?.mobileno)
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('IN')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [addressList, setAddressList] = useState([])
  const [open, setOpen] = useState(false)

  const theme = useTheme();
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));
  const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));

  var cards = [{ id: '1', brandicon: 'visa.png' }, { id: '2', brandicon: 'MasterCard.png' }, { id: '2', brandicon: 'pay.png' }, { id: '3', brandicon: 'american.png' }, { id: '4', brandicon: 'viisa.png' }]
  const ShowAllCards = () => {
    return cards.map((item, index) => {
      return (<div >
        <img src={`${serverURL}/static/${item.brandicon}`} loading="lazy" style={{ width: '50%', marginLeft: '1px' }} />
      </div>)
    })
  }

  const fetchUserAddress = async () => {
    var result = await postData('fetch_user_address', { mobile: userData?.mobileno })
    if (result.status) {
      //  alert(JSON.stringify(result.data))
      setAddressList(result.data)
      setOpen(false)
    }
    else {
      setOpen(true)
    }

  }
  useEffect(() => {

    fetchUserAddress()
  }, [])

  const showAddressList = () => {
    return addressList?.map((item) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{item.address}</div>
          <div>
            {item.city},{item.country}
          </div>
          <div>{item.postcode}</div>
        </div>
      );
    });
  };


  const showAddress = () => {
    return addressList.map((item) => {
      return <div>

        <div>{userData?.address} </div>
        <div>{userData?.city}, {userData?.country},{userData?.postcode} </div>
      </div>
    })


  }

  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('country', country)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('postcode', postcode)
    formData.append('mobileno', userData.mobileno)


    var result = await postData('address_submit', formData)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      setOpen(false)
    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    }
  }

  /****************payment*********** */
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: actualamount * 100, //  = INR 1
    name: "SevenShades",
    description: "some description",
    image: `${serverURL}/static/sslogo.png`,
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: userData?.firstname,
      contact: userData?.mobileno,
      email: userData?.email,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };


  const handlePayment = async () => {
    // alert("FFFFFFFFf")
    var rzp1 = new window.Razorpay(options);
    rzp1.open();` `
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  /****************************************************** */

  const AddAdress = () => {
    return (
      <div style={{ marginTop: 15, backgroundColor: 'white', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', padding: '0.8%' }}>
        <div style={{ marginTop: 15, fontWeight: 'bold', fontSize: '2vw', width: '60%' }}>DELIVERY ADDRESS</div>
        <div style={{ fontSize: '1.5vw', marginTop: 20, fontWeight: 700, width: '60%' }}>ADD ADDRESS</div>


        <div style={{ marginTop: 25, width: '60%' }}>


          <label style={{ width: '100%', fontWeight: 'bold', color: '#767676' }}>FIRST NAME :</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            name="first name"
            autoComplete="first name"
            value={firstname}
            autoFocus
            onChange={(e) => setFirstName(e.target.value)}
          />


          <label style={{ width: '100%', fontWeight: 'bold', color: '#767676' }}>LAST NAME</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            name="last name"
            autoComplete="last name"
            value={lastname}
            autoFocus
            onChange={(e) => setLastName(e.target.value)}
          />

          <label style={{ width: '100%', fontWeight: 'bold', color: '#767676' }}>MOBILE :</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            name="mobile"
            autoComplete="mobile"
            value={mobileno}
            autoFocus
            onChange={(e) => setMobileno(e.target.value)}
          />



          <div style={{ display: "flex", flexDirection: 'column', gap: "10px" }}>
            <label style={{ fontWeight: 'bold', color: '#999' }}>COUNTRY:</label>
            <div style={{ width: '100%' }}>
              <FormControl style={{ width: '100%' }}>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <MenuItem value="AF">Afghanistan</MenuItem>
                  <MenuItem value="AX">Aland Islands</MenuItem>
                  <MenuItem value="AL">Albania</MenuItem>
                  <MenuItem value="DZ">Algeria</MenuItem>
                  <MenuItem value="AS">American Samoa</MenuItem>
                  <MenuItem value="AD">Andorra</MenuItem>
                  <MenuItem value="AO">Angola</MenuItem>
                  <MenuItem value="AI">Anguilla</MenuItem>
                  <MenuItem value="AQ">Antarctica</MenuItem>
                  <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                  <MenuItem value="AR">Argentina</MenuItem>
                  <MenuItem value="AM">Armenia</MenuItem>
                  <MenuItem value="AW">Aruba</MenuItem>
                  <MenuItem value="AU">Australia</MenuItem>
                  <MenuItem value="AT">Austria</MenuItem>
                  <MenuItem value="AZ">Azerbaijan</MenuItem>
                  <MenuItem value="BS">Bahamas</MenuItem>
                  <MenuItem value="BH">Bahrain</MenuItem>
                  <MenuItem value="BD">Bangladesh</MenuItem>
                  <MenuItem value="BB">Barbados</MenuItem>
                  <MenuItem value="BY">Belarus</MenuItem>
                  <MenuItem value="BE">Belgium</MenuItem>
                  <MenuItem value="BZ">Belize</MenuItem>
                  <MenuItem value="BJ">Benin</MenuItem>
                  <MenuItem value="BM">Bermuda</MenuItem>
                  <MenuItem value="BT">Bhutan</MenuItem>
                  <MenuItem value="BO">
                    Bolivia, Plurinational State of
                  </MenuItem>
                  <MenuItem value="BQ">
                    Bonaire, Sint Eustatius and Saba
                  </MenuItem>
                  <MenuItem value="BA">Bosnia and Herzegovina</MenuItem>
                  <MenuItem value="BW">Botswana</MenuItem>
                  <MenuItem value="BR">Brazil</MenuItem>
                  <MenuItem value="IO">
                    British Indian Ocean Territory
                  </MenuItem>
                  <MenuItem value="BN">Brunei Darussalam</MenuItem>
                  <MenuItem value="BG">Bulgaria</MenuItem>
                  <MenuItem value="BF">Burkina Faso</MenuItem>
                  <MenuItem value="BI">Burundi</MenuItem>
                  <MenuItem value="KH">Cambodia</MenuItem>
                  <MenuItem value="CM">Cameroon</MenuItem>
                  <MenuItem value="CA">Canada</MenuItem>
                  <MenuItem value="CV">Cape Verde</MenuItem>
                  <MenuItem value="KY">Cayman Islands</MenuItem>
                  <MenuItem value="CF">Central African Republic</MenuItem>
                  <MenuItem value="TD">Chad</MenuItem>
                  <MenuItem value="CL">Chile</MenuItem>
                  <MenuItem value="CN">China</MenuItem>
                  <MenuItem value="CX">
                    Christmas Island (Australia)
                  </MenuItem>
                  <MenuItem value="CC">Cocos (Keeling) Islands</MenuItem>
                  <MenuItem value="CO">Colombia</MenuItem>
                  <MenuItem value="KM">Comoros</MenuItem>
                  <MenuItem value="CD">
                    Congo, the Democratic Republic of the
                  </MenuItem>
                  <MenuItem value="CG">Congo, the Republic of</MenuItem>
                  <MenuItem value="CK">Cook Islands</MenuItem>
                  <MenuItem value="CR">Costa Rica</MenuItem>
                  <MenuItem value="CI">Cote d'Ivoire</MenuItem>
                  <MenuItem value="HR">Croatia</MenuItem>
                  <MenuItem value="CU">Cuba</MenuItem>
                  <MenuItem value="CW">Curacao</MenuItem>
                  <MenuItem value="CY">Cyprus</MenuItem>
                  <MenuItem value="CZ">Czech Republic</MenuItem>
                  <MenuItem value="KP">
                    Democratic People's Republic of Korea (North)
                  </MenuItem>
                  <MenuItem value="DK">Denmark</MenuItem>
                  <MenuItem value="DJ">Djibouti</MenuItem>
                  <MenuItem value="DM">Dominica</MenuItem>
                  <MenuItem value="DO">Dominican Republic</MenuItem>
                  <MenuItem value="EC">Ecuador</MenuItem>
                  <MenuItem value="EG">Egypt</MenuItem>
                  <MenuItem value="SV">El Salvador</MenuItem>
                  <MenuItem value="GQ">Equatorial Guinea</MenuItem>
                  <MenuItem value="ER">Eritrea</MenuItem>
                  <MenuItem value="EE">Estonia</MenuItem>
                  <MenuItem value="SZ">Eswatini</MenuItem>
                  <MenuItem value="ET">Ethiopia</MenuItem>
                  <MenuItem value="FK">
                    Falkland Islands (Malvinas)
                  </MenuItem>
                  <MenuItem value="FO">Faroe Islands</MenuItem>
                  <MenuItem value="FJ">Fiji</MenuItem>
                  <MenuItem value="FI">Finland</MenuItem>
                  <MenuItem value="FR">France</MenuItem>
                  <MenuItem value="GF">French Guiana (Guyane)</MenuItem>
                  <MenuItem value="PF">French Polynesia</MenuItem>
                  <MenuItem value="TF">
                    French Southern Territories
                  </MenuItem>
                  <MenuItem value="GA">Gabon</MenuItem>
                  <MenuItem value="GM">Gambia</MenuItem>
                  <MenuItem value="GE">Georgia</MenuItem>
                  <MenuItem value="DE">Germany</MenuItem>
                  <MenuItem value="GH">Ghana</MenuItem>
                  <MenuItem value="GI">Gibraltar</MenuItem>
                  <MenuItem value="GR">Greece</MenuItem>
                  <MenuItem value="GL">Greenland</MenuItem>
                  <MenuItem value="GD">Grenada</MenuItem>
                  <MenuItem value="GP">Guadeloupe</MenuItem>
                  <MenuItem value="GU">Guam</MenuItem>
                  <MenuItem value="GT">Guatemala</MenuItem>
                  <MenuItem value="GN">Guinea</MenuItem>
                  <MenuItem value="GW">Guinea-Bissau</MenuItem>
                  <MenuItem value="GY">
                    Guyana, Co-operative Republic of
                  </MenuItem>
                  <MenuItem value="HT">Haiti</MenuItem>
                  <MenuItem value="VA">
                    Holy See (Vatican City State)
                  </MenuItem>
                  <MenuItem value="HN">Honduras</MenuItem>
                  <MenuItem value="HK">Hong Kong</MenuItem>
                  <MenuItem value="HU">Hungary</MenuItem>
                  <MenuItem value="IS">Iceland</MenuItem>
                  <MenuItem value="IN">India</MenuItem>
                  <MenuItem value="ID">Indonesia</MenuItem>
                  <MenuItem value="IR">
                    Iran, Islamic Republic of
                  </MenuItem>
                  <MenuItem value="IQ">Iraq</MenuItem>
                  <MenuItem value="IE">Ireland, Republic of</MenuItem>
                  <MenuItem value="IL">Israel</MenuItem>
                  <MenuItem value="IT">Italy</MenuItem>
                  <MenuItem value="JM">Jamaica</MenuItem>
                  <MenuItem value="JP">Japan</MenuItem>
                  <MenuItem value="JO">Jordan</MenuItem>
                  <MenuItem value="KZ">Kazakhstan</MenuItem>
                  <MenuItem value="KE">Kenya</MenuItem>
                  <MenuItem value="KI">Kiribati</MenuItem>
                  <MenuItem value="KR">
                    Korea, Republic of (South Korea)
                  </MenuItem>
                  <MenuItem value="XK">Kosovo</MenuItem>
                  <MenuItem value="KW">Kuwait</MenuItem>
                  <MenuItem value="KG">Kyrgyzstan</MenuItem>
                  <MenuItem value="LA">
                    Lao People's Democratic Republic
                  </MenuItem>
                  <MenuItem value="LV">Latvia</MenuItem>
                  <MenuItem value="LB">Lebanon</MenuItem>
                  <MenuItem value="LS">Lesotho</MenuItem>
                  <MenuItem value="LR">Liberia</MenuItem>
                  <MenuItem value="LY">Libya</MenuItem>
                  <MenuItem value="LI">Liechtenstein</MenuItem>
                  <MenuItem value="LT">Lithuania</MenuItem>
                  <MenuItem value="LU">Luxembourg</MenuItem>
                  <MenuItem value="MO">Macao</MenuItem>
                  <MenuItem value="MG">Madagascar</MenuItem>
                  <MenuItem value="MW">Malawi</MenuItem>
                  <MenuItem value="MY">Malaysia</MenuItem>
                  <MenuItem value="MV">Maldives</MenuItem>
                  <MenuItem value="ML">Mali</MenuItem>
                  <MenuItem value="MT">Malta</MenuItem>
                  <MenuItem value="MH">Marshall Islands</MenuItem>
                  <MenuItem value="MQ">Martinique</MenuItem>
                  <MenuItem value="MR">Mauritania</MenuItem>
                  <MenuItem value="MU">Mauritius</MenuItem>
                  <MenuItem value="YT">Mayotte</MenuItem>
                  <MenuItem value="MX">Mexico</MenuItem>
                  <MenuItem value="FM">
                    Micronesia, Federated States of
                  </MenuItem>
                  <MenuItem value="MD">Moldova, Republic of</MenuItem>
                  <MenuItem value="MC">Monaco</MenuItem>
                  <MenuItem value="MN">Mongolia</MenuItem>
                  <MenuItem value="ME">Montenegro</MenuItem>
                  <MenuItem value="MS">Montserrat</MenuItem>
                  <MenuItem value="MA">Morocco</MenuItem>
                  <MenuItem value="MZ">Mozambique</MenuItem>
                  <MenuItem value="MM">Myanmar</MenuItem>
                  <MenuItem value="NA">Namibia</MenuItem>
                  <MenuItem value="NR">Nauru</MenuItem>
                  <MenuItem value="NP">Nepal</MenuItem>
                  <MenuItem value="NL">Netherlands</MenuItem>
                  <MenuItem value="NC">New Caledonia</MenuItem>
                  <MenuItem value="NZ">New Zealand</MenuItem>
                  <MenuItem value="NI">Nicaragua</MenuItem>
                  <MenuItem value="NE">Niger</MenuItem>
                  <MenuItem value="NG">Nigeria</MenuItem>
                  <MenuItem value="NU">Niue</MenuItem>
                  <MenuItem value="NF">Norfolk Island</MenuItem>
                  <MenuItem value="MK">North Macedonia</MenuItem>
                  <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                  <MenuItem value="NO">Norway</MenuItem>
                  <MenuItem value="OM">Oman</MenuItem>
                  <MenuItem value="PK">Pakistan</MenuItem>
                  <MenuItem value="PW">Palau</MenuItem>
                  <MenuItem value="PS">Palestine</MenuItem>
                  <MenuItem value="PA">Panama</MenuItem>
                  <MenuItem value="PG">Papua New Guinea</MenuItem>
                  <MenuItem value="PY">Paraguay</MenuItem>
                  <MenuItem value="PE">Peru</MenuItem>
                  <MenuItem value="PH">Philippines</MenuItem>
                  <MenuItem value="PN">Pitcairn</MenuItem>
                  <MenuItem value="PL">Poland</MenuItem>
                  <MenuItem value="PT">Portugal</MenuItem>
                  <MenuItem value="PR">Puerto Rico</MenuItem>
                  <MenuItem value="QA">Qatar</MenuItem>
                  <MenuItem value="RE">Reunion</MenuItem>
                  <MenuItem value="RO">Romania</MenuItem>
                  <MenuItem value="RU">Russia</MenuItem>
                  <MenuItem value="RW">Rwanda</MenuItem>
                  <MenuItem value="BL">Saint Barthelemy</MenuItem>
                  <MenuItem value="SH">
                    Saint Helena, Ascension and Tristan da Cunha
                  </MenuItem>
                  <MenuItem value="KN">Saint Kitts and Nevis</MenuItem>
                  <MenuItem value="LC">Saint Lucia</MenuItem>
                  <MenuItem value="MF">
                    Saint Martin (French part)
                  </MenuItem>
                  <MenuItem value="PM">
                    Saint Pierre and Miquelon
                  </MenuItem>
                  <MenuItem value="VC">
                    Saint Vincent and the Grenadines
                  </MenuItem>
                  <MenuItem value="WS">Samoa</MenuItem>
                  <MenuItem value="SM">San Marino</MenuItem>
                  <MenuItem value="ST">Sao Tome and Principe</MenuItem>
                  <MenuItem value="SA">Saudi Arabia</MenuItem>
                  <MenuItem value="SN">Senegal</MenuItem>
                  <MenuItem value="RS">Serbia</MenuItem>
                  <MenuItem value="SC">Seychelles</MenuItem>
                  <MenuItem value="SL">Sierra Leone</MenuItem>
                  <MenuItem value="SG">Singapore</MenuItem>
                  <MenuItem value="SX">
                    Sint Maarten (Dutch part)
                  </MenuItem>
                  <MenuItem value="SK">Slovakia</MenuItem>
                  <MenuItem value="SI">Slovenia</MenuItem>
                  <MenuItem value="SB">Solomon Islands</MenuItem>
                  <MenuItem value="SO">Somalia</MenuItem>
                  <MenuItem value="ZA">South Africa</MenuItem>
                  <MenuItem value="GS">
                    South Georgia and the South Sandwich Islands
                  </MenuItem>
                  <MenuItem value="SS">South Sudan</MenuItem>
                  <MenuItem value="ES">Spain</MenuItem>
                  <MenuItem value="LK">Sri Lanka</MenuItem>
                  <MenuItem value="SD">Sudan</MenuItem>
                  <MenuItem value="SR">Suriname</MenuItem>
                  <MenuItem value="SJ">Svalbard and Jan Mayen</MenuItem>
                  <MenuItem value="SE">Sweden</MenuItem>
                  <MenuItem value="CH">Switzerland</MenuItem>
                  <MenuItem value="SY">Syrian Arab Republic</MenuItem>
                  <MenuItem value="TW">Taiwan</MenuItem>
                  <MenuItem value="TJ">Tajikistan</MenuItem>
                  <MenuItem value="TZ">
                    Tanzania, United Republic of
                  </MenuItem>
                  <MenuItem value="TH">Thailand</MenuItem>
                  <MenuItem value="TL">Timor-Leste</MenuItem>
                  <MenuItem value="TG">Togo</MenuItem>
                  <MenuItem value="TK">Tokelau</MenuItem>
                  <MenuItem value="TO">Tonga</MenuItem>
                  <MenuItem value="TT">Trinidad and Tobago</MenuItem>
                  <MenuItem value="TN">Tunisia</MenuItem>
                  <MenuItem value="TR">Turkey</MenuItem>
                  <MenuItem value="TM">Turkmenistan</MenuItem>
                  <MenuItem value="TC">Turks and Caicos Islands</MenuItem>
                  <MenuItem value="TV">Tuvalu</MenuItem>
                  <MenuItem value="UG">Uganda</MenuItem>
                  <MenuItem value="GB">UK</MenuItem>
                  <MenuItem value="UA">Ukraine</MenuItem>
                  <MenuItem value="AE">United Arab Emirates</MenuItem>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="UM">
                    United States Minor Outlying Islands
                  </MenuItem>
                  <MenuItem value="UY">Uruguay</MenuItem>
                  <MenuItem value="UZ">Uzbekistan</MenuItem>
                  <MenuItem value="VU">Vanuatu</MenuItem>
                  <MenuItem value="VE">
                    Venezuela, Bolivarian Republic of
                  </MenuItem>
                  <MenuItem value="VN">Vietnam</MenuItem>
                  <MenuItem value="VG">Virgin Islands, British</MenuItem>
                  <MenuItem value="VI">Virgin Islands, U.S.</MenuItem>
                  <MenuItem value="WF">Wallis and Futuna</MenuItem>
                  <MenuItem value="EH">Western Sahara</MenuItem>
                  <MenuItem value="YE">Yemen</MenuItem>
                  <MenuItem value="ZM">Zambia</MenuItem>
                  <MenuItem value="ZW">Zimbabwe</MenuItem>

                </Select>

              </FormControl>
            </div>
          </div>

          <label style={{ width: '100%', fontWeight: 'bold', color: '#767676' }}>CITY :</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            name="city"
            autoComplete="city"
            autoFocus
            onChange={(e) => setCity(e.target.value)}
          />
          <label style={{ width: '100%', fontWeight: 'bold', color: '#767676' }}>POSTCODE:</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="postcode"
            name="postcode"
            autoComplete="postcode"
            autoFocus
            onChange={(e) => setPostcode(e.target.value)}
          />




          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: 'black' }}
            onClick={handleSubmit}
          >
            DELIVERY TO THIS ADDRESS
          </Button>



          <Copyright sx={{ mt: 4, mb: 4 }} />
        </div>
      </div>)
  }


  const showTotal = () => {
    return (
      <div style={{ width: '90%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: '5%' }}>
        <div style={{}}>
          <div style={{ fontWeight: 1000 }}>TOTAL</div>
          <hr style={{ width: '100%', borderTop: '1px solid #ececec', margin: '20px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Total Amount:</div>
              <div style={{ flex: '1', textAlign: 'right' }}>&#8377;{totalamount}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Amount to Pay:</div>
              <div style={{ flex: '1', textAlign: 'right' }}>&#8377;{actualamount}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>You Save:</div>
              <div style={{ flex: '1', textAlign: 'right' }}>&#8377;{saveamount}</div>

            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Delivery:</div>
              <div style={{ flex: '1', textAlign: 'right' }}>&#8377;{0}</div>
            </div>
            <hr style={{ width: '100%', borderTop: '1px solid #2d2d2d', margin: '10px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <div style={{ fontWeight: 'bold', flex: '1', textAlign: 'left' }}>Net Amount:</div>
              <div style={{ flex: '1', textAlign: 'right' }}>&#8377;{actualamount}</div>
            </div>
          </div>
          <hr style={{ width: '100%', borderTop: '1px solid #2d2d2d', margin: '10px 0' }} />

        </div>
        <button style={{
          backgroundColor: '#018849',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
          marginTop: 16,
          cursor: 'pointer',
          paddingBlock: 4,
          justifyContent: 'space-evenly',
          paddingRight: 10,
          paddingLeft: 10,
          width: '100%',
          borderBlockColor: '#018849'
        }}
          onClick={() => handlePayment()}>MAKE PAYMENT</button>

      </div>
    );
  };


  return (
    <div style={{ background: '#eee', height: 'auto', width : '100%' }}>
      <div style={{
        width:'100%' ,
        display: 'flex', flexDirection: 'row',
        justifyContent: sm_matches ? 'space-evenly' : md_matches ? 'space-around' : 'space=around',
        alignItems: 'center',
        marginLeft: 10
      }}>
        <div style={{ marginTop: 40, marginLeft: 140, textAlign: 'center', color: 'black', fontSize: sm_matches ? 10 : md_matches ? 20 : 27, fontStyle: 'bold', fontWeight: 900, letterSpacing: 1 }}>SevenShades</div>
        <div style={{ marginTop: 30, textAlign: 'center', color: 'black', fontSize: sm_matches ? 10 : md_matches ? 28 : 25, fontWeight: 'bold', fontWeight: 900, letterSpacing: 1 }}>CHECK OUT</div>
      </div>
      <ThemeProvider theme={defaultTheme}  >
        <Container component="main" maxWidth="xl" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',


            }}
          >

            <Box sx={{ width: sm_matches ? '100%' : md_matches ? '80%' : '70%' }}>
              <Grid container spacing={2}>
                {sm_matches ? <></> : md_matches ? <></> : <Grid item xs={2} ></Grid>}


                <Grid item xs={10} sm={8} md={6} >
                  <div style={{ marginTop: 1, backgroundColor: 'white', height: 120, width: '100%', display: 'flex', flexDirection: 'column', padding: '0.8%' }}>
                    <div style={{ marginLeft: 5, fontWeight: 'bold', fontSize: '2vw' }}>ADDRESS</div>
                    <div style={{ color: 'black', fontWeight: 'bold', fontSize: '1vw', marginBottom: '2%' }}>
                      {userData?.firstname} {userData?.lastname}
                      {showAddressList()}

                    </div>


                    <div style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', fontSize: '.8vw', marginBottom: '2%' }}>
                      {
                        addressList.length == 0 ? <div><Button>ADD NEW ADDRESS</Button></div> : showAddress()}

                    </div>
                  </div>



                  {open ? AddAdress() : <></>}


                  {sm_matches ? <div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: 15 }}>
                    {showTotal()}
                  </div> : md_matches ? <div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: 5 }}>
                    {showTotal()}
                  </div> : <></>}




                  <div style={{ width: '100%', backgroundColor: 'white', paddingLeft: '5%', paddingTop: '5%', marginTop: '5%' }}>
                    <Box sx={{ mt: 1 }}>
                      <div style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', fontSize: '1vw', marginTop: '2%', marginBottom: '2%' }}>
                        <div style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', fontSize: sm_matches ? 14 : md_matches ? 12 : 10, marginTop: '1%', marginBottom: '1%' }}>PAYMENT TYPE</div>
                      </div>
                    </Box>
                  </div>
                  <div style={{ height: 50, marginTop: '-2%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#a2a6a4', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', width: '60%', marginTop: 5, textAlign: 'center' }}>WE ACCEPT:</div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {ShowAllCards()}
                    </div>





                  </div>
                </Grid>
                {sm_matches ? <></> : md_matches ? <></> : <Grid item xs={4} >
                  <div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: 5 }}>
                    {showTotal()}
                  </div>
                </Grid>}
              </Grid>
            </Box>

          </Box>


        </Container>
      </ThemeProvider>
      {/* </div>  */}
      <Divider component="li" />
      <Bottom />
      <Footer />

    </div>

  );
}

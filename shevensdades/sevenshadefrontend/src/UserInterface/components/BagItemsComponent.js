import { serverURL } from "../../services/FetchDjangoApiService";
// import { useComponentStyles } from "./ComponentCss";
import { Grid } from "@mui/material";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'

export default function BagItemsComponent(props) {
  const navigate=useNavigate()
  const theme = useTheme();
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));
  const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));


  var user=useSelector(state=>state.user)
  var userData=Object.values(user)

  var dispatch = useDispatch()
  const items = props?.data
  console.log('itemsiiiii', items)
  // console.log('price',items.price)

  var totalamount = items?.reduce((item1, item2) => {
    var amt = item1 + item2.price * item2.quntity
    return amt
  }, 0)

  var actualamount = items?.reduce((item1, item2) => {

    var amt = item1 + (item2.offerprice > 0 ? item2.offerprice * item2.quntity : item2.price * item2.quntity)
    return amt;
  }, 0)

  var saveamount = totalamount - actualamount
  var cards = [{ id: '1', brandicon: 'visa.png' }, { id: '2', brandicon: 'MasterCard.png' }, { id: '2', brandicon: 'pay.png' }, { id: '3', brandicon: 'american.png' }, { id: '4', brandicon: 'viisa.png' }]
  
  const ShowAllCards = () => {
    return cards.map((item, index) => {
      return (<div >
        <img src={`${serverURL}/static/${item.brandicon}`} loading="lazy" style={{ width: '60%', marginLeft: '10px' }} />
      </div>)
    })
  }


  const handleChange = (v, product) => {
    // alert(JSON.stringify(product))
    product['quntity'] = v
    if (v >= 1) {
      dispatch({ type: 'ADD_PRODUCT', payload: [product.id, product] })
    }
    else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [product.id] })
    }
    props.setPageRefresh(!props.pageRefresh)

  }

  const handleUserCheck=()=>{
    if(userData?.length>0)
      {
        navigate('/usercheckout')
      }
      else{
        navigate('/usersignin')
      }

  }

  const showAllItems = () => {

    return items.map((item) => (

      <div className="cart_container" >
        <Grid container spacing={2}>
          <Grid item xs={3}>

            <div className="cart_item" style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${serverURL}${item.product.producticon}`} alt={item.description} loading="lazy" style={{ width: '80%', height: '90%' }} />
            </div>
          </Grid>

          <Grid item xs={9}>
            <div className="item-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'left' }}>
              {/* <div> */}
              <div style={{ color: '#2d2d2d', fontSize: '1vw', fontWeight: 'bolder', letterSpacing: 0.6 }}>{item?.product?.productname}</div>
              <div style={{ color: '#2d2d2d', fontSize: '.8vw', fontWeight: 600, letterSpacing: 0.6 }}>{item?.productsubname}</div>

              <div style={{ color: '#666', fontWeight: 'bold', marginTop: 12, fontSize: 14 }}>
                {item?.offerprice > 0 ?
                  <div style={{ width: '90%', display: 'flex', justifyContent: 'space-evenly' }} >
                    <span style={{ color: '#000' }}>&#8377;{item?.offerprice}</span>
                    <span><s>&#8377;{item?.price}</s></span>
                    <span style={{ color: '#000' }}>&#8377;{item?.offerprice * item?.quntity}</span></div>
                  :
                  <div style={{ width: '90%', display: 'flex', justifyContent: 'space-evenly' }} >
                    <span>{item?.price}</span>
                    <span style={{ color: '#000' }}>&#8377;{item?.price * item?.quntity}</span></div>
                }
              </div>


              <div style={{ display: 'flex', alignItems: 'left', marginTop: '2%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ fontSize: '1vw', justifyContent: 'center' }}>COLOR</div>
                  <div style={{ borderLeft: '1px solid #ececec', height: 20, margin: 10, alignItems: 'center' }}></div>
                  <div style={{ fontSize: '1vw' }}>
                    <select style={{ width: 'auto', border: 'none', fontSize: '1vw', borderRadius: '3px', padding: '5%', height: 'auto', overflowY: 'scroll', maxHeight: '150px' }}>
                      <option>S</option>
                      <option data_testid="size-0">XS</option>
                      <option data_testid="size-1">S</option>
                      <option data_testid="size-2">M</option>
                      <option data_testid="size-3">L</option>
                      <option data_testid="size-4">XL</option>
                      <option data_testid="size-5">2XL</option>
                    </select>
                  </div>



                  <div style={{ marginTop: '7%' }}>
                    <PlusMinusComponent value={item.quntity} onChange={(v) => handleChange(v, item)} />
                  </div>


                </div>
              </div>

            </div>

          </Grid>
        </Grid>
        <div style={{ borderLeft: '10px solid #ececec', width: '90%', margin: 10, alignItems: 'center' }}></div>
      </div>

    ));
  };

  const showTotal = () => {
    return (
      <div style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: '5%' }}>
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
        <button style={{ backgroundColor: '#018849', color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 16, paddingBlock: 4, justifyContent: 'space-evenly', paddingRight: 10, paddingLeft: 10, width: '100%', borderBlockColor: '#018849' }} onClick={handleUserCheck}>CHECKOUT</button>

        <div >
          <div style={{ fontWeight: 'bold', marginTop: '5%' }}>WE ACCEPT:</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {ShowAllCards()}
          </div>
        </div>
        <div style={{ fontSize: '0.8vw', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>Got a discount code? Add it in the next step.</div>
      </div>
    );
  };



  return (
    <div style={{ width: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
             
                  marginLeft:sm_matches? '10%':md_matches?'15%':'20%', 
                  marginRight: '20%' 
                  }}>
      <Grid container spacing={1} style={{ width: '100%' }}>
        <Grid item xs={10}sm={8}md={4} >
          <div style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'white', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, padding: '0.8%' }}>
            <div style={{ fontWeight: 'bold', fontSize: '2vw', marginLeft: '5%' }}>MY BAG</div>
            <div style={{ fontSize: '1vw', marginRight: '5%' }}>Items are reserved for 60 minutes</div>
          </div>

          <div style={{ backgroundColor: 'white', width: '100%', marginTop: '2%', padding: '0.8%' }}>
            {showAllItems()}
          </div>

          <div style={{ marginTop: '2%', marginBottom: 10, backgroundColor: 'white', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, padding: '0.8%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '3%' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 10, }}>
                <img src={`${serverURL}/static/deliverytruck.png`} loading="lazy" style={{ width: 25, height: 25, objectFit: 'cover', marginTop: '2%' }} />
                <div style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: '1.1vw' }}>FREE * STANDARD DELIVERY.</div>
              </div>
              <div style={{ marginLeft: '14%', fontSize: '0.8vw', marginBottom: '2%' }}>Faster delivery options available to most countries.</div>
              <div style={{ marginLeft: '14%', marginTop: 5, fontSize: '0.8vw' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ textDecoration: 'underline', fontSize: '0.8vw' }}>More info</li>
                </ul>
              </div>
            </div>
          </div>
         {sm_matches? <div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: '1%' }}>
            {showTotal()}
          </div>:md_matches?<div style={{ backgroundColor: 'white', width: '100%', padding: '1%', marginTop: '1%' }}>
            {showTotal()}
          </div>:<></>}
        </Grid>
        {sm_matches?<></>:md_matches?<></>:<Grid item xs={8} >
          <div style={{ backgroundColor: 'white', width: '40%', padding: '1%', marginTop: '1%' }}>
            {showTotal()}
          </div>
        </Grid>}
      </Grid>
    </div>
  );
}

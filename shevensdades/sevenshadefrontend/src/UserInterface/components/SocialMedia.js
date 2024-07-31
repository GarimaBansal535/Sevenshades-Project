import { serverURL } from "../../services/FetchDjangoApiService"
import { Button } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery'

export default function SocailMedia(props){

    
  const sm_matches = useMediaQuery('(min-width:600px)')
  const md_matches = useMediaQuery('(min-width:768px)')

  return(< div >
    <div style={{ textAlign:'center',color:'black',fontSize:'1.5vw',fontWeight:'bold',padding:5}}>OR SIGN IN WITH....</div>
    <div style={{display: 'flex',
                 flexDirection:sm_matches?'row':md_matches?'column':'column', 
                 justifyContent:'space-between', 
                 alignItems: 'center'}}>
 
 <button style={{width: '120px', margin:'4%', backgroundColor:'white', display: 'flex', alignItems: 'center',border:'solid 2px #ddd'}}>
     <img src={`${serverURL}/static/google.webp`} loading="lazy" style={{ width: 30, height: 30 }}/>
     <span style={{marginLeft: '8px'}}>GOOGLE</span>
 </button>
 <button style={{width: '120px', margin:'4%', backgroundColor:'white', display: 'flex', alignItems: 'center',border:'solid 2px #ddd'}}>
     <img src={`${serverURL}/static/apple.png`} loading="lazy" style={{ width: 30, height: 30 }}/>
     <span style={{marginLeft: '8px'}}>APPLE</span>
 </button>
 <button style={{width: '125px', margin:'4%', backgroundColor:'white', display: 'flex', alignItems: 'center',border:'solid 2px #ddd'}}>
     <img src={`${serverURL}/static/facebook.png`} loading="lazy" style={{ width: 30, height: 30 }}/>
     <span style={{marginLeft: '8px'}}>FACEBOOK</span>
 </button>
</div>



</div>
  )
        
    
}
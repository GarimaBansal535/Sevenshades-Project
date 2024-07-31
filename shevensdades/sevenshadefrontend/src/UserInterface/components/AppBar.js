import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';

export default function AppBar(props){
    const theme = useTheme();
    const md_matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));

    return(<div style={{width:'100%', height:"20%",display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',background:'red' ,height:40}}>
           { sm_matches?<></>:md_matches?<></>:<Button style={{color:'black',borderRadius:0,fontWeight:700}} size="small" variant='outlined'>Women</Button>}
            <div style={{width:"80%",textAlign:'center',letterSpacing:1.5,fontWeight:700,fontSize:13,fontFamily:'Josefin+Sans'}}>SALE: UP TO 60% OFF</div>
            { sm_matches?<></>:md_matches?<></>:<Button style={{color:'black',borderRadius:0,fontWeight:700}} size="small" variant='outlined'>Men</Button>}
        </div>
       
       </div>)
}

import { useState } from "react"
import { serverURL } from "../../services/FetchDjangoApiService"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Navigate, useNavigate } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';



export default function ProductComponent(props) {
  
    const [icon, setIcon] = useState()
    
    const sm_matches = useMediaQuery('(min-width:600px)')
    const md_matches = useMediaQuery('(min-width:768px)')
  
    
    var nevigate=useNavigate()

     var items=props?.data
     

     const handlenextpage=(item)=>{
        
        nevigate('/thirdpage' ,{state:{product:item?.id}})

     }

    const ShowProduct = () => {
        return items?.map((item, index) => {
            return (<div style={{cursor:'pointer',
                                 width:sm_matches?270:md_matches?180:'100%',
                                 display: 'flex',
                                flexDirection: "column",
                                alignItems: 'center',
                                justifyContent:sm_matches?'center':md_matches?'space-around':'space-around', marginTop: '5px', position: 'relative' }} onClick={()=>handlenextpage(item)}>
                <img src={`${serverURL}/${item.producticon}`} loading="lazy" style={{ width:sm_matches?360:md_matches?"50%":'100%', height:sm_matches?380:md_matches?'auto':'auto' }} />
                <div style={{ width: 40, height: 40, borderRedius: '50%', background: '#FFFFEC', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', position: 'absolute', zIndex: 2, marginLeft: "60%", marginTop: '70%' }}>
                    {icon == index ? <FavoriteIcon onMouseOver={() => setIcon(index)} onMouseLeave={() => setIcon()} style={{ position: 'absolute', zIndex: 3 }} /> : <FavoriteBorderIcon onMouseOver={() => setIcon(index)} onMouseLeave={() => setIcon(index)} style={{ position: 'absolute', zIndex: 3 }} />} </div>
                <div style={{textAlign:'center', height:50}}>{item.productname}</div>
            </div>)
        })
    }


    return (<div style={{ width: '100%', height: 'auto', marginTop: '5px'}} >
        <div style={{
            fontFamily: 'Josefin+Sans',
            fontSize: '11px',
            fontWeight: 10,
            color: '#000000',
            fontWeight: 500,
            letterSpacing: 1,
            textAlign: 'center'
         }}>{items.length}styles found
        </div>
        <div   style={{width:'100%',
                       display: 'flex', 
                       flexWrap: "wrap", 
                       alignItems: 'center', 
                       justifyContent: sm_matches? 'center':md_matches?'space-around' : 'space-around', 
                       marginTop: '10px'}}>
            {ShowProduct()}
        </div>
    </div>)
}
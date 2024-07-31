import { serverURL } from "../../services/FetchDjangoApiService"
import Divider from '@mui/material/Divider';


export default function Bottom(props){
    var cards=[{id:'1',cardicon:'visa.png'},{id:'2',cardicon:'MasterCard.png'},{id:'2',cardicon:'pay.png'},{id:'3',cardicon:'american.png'},{id:'4',cardicon:'viisa.png'}]        
   
    var data=[{id:'7',dataicon:'facebook.jpg'},{id:'7',dataicon:'instagram.png'},{id:'7',dataicon:'snapchat.jpg'}]        
    
    const ShowAlldata=()=>{
        return data.map((item)=>{
            return(<div >
                <img src={`${serverURL}/static/${item.dataicon}`} loading="lazy" style={{width:'50%',marginRight:'18px'}}/>
            </div>)
        })
    }
    

    const ShowAllCards=()=>{
        return cards.map((item,index)=>{
            return(<div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{  overflow: 'hidden', width:35, height:25, marginBottom:1, backgroundColor: '#f2f2f2', margin:5  }}>
                <img src={`${serverURL}/static/${item.cardicon}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}   />
             </div>
            </div>)
        })
    }

    return(<div style={{width:"100%",dispaly:'flex',flexDirection:'column',background:'#ffff'}}>
    <Divider  style={{witdh:'100%'}}/>
    <div style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {ShowAlldata()}
                <Divider orientation="vertical" flexItem variant="middle" />
                {ShowAllCards()}
            </div>
    </div>)
}
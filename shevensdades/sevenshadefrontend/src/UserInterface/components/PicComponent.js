
import { serverURL } from "../../services/FetchDjangoApiService" 
export default function PicComponent(props){
    return(<div>
        <img src={`${serverURL}/static/pic5.png`}/>
    </div>)
}
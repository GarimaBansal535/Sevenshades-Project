export default function Banner2(props){
    return(<div style={{width:'100%',
                        height:180, 
                        background:"#9447ff",
                        marginTop:'30px',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-evenly',
                        alignItems:'center',
                        }}>
                    <div style={{marginTop:30,borderWidth:2,borderRadius:18,width:220,height:'auto',borderColor:'#ffff',borderStyle: 'solid'}}>
                        <div style={{textAlign:'center',letterSpacing:1,fontSize:22,fontWeight:700,color:'#ffff'}}>THE ASOS APP</div>
                    </div>
                     <div style={{textAlign:'center',letterSpacing:1.5,fontSize:25,fontWeight:700,color:'#ffff',fontFamily:'Josefin+Sans' }}>For exclusive discount that'll make you 'appy</div>        
                     <div style={{borderWidth:2,borderRadius:20,width:280,height:35,background:'#ffff',borderColor:'#ffff',borderStyle: 'solid'}}>
                        <div style={{textAlign:'center',letterSpacing:1,fontSize:22,fontWeight:800,color:'black',marginBottom:30}}>DOWNLOAD NOW</div>
                    </div>
                    </div>)
}

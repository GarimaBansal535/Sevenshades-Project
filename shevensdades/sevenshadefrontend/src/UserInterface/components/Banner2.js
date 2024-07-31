export default function Banner2(props){
    return(<div style={{width:'100%',
                        height:100, 
                        background:"#9CF0E0",
                        marginTop:'90px',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'space-evenly',
                        alignItems:'center',
                        }}>

              <div style={{ fontSize:'30px',
                            fontFamily:'Arial',
                            letterSpacing: '1.5px',
                            fontWeight:900,
                             color: '#000000',
                             fontStyle: 'italic',
                             lineheight: '32px'
                             }}>
                                UP TO 30% OFF ELITE GARMS!</div>
              <div style={{ fontFamily:'Josefin+Sans',
                           fontSize:'11px',
                           fontWeight:10,
                           color: '#000000',
                           fontWeight:500,
                           letterSpacing:1
              }}>Limited time only.Selected styles marked down as shown</div >
    </div>)
}
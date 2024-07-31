import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

export default function JoinSignComponent(props) {
  var navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/usersignin')
    

  }

  const handleJoin = () => {
    navigate('/userjoinin')
  

  }





  return (<div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ display: 'flex', JustifyContent: 'center', alignItems: 'center', borderBottom: props.joincolour ? '3px solid #0E46A3' : '3.5px solid #ececec', width: '100%', height: '25%' }}>
        <div onClick={handleJoin} style={{ padding: 5, width: '50%', cursor: 'pointer', textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#000' }}>Join</div>

      </div>
      <Divider orientation="vertical" flexItem variant="middle" style={{ display: "flex", marginBottom: '15px', border: '1.5px solid #ececec ' }} />
      <div style={{ width: '100%', borderBottom: props.signcolour ? '3.5px solid #0E46A3' : '3px solid #ececec' }}>
        <div onClick={handleSignIn} style={{ padding: 5, width: '50%', textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#000' }}>sign in</div>

      </div>
    </div>



  </div>)
}
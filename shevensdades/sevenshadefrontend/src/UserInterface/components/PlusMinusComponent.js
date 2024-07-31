import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { propsToClassKey } from "@mui/styles"
import useMediaQuery from '@mui/material/useMediaQuery'

export default function PlusMinus(props) {
    const [value, setValue] = useState(0)


    const sm_matches = useMediaQuery('(min-width:600px)')
    const md_matches = useMediaQuery('(min-width:768px)')

    useEffect(function () {
        setValue(props.value)

    }, [props.value])


    const handlePlus = () => {
        var v = value
        v = v + 1
        setValue(v)
        props.onChange(v)

    }
    const handleMinus = () => {
        var v = value
        if (v >= 1) {
            v = v - 1
            setValue(v)
        }
        props.onChange(v)

    }

    return (<div>
        {value == 0 ? <div style={{ width: 200 }}><Button onClick={handlePlus} fullWidth variant='contained' style={{ borderRadius: 0, height: 20, color: '#ffff', fontSize: 15, letterSpacing: 1.2, fontWeight: 700, background: '#018849', textAlign: 'center', alignContent: 'center', height: 40 }}>
            Add Card</Button></div> :
            <div style={{ width: sm_matches?'12vw':md_matches?'10vw':'4vw', display: 'flex', alignItems: 'center', justifyContent:'space-evenly' }}>
                <Button variant="contained" style={{ fontSize: '1.5vw', width:'1.5vw', background: '#000', color: '#fff', borderRadius: '0' }} onClick={handlePlus}>+</Button>
                <span style={{ fontSize: '1.5vw', fontWeight: 'bolder', width: '1.5vw', textAlign: 'center' }}>{value}</span>
                <Button variant="contained" style={{ fontSize: '1.5vw', width: '1.5vw', background: '#000', color: '#fff', borderRadius: '0' }} onClick={handleMinus}>-</Button>
            </div>}
    </div>)
}

import Header from "../components/Header"
import AppBar from "../components/AppBar"
import PaymentCardComponent from "../components/PaymentCardComponent"
import Bottom from "../components/Bottom"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { useState } from "react"
import BagItemsComponent from "../components/BagItemsComponent"

export default function AddBag(props) {

    var products = useSelector(state => state.product)
    const [pageRefresh, setPageRefresh] = useState(false)
    var productdata = Object.values(products)
    console.log(111111, productdata)

    return (<div style={{ background: '#eee', height: 'auto' }}>
        <Header />
        <AppBar position="static" />
        <BagItemsComponent data={productdata} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        <div style={{ marginTop: "60px" }}>
            <PaymentCardComponent />

            <Bottom />
            <Footer />
        </div>

    </div>)
}
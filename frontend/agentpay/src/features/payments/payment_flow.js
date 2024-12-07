import React from "react";
import PayButton from "./component/pay_button";


const PaymentFlow = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <PayButton />
        </div>
    );
};

export default PaymentFlow;

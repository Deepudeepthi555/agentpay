import React from "react";
import PayButton from "./component/pay_button";


const PaymentFlow = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <PayButton
                payee="0x9a9eDC4184Bf66D35b99FAD1Faf1FEea4F66D70e" // Replace with the payee/platform address
                amount="2" // Subscription amount in tokens
                interval={50} // Payment interval in seconds (e.g., 7 days)
            />
        </div>
    );
};

export default PaymentFlow;

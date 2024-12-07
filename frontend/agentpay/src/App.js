import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentFlow from "./features/payments/payment_flow";
import Dashboard from "./features/Dashboard/dashboard";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PaymentFlow />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

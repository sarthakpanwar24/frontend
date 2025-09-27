import React from 'react'
import VoucherForm from "./components/VoucherForm.jsx";
import { useState } from "react";

const Home = () => {
  const [justCreated, setJustCreated] = useState(null);

  const handleVoucherCreated = (voucher) => {
    setJustCreated(voucher);
    // Auto-clear the success message after 5 seconds
    setTimeout(() => setJustCreated(null), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voucher Receipt Management System</h1> 
      <VoucherForm onCreated={handleVoucherCreated} />
      
      {justCreated && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-semibold text-green-800">✅ Voucher Created Successfully!</h3>
          <p className="text-green-700">
            Voucher Number: <strong>{justCreated.voucherNumber}</strong>
          </p>
          <p className="text-sm text-green-600 mt-2">
            You can view all vouchers in the "All Vouchers" section.
          </p>
        </div>
      )}
    </div>
  )
}

export default Home

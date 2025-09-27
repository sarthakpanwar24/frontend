import React from 'react'
import VoucherList from "./components/VoucherList";
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // added ErrorBoundary

const AllVoucher = () => {
  return (
    <div>
      <ErrorBoundary>
        <VoucherList />
      </ErrorBoundary>
    </div>
  )
}

export default AllVoucher

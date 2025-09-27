// components/PrintableVoucher.jsx
import React, { forwardRef } from "react";

const VoucherPrint = forwardRef(({ voucher }, ref) => {
  if (!voucher) return null;

  return (
    <div
      ref={ref}
      className="p-8 text-black bg-white"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      <h1 className="text-2xl font-bold mb-4">Voucher Details</h1>
      <div className="mb-2">
        <h1 className="text-4xl text-center">
          <strong>{voucher.association}</strong>
        </h1>
        <br />
        <hr />
      </div>
      <div className="mb-2">
        <p className="mb-4">
          <strong>Voucher ID:</strong> #{voucher.id}
        </p>
        <hr />
        <p className="mb-4">
          <strong>Payee Name:</strong> {voucher.payee}
        </p>
        <hr />
      </div>
      <div className="mb-2">
        <p className="mb-4">
          <strong>Amount:</strong> ₹
          {Number(voucher.amount).toLocaleString("en-IN")}
        </p>
        <hr />
      </div>
      <div className="mb-2">
        <p className="mb-4">
          <strong>Purpose:</strong> {voucher.purpose}
        </p>
        <hr />
      </div>
      <div className="mb-2">
        <p className="mb-4">
          <strong>Date:</strong> {voucher.date}
        </p>
        <hr />
      </div>
      <div className="mb-6">
        <p className="mb-4">
          <strong>Approved By:</strong> {voucher.approvedBy}
        </p>
        <hr />
      </div>
      <footer className="mt-8 text-sm text-gray-600 text-center">
        Generated on {new Date().toLocaleString("en-IN")}
      </footer>
    </div>
  );
});

export default VoucherPrint;

import React, { useState } from "react";
import { createVoucher } from "../api.js";

const initial = {
  association: "Nunchaku Association of India",
  financialYear: "2025-26",
  date: new Date().toISOString().slice(0, 10),
  payee: "",
  amount: "",
  purpose: "",
  approvedBy: "",
};

export default function VoucherForm({ onCreated }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [generatedVoucher, setGeneratedVoucher] = useState(null);

  const handleChange = ({ target: { name, value } }) =>
    setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      if (!form.payee || !form.amount || !form.purpose || !form.approvedBy) {
        throw new Error("Please fill all required fields");
      }
      const { voucher } = await createVoucher({ ...form });
      onCreated?.(voucher);
      setGeneratedVoucher(voucher);
      setSuccess(true);
      setForm(initial);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handlePrint = () => {
  //   window.print();
  // };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-md shadow-sm space-y-3"
      >
        <h2 className="text-xl font-semibold">Create Voucher</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Association Name" name="association" value={form.association} onChange={handleChange} />
          <Field label="Financial Year" name="financialYear" value={form.financialYear} onChange={handleChange} />
          <Field label="Voucher Date" name="date" type="date" value={form.date} onChange={handleChange} />
          <Field label="Payee Name" name="payee" value={form.payee} onChange={handleChange} required />
          <Field label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} required />
          <Field label="Purpose" name="purpose" value={form.purpose} onChange={handleChange} required />
          <Field label="Approved By (Treasurer)" name="approvedBy" value={form.approvedBy} onChange={handleChange} required />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600 font-medium">Voucher generated successfully!</p>}
        <button disabled={loading} className="px-4 py-2 rounded bg-black text-white">
          {loading ? "Saving..." : "Generate Voucher"}
        </button>
      </form>

      {generatedVoucher && (
        <div className="border p-4 rounded-md shadow-md bg-white print:bg-white">
          <h3 className="text-lg font-semibold mb-2">Generated Voucher</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Voucher Number:</strong> {generatedVoucher.voucherNumber}</p>
            <p><strong>Association:</strong> {generatedVoucher.association}</p>
            <p><strong>Financial Year:</strong> {generatedVoucher.financialYear}</p>
            <p><strong>Date:</strong> {new Date(generatedVoucher.date).toLocaleDateString('en-IN')}</p>
            <p><strong>Payee:</strong> {generatedVoucher.payee}</p>
            <p><strong>Amount:</strong> ₹{Number(generatedVoucher.amount).toLocaleString('en-IN')}</p>
            <p><strong>Purpose:</strong> {generatedVoucher.purpose}</p>
            <p><strong>Approved By:</strong> {generatedVoucher.approvedBy}</p>
            <p><strong>Status:</strong> <span className="capitalize text-blue-600">{generatedVoucher.status}</span></p>
          </div>
          {/* <button
            onClick={handlePrint}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print Voucher
          </button> */}
        </div>
      )}
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <label className="flex flex-col text-sm">
      <span className="mb-1">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        className="border rounded px-3 py-2"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
      />
    </label>
  );
}
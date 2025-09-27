// components/VoucherList.jsx
import React, { useEffect, useRef, useState } from "react";
import { fetchVouchers, deleteVoucher, approveVoucher, rejectVoucher } from "../api";
import { useReactToPrint } from "react-to-print";
import VoucherPrint from "../components/VoucherPrint";

export default function VoucherList() {
  const [vouchers, setVouchers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const contentRef = useRef(null);

  // State and refs to handle the promise from onBeforePrint
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);

  // When isPrinting gets set to true, resolve the promise to let printing proceed
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  // Fetch vouchers on mount
  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchVouchers();
      console.log('Loaded vouchers:', data); // Debug log
      setVouchers(data);
    } catch (err) {
      console.error('Failed to load vouchers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log('Attempting to delete voucher with ID:', id); // Debug log
    if (!id) {
      alert("Error: Voucher ID is missing");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      try {
        await deleteVoucher(id);
        setVouchers(vouchers.filter(v => v.id !== id));
      } catch (err) {
        console.error('Delete error:', err);
        alert("Failed to delete voucher: " + err.message);
      }
    }
  };

  const handleApprove = async (id) => {
    console.log('Attempting to approve voucher with ID:', id); // Debug log
    if (!id) {
      alert("Error: Voucher ID is missing");
      return;
    }
    
    try {
      await approveVoucher(id, 'system');
      // Reload the vouchers list to ensure consistency
      await loadVouchers();
    } catch (err) {
      console.error('Approve error:', err);
      alert("Failed to approve voucher: " + err.message);
    }
  };

  const handleReject = async (id) => {
    console.log('Attempting to reject voucher with ID:', id); // Debug log
    if (!id) {
      alert("Error: Voucher ID is missing");
      return;
    }
    
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      try {
        await rejectVoucher(id, reason);
        // Reload the vouchers list to ensure consistency
        await loadVouchers();
      } catch (err) {
        console.error('Reject error:', err);
        alert("Failed to reject voucher: " + err.message);
      }
    }
  };

  // Configure react-to-print using the official structure
  const handlePrint = useReactToPrint({
    contentRef, // pass the ref directly (it must be a ref object)
    onBeforePrint: () =>
      new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
      // Optionally reset selected voucher after printing
      setSelected(null);
    },
    documentTitle: selected ? `Voucher-${selected.id}` : "Voucher",
  });

  // Print button handler: set the voucher and trigger printing.
  const onPrintClick = (voucher) => {
    setSelected(voucher);
    handlePrint();
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold mb-4">All Vouchers</h2>
        <p>Loading vouchers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold mb-4">All Vouchers</h2>
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={loadVouchers}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Vouchers ({vouchers.length})</h2>
        <button 
          onClick={loadVouchers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      
      {vouchers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No vouchers found. Create your first voucher!</p>
        </div>
      ) : (
        <div className="overflow-auto mb-8">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Voucher #",
                  "Date", 
                  "Association",
                  "Payee",
                  "Amount",
                  "Purpose",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="border px-2 py-1 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1 font-mono text-sm">{v.voucherNumber || 'N/A'}</td>
                  <td className="border px-2 py-1">{v.date}</td>
                  <td className="border px-2 py-1">{v.association}</td>
                  <td className="border px-2 py-1">{v.payee}</td>
                  <td className="border px-2 py-1">
                    ₹{Number(v.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="border px-2 py-1 max-w-xs truncate" title={v.purpose}>
                    {v.purpose}
                  </td>
                  <td className="border px-2 py-1">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusColor(v.status)}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="border px-2 py-1">
                    <div className="flex gap-1 flex-wrap">
                      <button
                        className="px-2 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
                        onClick={() => onPrintClick(v)}
                      >
                        Print
                      </button>
                      {v.status === 'draft' && (
                        <button
                          className="px-2 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700"
                          onClick={() => handleApprove(v.id)}
                        >
                          Approve
                        </button>
                      )}
                      {v.status === 'draft' && (
                        <button
                          className="px-2 py-1 rounded bg-yellow-600 text-white text-xs hover:bg-yellow-700"
                          onClick={() => handleReject(v.id)}
                        >
                          Reject
                        </button>
                      )}
                      {(v.status === 'draft' || v.status === 'rejected') && (
                        <button
                          className="px-2 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
                          onClick={() => handleDelete(v.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hidden printable area */}
      <div style={{ display: "none" }}>
        <VoucherPrint ref={contentRef} voucher={selected} />
      </div>
    </div>
  );
}
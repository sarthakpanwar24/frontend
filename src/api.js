const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const createVoucher = async (payload) => {
  try {
    const res = await fetch(`${BASE}/api/vouchers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      // Handle new error response format
      const errorMessage = data.error?.message || data.message || "Failed to create voucher";
      throw new Error(errorMessage);
    }
    
    // Return voucher from new response format
    return { voucher: data.data };
  } catch (error) {
    throw new Error(error.message || "Failed to create voucher");
  }
};

export const fetchVouchers = async () => {
  try {
    const res = await fetch(`${BASE}/api/vouchers`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      }
    });
    const data = await res.json();
    
    if (!res.ok) {
      const errorMessage = data.error?.message || data.message || "Failed to fetch vouchers";
      throw new Error(errorMessage);
    }
    
    // Transform MongoDB response to frontend format
    const vouchers = data.data.map(voucher => ({
      ...voucher,
      id: voucher._id, // Map _id to id for frontend compatibility
      date: formatDate(voucher.date)
    }));
    
    return vouchers;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch vouchers");
  }
};

// Helper function to format date for display
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

// Additional API functions for full CRUD operations
export const getVoucherById = async (id) => {
  try {
    const res = await fetch(`${BASE}/api/vouchers/${id}`);
    const data = await res.json();
    
    if (!res.ok) {
      const errorMessage = data.error?.message || "Failed to fetch voucher";
      throw new Error(errorMessage);
    }
    
    return {
      ...data.data,
      id: data.data._id,
      date: formatDate(data.data.date)
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch voucher");
  }
};

export const updateVoucher = async (id, payload) => {
  try {
    const res = await fetch(`${BASE}/api/vouchers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      const errorMessage = data.error?.message || "Failed to update voucher";
      throw new Error(errorMessage);
    }
    
    return {
      ...data.data,
      id: data.data._id,
      date: formatDate(data.data.date)
    };
  } catch (error) {
    throw new Error(error.message || "Failed to update voucher");
  }
};

export const deleteVoucher = async (id) => {
  try {
    const res = await fetch(`${BASE}/api/vouchers/${id}`, {
      method: "DELETE",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      }
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      console.error('Delete API Error Response:', {
        status: res.status,
        statusText: res.statusText,
        data: data
      });
      const errorMessage = data.error?.message || data.message || "Failed to delete voucher";
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error('Delete API Error:', error);
    throw new Error(error.message || "Failed to delete voucher");
  }
};

export const approveVoucher = async (id, approvedBy = 'system') => {
  try {
    const res = await fetch(`${BASE}/api/vouchers/${id}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approvedBy }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      const errorMessage = data.error?.message || "Failed to approve voucher";
      throw new Error(errorMessage);
    }
    
    return {
      ...data.data,
      id: data.data._id,
      date: formatDate(data.data.date)
    };
  } catch (error) {
    throw new Error(error.message || "Failed to approve voucher");
  }
};

export const rejectVoucher = async (id, reason) => {
  try {
    const res = await fetch(`${BASE}/api/vouchers/${id}/reject`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      const errorMessage = data.error?.message || "Failed to reject voucher";
      throw new Error(errorMessage);
    }
    
    return {
      ...data.data,
      id: data.data._id,
      date: formatDate(data.data.date)
    };
  } catch (error) {
    throw new Error(error.message || "Failed to reject voucher");
  }
};

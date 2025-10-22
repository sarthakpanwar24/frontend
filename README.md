# Voucher Receipt App - Frontend

A modern React-based frontend application for managing voucher receipts with a clean, responsive interface built with Vite and Tailwind CSS.

## 🚀 Features

### Core Functionality

- **Voucher Management**: Create, view, edit, and delete vouchers
- **Status Management**: Handle voucher workflows (Draft → Pending → Approved/Rejected)
- **Print Support**: Print vouchers with professional formatting
- **Real-time Updates**: Live data synchronization with backend
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Interface

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Interactive Tables**: Sortable and filterable voucher lists
- **Status Indicators**: Color-coded status badges for easy identification
- **Form Validation**: Client-side validation with user-friendly error messages
- **Loading States**: Smooth loading indicators and error handling

### Technical Features

- **Cache-busting**: Prevents stale data with proper cache headers
- **Error Boundaries**: Graceful error handling and recovery
- **Component Architecture**: Modular, reusable React components
- **API Integration**: RESTful API integration with proper error handling

## 🛠️ Tech Stack

- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **React Router DOM 7.8.2** - Client-side routing
- **React-to-Print 3.1.1** - Professional printing functionality
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ErrorBoundary.jsx   # Error handling component
│   ├── Navbar.jsx          # Navigation component
│   ├── VoucherForm.jsx     # Voucher creation/editing form
│   ├── VoucherList.jsx     # Voucher display and management
│   └── VoucherPrint.jsx    # Print-optimized voucher layout
├── api.js               # API communication layer
├── App.jsx              # Main application component
├── Home.jsx             # Home page component
├── AllVoucher.jsx       # All vouchers page
├── main.jsx             # Application entry point
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager
- Backend API server running on port 3000

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd voucher-receipt-app/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📋 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production-ready application       |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:3000)

### Build Configuration

The application uses Vite for building and bundling. Configuration can be modified in `vite.config.js`.

## 📱 Components Overview

### VoucherForm

- Form for creating and editing vouchers
- Real-time validation and error handling
- Auto-generated voucher numbers
- Date and amount formatting

### VoucherList

- Displays all vouchers in a responsive table
- Status-based action buttons (Approve, Reject, Delete)
- Print functionality for individual vouchers
- Real-time status updates

### VoucherPrint

- Print-optimized voucher layout
- Professional formatting for physical documents
- Responsive design for different paper sizes

### ErrorBoundary

- Catches and handles React component errors
- Provides fallback UI for better user experience
- Logs errors for debugging

## 🎨 Styling

The application uses Tailwind CSS for styling:

- **Utility-first approach** for rapid development
- **Responsive design** with mobile-first approach
- **Custom color scheme** for status indicators
- **Consistent spacing and typography**

### Status Color Coding

- 🟢 **Approved**: Green background
- 🔴 **Rejected**: Red background
- 🟡 **Pending**: Yellow background
- ⚪ **Draft**: Gray background

## 🔌 API Integration

The frontend communicates with the backend through a RESTful API:

### Endpoints Used

- `GET /api/vouchers` - Fetch all vouchers
- `POST /api/vouchers` - Create new voucher
- `GET /api/vouchers/:id` - Get specific voucher
- `PUT /api/vouchers/:id` - Update voucher
- `DELETE /api/vouchers/:id` - Delete voucher
- `PATCH /api/vouchers/:id/approve` - Approve voucher
- `PATCH /api/vouchers/:id/reject` - Reject voucher

### Error Handling

- Network error handling with user-friendly messages
- Validation error display with field-specific feedback
- Retry mechanisms for failed requests
- Loading states for better user experience

## 🚀 Deployment

### Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

- **Vercel**: Zero-config deployment with automatic builds
- **Netlify**: Static site hosting with continuous deployment
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

### Environment Setup

Ensure the following environment variables are set in production:

- `VITE_API_URL` - Production API URL

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend CORS is configured for your frontend URL
   - Check that API_URL is correctly set

2. **Build Failures**

   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility

3. **API Connection Issues**
   - Verify backend server is running
   - Check network connectivity and firewall settings

### Debug Mode

Enable debug mode by setting:

```env
VITE_DEBUG=true
```

---

**Happy coding!** 🎉

For backend see [Backend](https://github.com/sarthakpanwar24/backend)

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import CustomerHomePage from "./components/CustomerHomePage";
import Product from "./components/Product";
import Wishlist from "./components/Wishlist";
import NotFound from "./components/ErrorPages/NotFound";
import Cart from "./components/Cart";
import UserOrders from "./components/UserOrders";
import Review from "./components/Reviews";

// A wrapper for protected routes
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery); // Update the search term in the state
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Navbar onSearch={handleSearch} /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <CustomerHomePage searchTerm={searchTerm} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
             element={
              <ProtectedRoute>
                <UserOrders />
              </ProtectedRoute>
            }
             />


          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

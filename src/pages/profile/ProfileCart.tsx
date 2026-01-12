import { Navigate } from "react-router-dom";

// Redirect to main cart page
export default function ProfileCart() {
  return <Navigate to="/cart" replace />;
}

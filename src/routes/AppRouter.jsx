import { Routes, Route, Navigate } from "react-router-dom";
import roles from "../constants/roles";

import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import WelcomePage from "../pages/auth/WelcomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyPage from "../pages/auth/VerifyPage";

import HomePage from "../pages/user/HomePage";
import SearchPage from "../pages/user/SearchPage";
import ShopDetailsPage from "../pages/user/ShopDetailsPage";
import BookingPage from "../pages/user/BookingPage";
import BookingSuccessPage from "../pages/user/BookingSuccessPage";
import MyAppointmentsPage from "../pages/user/MyAppointmentsPage";
import ProfilePage from "../pages/user/ProfilePage";

import BarbershopDashboardPage from "../pages/barbershop/BarbershopDashboardPage";
import SchedulePage from "../pages/barbershop/SchedulePage";
import BookingsPage from "../pages/barbershop/BookingsPage";
import ServicesPage from "../pages/barbershop/ServicesPage";
import AnalyticsPage from "../pages/barbershop/AnalyticsPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import BarbershopsPage from "../pages/admin/BarbershopsPage";
import ReviewsPage from "../pages/admin/ReviewsPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function AppRouter() {
  return (
    <Routes>
      {/* auth — без навигации */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Route>

      {/* user — Header + BottomNav */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/shops/:id" element={<ShopDetailsPage />} />
          <Route path="/booking/:shopId" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/appointments" element={<MyAppointmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* barbershop — Sidebar + Topbar */}
      <Route element={<RoleRoute allowedRoles={[roles.Barbershop]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/barbershop/dashboard" element={<BarbershopDashboardPage />} />
          <Route path="/barbershop/schedule" element={<SchedulePage />} />
          <Route path="/barbershop/bookings" element={<BookingsPage />} />
          <Route path="/barbershop/services" element={<ServicesPage />} />
          <Route path="/barbershop/analytics" element={<AnalyticsPage />} />
        </Route>
      </Route>

      {/* admin — Sidebar + Topbar */}
      <Route element={<RoleRoute allowedRoles={[roles.Admin]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/barbershops" element={<BarbershopsPage />} />
          <Route path="/admin/reviews" element={<ReviewsPage />} />
        </Route>
      </Route>

      {/* catch-all — любой неизвестный путь → WelcomePage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;

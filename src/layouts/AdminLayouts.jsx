// LayoutAdmin.jsx
import React from "react";
import Swal from "sweetalert2";
import SolidButton from "../components/Button";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux"; // Mengimpor useDispatch

export default function AdminLayouts() {
  return (
    <div className="flex flex-row min-h-screen">
      <Sider />
      <Content />
    </div>
  );
}

function Sider() {
  return (
    <aside className="w-64 bg-indigo-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Aplikasi Terkini</h1>
        <nav className="ml-4 mt-2">
          <ul>
            <SiderItem item="Dashboard" url="/admin" />
            <SiderItem item="Mahasiswa" url="/admin/mahasiswa" />
            <SiderItem item="Settings" />
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function Content() {
  return (
    <div className="flex flex-1 flex-col bg-blue-50">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function SiderItem(props) {
  return (
    <li className="hover:bg-indigo-800">
      <Link to={props.url}>{props.item}</Link>
    </li>
  );
}

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());

    Swal.fire({
      icon: "success",
      title: "Logout Berhasil",
      text: "Logout Berhasil",
    });

    navigate("/");
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-end">
        {/* <p>{user ? user.name : "Guest"}</p> */}
        <SolidButton
          onClick={handleLogout}
          styleClass={
            "bg-blue-500 text-white rounded rounded hover:bg-blue-600"
          }
          text={"Logout"}
        />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-indigo-900 p-4 text-white text-center">
      &copy; Admin 2024
    </footer>
  );
}

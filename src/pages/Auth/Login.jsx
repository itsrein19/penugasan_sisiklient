import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.code === 200) {
        const { user, token } = response.data.data;
        dispatch(login({ user, token })); // Simpan token di Redux
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: response.data.message,
        });
        navigate("/admin");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Silahkan coba lagi",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Masuk Akun
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-600">Email</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              name="email"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              name="password"
              placeholder="Masukkan password"
            />
          </div>
          <div>
            <button
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Belum punya akun?{" "}
          <a href="register" className="text-blue-500">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}

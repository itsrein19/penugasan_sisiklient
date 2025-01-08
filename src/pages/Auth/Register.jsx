import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/register",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.code === 201) {
        Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil",
          text: response.data.message,
        });
        setForm({ name: "", email: "", password: "" });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text: error.response?.data?.message || "Silahkan coba lagi",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Daftar Akun
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-600">Nama</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              name="name"
              placeholder="Masukkan nama Anda"
            />
          </div>
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
              Daftar
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Sudah punya akun? <a href="../" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}

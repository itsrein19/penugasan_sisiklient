import React, { useEffect } from "react";
import SolidButton from "../../components/Button";
import TableMhs from "../../components/Table";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Mahasiswa() {
  const navigate = useNavigate();
  const [isModalTambahVisible, setIsShowModalTambah] = useState(false);
  const [isModalEditVisible, setIsShowModalEdit] = useState(false);
  const [form, setForm] = useState({
    progdi_id: "",
    nim: "",
    nama: "",
    alamat: "",
    umur: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [mhsData, setData] = useState([]);

  const showModalTambah = () => {
    setIsShowModalTambah(true);
  };
  const showModalEdit = (mahasiswa) => {
    setForm({
      progdi_id: mahasiswa.progdi_id,
      nim: mahasiswa.nim,
      nama: mahasiswa.nama,
      alamat: mahasiswa.alamat,
      umur: mahasiswa.umur,
      id: mahasiswa.id,
    });
    setIsShowModalEdit(true);
  };
  const hideModalTambah = () => {
    setIsShowModalTambah(false);
    setForm({ progdi_id: "", nim: "", nama: "", alamat: "", umur: "" });
  };
  const hideModalEdit = () => {
    setIsShowModalEdit(false);
    setForm({ progdi_id: "", nim: "", nama: "", alamat: "", umur: "" });
  };

  // const token = localStorage.getItem("authToken");
  const token = useSelector((state) => state.auth.token);

  const getMahasiswa = async (e) => {
    console.log("token" + token);
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://demo-api.syaifur.io/api/mahasiswa",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.code === 200) {
        // console.log("data", response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ambil data mahasiswa gagal",
        text: error.response?.data?.message || "Silahkan coba lagi",
      });
    }
  };

  const handleCreateMahasiswa = async (e) => {
    e.preventDefault();
    console.log("api sebelum try");
    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/mahasiswa",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("api setelah axios");
      console.log("code", response.data.code);

      if (response.data.code === 201) {
        Swal.fire({
          icon: "success",
          title: "Data berhasil ditambahkan",
          text: response.data.message,
        });
      }
      await getMahasiswa();
      hideModalTambah();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tambah data gagal",
        text: error.response?.data?.message || "Silahkan coba lagi",
      });
    }
  };

  const handleEditMahasiswa = async (e) => {
    e.preventDefault();
    console.log("api sebelum try");
    try {
      const response = await axios.put(
        `http://demo-api.syaifur.io/api/mahasiswa/${form.id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("api setelah axios");
      console.log("code", response.data.code);

      if (response.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Data berhasil diedit",
          text: response.data.message,
        });
      }
      await getMahasiswa();
      hideModalEdit();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tambah data gagal",
        text: error.response?.data?.message || "Silahkan coba lagi",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("sebelum api");
          const response = await axios.delete(
            `http://demo-api.syaifur.io/api/mahasiswa/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          console.log("code", response.data.code);

          if (response.data.code === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            await getMahasiswa();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data mahasiswa",
            text: error.response?.data?.message || "Silahkan coba lagi",
          });
        }
      }
    });
  };

  useEffect(() => {
    getMahasiswa();
  }, []);

  return (
    <div className="flex-grow">
      <ListMhs onOpenTambah={showModalTambah} />
      <Main
        data={mhsData}
        onOpenEdit={showModalEdit}
        handleDelete={handleDelete}
      />
      {isModalTambahVisible && (
        <ModalTambah
          onClose={hideModalTambah}
          handleCreateMahasiswa={handleCreateMahasiswa}
          form={form}
          handleChange={handleChange}
        />
      )}
      {isModalEditVisible && (
        <ModalEdit
          onClose={hideModalEdit}
          handleEditMahasiswa={handleEditMahasiswa}
          form={form}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}

function ListMhs({ onOpenTambah }) {
  return (
    <div className="flex justify-between p-4">
      <h1 className="font-bold text-xl">List Mahasiswa</h1>
      <SolidButton
        styleClass={"bg-green-500 text-white rounded hover:bg-green-600"}
        text={"Tambah"}
        onClick={onOpenTambah}
      />
    </div>
  );
}

function Main({ data, onOpenEdit, handleDelete }) {
  return (
    <div className="p-4">
      {/* Card */}
      <TableMhs
        data={data}
        onOpenEdit={onOpenEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

function ModalTambah({ onClose, handleCreateMahasiswa, form, handleChange }) {
  return (
    <div
      id="modal-tambah"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-xl font-bold mb-4">Tambah Mahasiswa</h1>
        <form onSubmit={handleCreateMahasiswa} className="space-y-2">
          <div className="mb-4">
            <label for="nama">Progdi ID</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.progdi_id}
              onChange={handleChange}
              name="progdi_id"
              placeholder="Masukkan progdi_id anda"
            />
            <label for="nama">Nama</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.nama}
              onChange={handleChange}
              name="nama"
              placeholder="Masukkan nama anda"
            />
            <label for="nim" className="mt-4">
              NIM
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.nim}
              onChange={handleChange}
              name="nim"
              placeholder="Masukkan nim anda"
            />
            <label for="alamat" className="mt-4">
              Alamat
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.alamat}
              onChange={handleChange}
              name="alamat"
              placeholder="Masukkan alamat anda"
            />
            <label for="alamat" className="mt-4">
              Umur
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.umur}
              onChange={handleChange}
              name="umur"
              placeholder="Masukkan umur anda"
            />
          </div>
          <div className="flex justify-end">
            <SolidButton
              styleClass={
                "bg-gray-500 text-white text-white rounded mr-2 hover:bg-gray-600"
              }
              text={"Batal"}
              onClick={onClose}
            />
            <SolidButton
              styleClass={
                "bg-green-500 text-white text-white rounded hover:bg-green-600"
              }
              text={"Simpan"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalEdit({ onClose, handleEditMahasiswa, form, handleChange }) {
  return (
    <div
      id="modal-edit"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-xl font-bold mb-4">Edit Mahasiswa</h1>
        <form onSubmit={handleEditMahasiswa} className="space-y-2">
          <div className="mb-4">
            <label for="nama">Progdi ID</label>
            <input
              disabled
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.progdi_id}
              onChange={handleChange}
              name="progdi_id"
              placeholder="Masukkan progdi_id anda"
            />
            <label for="nama">Nama</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.nama}
              onChange={handleChange}
              name="nama"
              placeholder="Masukkan nama anda"
            />
            <label for="nim" className="mt-4">
              NIM
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.nim}
              onChange={handleChange}
              name="nim"
              placeholder="Masukkan nim anda"
            />
            <label for="alamat" className="mt-4">
              Alamat
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.alamat}
              onChange={handleChange}
              name="alamat"
              placeholder="Masukkan alamat anda"
            />
            <label for="alamat" className="mt-4">
              Umur
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg mt-2"
              value={form.umur}
              onChange={handleChange}
              name="umur"
              placeholder="Masukkan umur anda"
            />
          </div>
          <div className="flex justify-end">
            <SolidButton
              styleClass={
                "bg-gray-500 text-white text-white rounded mr-2 hover:bg-gray-600"
              }
              text={"Batal"}
              onClick={onClose}
            />
            <SolidButton
              styleClass={
                "bg-green-500 text-white text-white rounded hover:bg-green-600"
              }
              text={"Simpan"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

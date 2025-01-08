// Table.jsx (dalam folder components)

import React from 'react';
import Baris from './Baris'; // Import Baris component

export default function TableMhs({ data, onOpenEdit, handleDelete }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">NIM</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Baris
              key={index}
              id={item.id}
              no={index + 1}
              nama={item.nama}
              nim={item.nim}
              onOpenEdit={() => onOpenEdit(item)}
              handleDelete={() => handleDelete(item.id)}
            />
          ))}
        </tbody>
      </table>
      {data.length === 0 && <p className="text-center">Sedang memproses data...</p>}

    </div>
  );
}

// Baris.jsx (dalam folder components)

import React from "react";
import SolidButton from "./Button";

export default function Baris({ id, no, nama, nim, onOpenEdit, handleDelete }) {
  return (
    <tr>
      <td className="border px-4 py-2">{no}</td>
      <td className="border px-4 py-2">{nama}</td>
      <td className="border px-4 py-2">{nim}</td>
      <td className="border px-4 py-2">
        <SolidButton
          styleClass={
            "button-edit bg-yellow-500 text-white rounded text-white hover:bg-yellow-600 mr-2"
          }
          text={"Edit"}
          onClick={onOpenEdit}
        />
        <SolidButton
          styleClass={"hapus bg-red-500 rounded text-white hover:bg-red-600"}
          text={"Delete"}
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}

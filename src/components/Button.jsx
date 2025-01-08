import React from 'react';

export default function SolidButton({ styleClass, text, onClick, type}) {
  return (
    <button className={`${styleClass} px-4 py-2 rounded`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

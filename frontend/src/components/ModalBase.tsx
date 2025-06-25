// src/components/ModalBase.tsx
import React from 'react';

interface ModalBaseProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  children: React.ReactNode;
}

export function ModalBase({
  aberto,
  aoFechar,
  titulo,
  children,
}: ModalBaseProps) {
  if (!aberto) return null;

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-xl shadow-xl w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>{titulo}</h2>
          <button
            onClick={aoFechar}
            className='text-sm text-gray-500 hover:text-red-600'
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

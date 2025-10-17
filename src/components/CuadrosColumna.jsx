import React from 'react';
import '../index.css';

// Componente decorativo: una columna de cuadros alternando azul y amarillo
export default function CuadrosColumna({ count = 6, className = '' }) {
  const boxes = Array.from({ length: count });
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {boxes.map((_, i) => (
        <div
          key={i}
          className={`h-6 w-12 rounded-sm ${i % 2 === 0 ? 'bg-blue-500' : 'bg-yellow-400'}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Sass/Material.scss';

export default function MaterialsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pdfUrl = searchParams.get('pdfUrl');

  return (
    <div className="MaterialsPage">
      <div className="PDFContainer">
        {pdfUrl && <object data={pdfUrl} type="application/pdf" width="100%" height="100%"></object>}
      </div>
    </div>
  );
}

import React from 'react';

const Mapa = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <iframe
        title="MAS Contractors LLC — 411 Branchway Rd, North Chesterfield VA"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4422981059597!2d-77.60560433721008!3d37.497485112756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b16d7f234f05ff%3A0x8932627d12bbc8b!2s411%20Branchway%20Rd%20%23107%2C%20North%20Chesterfield%2C%20VA%2023236%2C%20EE.%20UU.!5e0!3m2!1ses!2scr!4v1762883619094!5m2!1ses!2scr"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Mapa;

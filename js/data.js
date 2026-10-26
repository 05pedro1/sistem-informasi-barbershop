// js/data.js - Data awal dan konfigurasi localStorage untuk WALLA BARBERSHOP

const initialServices = [
    { id: "SRV-01", name: "Haircut", price: 25000, duration: "30 menit", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=500&q=80", desc: "Potong rambut standar dengan teknik modern & rapi." },
    { id: "SRV-02", name: "Haircut + Wash", price: 35000, duration: "40 menit", image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=500&q=80", desc: "Potong rambut lengkap dengan pencucian rambut menyegarkan." },
    { id: "SRV-03", name: "Haircut + Styling", price: 40000, duration: "40 menit", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80", desc: "Potong rambut profesional disertai aplikasi pomade/styling." },
    { id: "SRV-04", name: "Kids Haircut", price: 20000, duration: "25 menit", image: "https://images.unsplash.com/photo-1517832606293-7ae2fc733aa7?auto=format&fit=crop&w=500&q=80", desc: "Potong rambut khusus anak-anak dengan pendekatan ramah." },
    { id: "SRV-05", name: "Haircut + Beard Trim", price: 40000, duration: "45 menit", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=500&q=80", desc: "Paket lengkap potong rambut dan perawatan/merapikan janggut." }
];

const initialBarbers = [
    { id: "BRB-01", name: "Rian Pratama", specialty: "Fade & Modern Cut", status: "Aktif", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
    { id: "BRB-02", name: "Budi Santoso", specialty: "Classic & Beard Trim", status: "Aktif", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
    { id: "BRB-03", name: "Joko Anwar", specialty: "Styling & Crew Cut", status: "Aktif", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
];

// Inisialisasi LocalStorage jika belum ada
function initializeLocalStorage() {
    if (!localStorage.getItem('walla_services')) {
        localStorage.setItem('walla_services', JSON.stringify(initialServices));
    }
    if (!localStorage.getItem('walla_barbers')) {
        localStorage.setItem('walla_barbers', JSON.stringify(initialBarbers));
    }
    if (!localStorage.getItem('walla_bookings')) {
        localStorage.setItem('walla_bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('walla_queues')) {
        localStorage.setItem('walla_queues', JSON.stringify([]));
    }
    if (!localStorage.getItem('walla_transactions')) {
        localStorage.setItem('walla_transactions', JSON.stringify([]));
    }
}

// Jalankan inisialisasi saat file dimuat
initializeLocalStorage();
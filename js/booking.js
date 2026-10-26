// js/booking.js - Logika Pemprosesan Booking dan Pembuatan Nomor Antrean

document.addEventListener('DOMContentLoaded', () => {
    populateOptions();
    checkUrlParams();
    setMinDate();

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
});

// Minimal pilihan tanggal adalah hari ini
function setMinDate() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}

// Mengisi dropdown Layanan dan Barber dari localStorage
function populateOptions() {
    const serviceSelect = document.getElementById('serviceSelect');
    const barberSelect = document.getElementById('barberSelect');

    const services = JSON.parse(localStorage.getItem('walla_services')) || [];
    const barbers = JSON.parse(localStorage.getItem('walla_barbers')) || [];

    if (serviceSelect) {
        services.forEach(srv => {
            const option = document.createElement('option');
            option.value = srv.id;
            option.textContent = `${srv.name} - Rp ${srv.price.toLocaleString('id-ID')}`;
            serviceSelect.appendChild(option);
        });
    }

    if (barberSelect) {
        barbers.forEach(brb => {
            if (brb.status === 'Aktif') {
                const option = document.createElement('option');
                option.value = brb.id;
                option.textContent = `${brb.name} (${brb.specialty})`;
                barberSelect.appendChild(option);
            }
        });
    }
}

// Mengecek jika pelanggan datang dari tombol "Pilih Layanan" di Halaman Layanan/Beranda
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedServiceId = urlParams.get('service');
    if (selectedServiceId) {
        const serviceSelect = document.getElementById('serviceSelect');
        if (serviceSelect) {
            serviceSelect.value = selectedServiceId;
        }
    }
}

// Penanganan submit form booking
function handleBookingSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const serviceId = document.getElementById('serviceSelect').value;
    const barberId = document.getElementById('barberSelect').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    if (!name || !phone || !serviceId || !barberId || !date || !time) {
        alert('Harap isi semua bidang form secara lengkap!');
        return;
    }

    const services = JSON.parse(localStorage.getItem('walla_services')) || [];
    const barbers = JSON.parse(localStorage.getItem('walla_barbers')) || [];
    const bookings = JSON.parse(localStorage.getItem('walla_bookings')) || [];

    const selectedService = services.find(s => s.id === serviceId);
    const selectedBarber = barbers.find(b => b.id === barberId);

    // Pembuatan Nomor Antrean Otomatis (Format: A-001, A-002, dst)
    const totalTodayBookings = bookings.filter(b => b.date === date).length;
    const queueNumberSeq = totalTodayBookings + 1;
    const queueNumber = `A-${String(queueNumberSeq).padStart(3, '0')}`;
    const bookingCode = `WLB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
        code: bookingCode,
        queueNumber: queueNumber,
        customerName: name,
        customerPhone: phone,
        serviceId: serviceId,
        serviceName: selectedService.name,
        price: selectedService.price,
        duration: selectedService.duration,
        barberId: barberId,
        barberName: selectedBarber.name,
        date: date,
        time: time,
        status: 'Menunggu', // Menunggu, Dipanggil, Sedang Dilayani, Selesai, Dibatalkan, Terlewat
        paymentStatus: 'Belum Dibayar',
        createdAt: new Date().toISOString()
    };

    // Simpan ke localStorage
    bookings.push(newBooking);
    localStorage.setItem('walla_bookings', JSON.stringify(bookings));

    // Tampilkan Modal Tiket
    showTicketModal(newBooking);
}

function showTicketModal(booking) {
    document.getElementById('ticketQueueNum').textContent = booking.queueNumber;
    document.getElementById('ticketCode').textContent = booking.code;
    document.getElementById('ticketName').textContent = booking.customerName;
    document.getElementById('ticketService').textContent = booking.serviceName;
    document.getElementById('ticketBarber').textContent = booking.barberName;
    document.getElementById('ticketDate').textContent = booking.date;
    document.getElementById('ticketTime').textContent = booking.time;
    document.getElementById('ticketPrice').textContent = `Rp ${booking.price.toLocaleString('id-ID')}`;

    document.getElementById('ticketModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('ticketModal').style.display = 'none';
    document.getElementById('bookingForm').reset();
    setMinDate();
}
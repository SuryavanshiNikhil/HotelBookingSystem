import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendBookingStatusEmail(toEmail, status, room, dates) {
  let subject;
  let extraLine = "";

  if (status === "Approved") {
    subject = "Your Room Booking is Approved - Please Complete Payment";
    extraLine = "Your booking has been approved. Please complete the payment to confirm your room.";
  } else if (status === "Rejected") {
    subject = "Your Room Booking Request is Rejected";
    extraLine = "Unfortunately, your booking request was rejected.";
  } else {
    subject = `Your Room Booking Status: ${status}`;
  }

  const html = `
    <h2>Hotel Room Booking - Status Update</h2>
    <p>Your booking status: <strong>${status}</strong></p>
    <p>${extraLine}</p>
    <p><strong>Room:</strong> ${room.roomNumber} (${room.type})</p>
    <p><strong>Price per night:</strong> ₹${room.pricePerNight}</p>
    <p><strong>Check-in:</strong> ${new Date(dates.checkInDate).toDateString()}</p>
    <p><strong>Check-out:</strong> ${new Date(dates.checkOutDate).toDateString()}</p>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject,
    html
  });
}

export async function sendPaymentReceiptEmail(toEmail, room, dates) {
  const subject = "Payment Successful - Your Room is Booked";

  const html = `
    <h2>Payment Receipt - Booking Confirmed</h2>
    <p>Your payment was successful and your room is now <strong>fully booked</strong>.</p>
    <p><strong>Room:</strong> ${room.roomNumber} (${room.type})</p>
    <p><strong>Price per night:</strong> ₹${room.pricePerNight}</p>
    <p><strong>Check-in:</strong> ${new Date(dates.checkInDate).toDateString()}</p>
    <p><strong>Check-out:</strong> ${new Date(dates.checkOutDate).toDateString()}</p>
    <p>Thank you for booking with us.</p>
  `;

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject,
    html
  });
}

import Swal from "sweetalert2";
import confetti from "canvas-confetti";

// 🎉 Order Confirmed Alert with Confetti
export const orderConfirmedAlert = (email) => {
  Swal.fire({
    icon: "success",
    title: "Order Confirmed 🎉",
    text: `Your order has been placed successfully! Confirmation sent to ${email}`,
    confirmButtonText: "OK",
    didOpen: () => {
      fireConfetti();
    }
  });
};

// 🎊 Confetti Animation
const fireConfetti = () => {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

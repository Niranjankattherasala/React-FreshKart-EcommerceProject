// ✅ Total cart calculation
export function totalBillCalculation(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );
}

// ✅ Button discount calculation
export function buttonDiscountCalculation(totalPrice, discountPercentage) {
  return (totalPrice * discountPercentage) / 100;
}

// ✅ Coupon discount calculation
export function getCouponDiscount(coupon, totalAmount) {
  let discountPercentage = 0;

  switch (coupon.toUpperCase()) {
    case "RATAN10":
      discountPercentage = 10;
      break;
    case "RATAN20":
      discountPercentage = 20;
      break;
    case "RATAN30":
      discountPercentage = 30;
      break;
    default:
      discountPercentage = 0;
  }

  let discountAmount = (totalAmount * discountPercentage) / 100;

  return {
    isValidCoupon: discountPercentage > 0,
    couponDiscountPercentage: discountPercentage,
    couponDiscountAmount: discountAmount,
  };
}

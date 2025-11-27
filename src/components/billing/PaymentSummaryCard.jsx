// PaymentSummaryCard.jsx
function PaymentSummaryCard({ totalAmount = 942, timeLeft = "00:00" }) {
    return (
        <div className="mt-[50px] w-full max-w-xl rounded-3xl bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Total Amount */}
            <div className="flex items-center gap-3">
                {/* Wallet Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path
                            d="M4 7a2 2 0 0 1 2-2h11a1 1 0 0 1 .8 1.6L17 8H6a2 2 0 0 1-2-1Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="3"
                            y="8"
                            width="18"
                            height="11"
                            rx="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="17" cy="13.5" r="1" />
                    </svg>
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-xs font-medium opacity-80">
                        ยอดรวม / <span className="font-normal">Total Amount</span>
                    </span>
                    <span className="text-2xl font-semibold">
                        ฿{totalAmount.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Divider for small screens */}
            <div className="h-px w-full bg-white/20 sm:hidden" />

        </div>
    );
}

export default PaymentSummaryCard;

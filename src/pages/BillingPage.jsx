import PaymentSummaryCard from "@/components/billing/PaymentSummaryCard"
import useBillingStore from "@/stores/useBillingStore"

function BillingPage() {

    const { qrUrl } = useBillingStore.getState()

    return (
        <>
            <PaymentSummaryCard />
            <img src={qrUrl} className="w-[90%] mx-auto" />
        </>
    )
}

export default BillingPage
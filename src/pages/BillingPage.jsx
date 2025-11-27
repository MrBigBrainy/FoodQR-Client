import useBillingStore from "@/stores/useBillingStore"

function BillingPage() {

    const { qrUrl } = useBillingStore.getState()

    return (
        <img src={qrUrl} className="w-[90%] mx-auto" />
    )
}

export default BillingPage
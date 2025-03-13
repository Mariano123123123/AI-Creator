import { BillingPage } from "@/components/billing-page"

export default function Billing() {
  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
          <p className="text-muted-foreground">Upgrade your plan and manage payment methods</p>
        </div>

        <BillingPage />
      </div>
    </div>
  )
}


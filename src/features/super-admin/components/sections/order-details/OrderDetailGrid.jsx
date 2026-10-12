import ApprovalCard from "../../cards/ApprovalCard";
import CustomerCard from "../../cards/CustomerCard";
import InvoiceSummaryCard from "../../cards/InvoiceSummaryCard";
import OrderDetailsPackageCard from "../../cards/OrderDetailsPackageCard";
import BankTransferDetails from "./BankTransferDetails";
import CryptoPaymentDetails from "./CryptoPaymentDetails";
import StripePaymentDetails from "./StripePaymentDetails";
import TrialDetails from "./TrialDetails";

const paymentComponents = {
  bank_transfer: BankTransferDetails,
  stripe: StripePaymentDetails,
  solana: CryptoPaymentDetails,
  trial: TrialDetails,
};

export default function OrderDetailGrid({ orderDetails }) {
  const isBankTransfer = orderDetails?.payment_method === "bank_transfer";

  const PaymentDetails =
    paymentComponents[orderDetails?.payment_method] || null;

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 flex flex-col gap-4">
        <CustomerCard orderDetails={orderDetails} />
        <InvoiceSummaryCard orderDetails={orderDetails} />
        <OrderDetailsPackageCard orderDetails={orderDetails} />
      </div>

      <div className="col-span-4 flex flex-col gap-4">
        {PaymentDetails && <PaymentDetails orderDetails={orderDetails} />}
        {isBankTransfer && <ApprovalCard orderDetails={orderDetails} />}
      </div>
    </div>
  );
}

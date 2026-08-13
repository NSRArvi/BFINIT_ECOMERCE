import { Link } from "react-router";
import { Landmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BankAccountsTable from "../components/sections/bank-accounts/BankAccountsTable";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import BankAccountsTableSkeleton from "@/components/skeletons/BankAccountsTableSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function PackageBankAccounts() {
  const { data, isLoading } = useGetQuery({
    endpoint: "/api/v1/platform-bank-payment/get-all-admin",
    enabled: true,
    queryKey: ["platform_banks"],
  });

  let content = null;

  if (isLoading) {
    content = <BankAccountsTableSkeleton />;
  }

  if (data?.success && data?.data?.length > 0) {
    content = (
      <>
        <DynamicBreadcrumb items={breadcrubms.bank_accounts} />

        <div className="flex items-center justify-between">
          <PageHeader
            icon={Landmark}
            title="Bank Accounts"
            description="Manage bank accounts shown on the e-Bfinit"
          />
          <Button size="sm" asChild className="shrink-0 text-xs">
            <Link to="/super-admin/bank-accounts/new">
              <Plus /> Add Bank Account
            </Link>
          </Button>
        </div>

        <BankAccountsTable data={data?.data} />
      </>
    );
  }

  if (!data?.data?.length > 0) {
    content = (
      <EmptyState
        icon={Landmark}
        title="No Bank Accounts Added Yet"
        description="Add a bank account to start receiving payments."
        actionText="Add Bank Account"
        actionPath="/super-admin/bank-accounts/new"
      />
    );
  }

  return <section className="space-y-6">{content}</section>;
}

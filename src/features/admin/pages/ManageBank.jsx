import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Landmark, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import BankTable from "../components/sections/manage-bank/BankTable";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import useDebounce from "@/hooks/useDebounce";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function ManageBank() {
  const navigate = useNavigate();
  const { activeStore } = useSelectedStore();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/bankPayment/get-all/${activeStore?.id}`,
    enabled: !!activeStore?.id,
    isTokenRequired: true,
    queryKey: ["bankAccounts", activeStore?.id],
  });

  const bankAccounts = data?.data ?? [];
  const filteredAccounts =
    bankAccounts?.filter((account) => {
      const searchTerm = debouncedSearch?.trim();
      if (!searchTerm) return true;
      return account.bank_name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  if (!activeStore) {
    return (
      <EmptyState
        icon={Landmark}
        title="No Store Selected"
        description="Create a store to start managing bank accounts and payment methods"
        actionText="Create Store"
        actionPath="/stores/create"
      />
    );
  }

  let content = null;

  if (isLoading) {
    content = <BankTable isLoading={isLoading} />;
  }

  if (!isLoading && filteredAccounts.length > 0) {
    content = <BankTable isLoading={isLoading} accounts={filteredAccounts} />;
  }

  if (!isLoading && filteredAccounts?.length === 0) {
    content = (
      <EmptyState
        className="min-h-[calc(100dvh-300px)]"
        icon={Landmark}
        title={
          debouncedSearch ? "No matching account found" : "No bank accounts yet"
        }
        description={
          debouncedSearch
            ? `No results for "${debouncedSearch}". Try a different keyword.`
            : "Add your first bank account to start accepting bank transfer payments"
        }
        actionText={debouncedSearch ? "Clear Search" : "Add Bank Account"}
        onAction={
          debouncedSearch
            ? () => setSearch("")
            : () => navigate("/payments/bank/add")
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.bankPayment} />

      <PageHeader
        icon={Landmark}
        title="Bank Accounts"
        description="View and manage bank accounts for bank transfer payments"
      />

      <div className="bg-card space-y-6 rounded-lg p-5">
        <div className="flex items-center justify-end gap-4">
          <div className="relative w-full max-w-72">
            {isLoading ? (
              <div className="text-muted-foreground absolute top-1/2 left-2.5 -translate-y-1/2">
                <Spinner className="size-3.5" />
              </div>
            ) : (
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            )}
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bank accounts..."
              value={search}
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>

          <Button size="sm" asChild className="text-xs">
            <Link to="/payments/bank/add">
              <Plus /> Add Bank Account
            </Link>
          </Button>
        </div>

        {content}
      </div>
    </section>
  );
}

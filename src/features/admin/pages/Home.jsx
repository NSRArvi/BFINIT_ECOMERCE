import CreateStoreCard from "../components/sections/home/CreateStoreCard";
import QuickNavs from "../components/sections/home/QuickNavs";
import QuickTips from "../components/sections/home/QuickTips";
import StoreLimitCard from "../components/sections/home/StoreLimitCard";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import useGetStores from "../hooks/useGetStores";
import StoreCard from "../components/sections/stores/StoreCard";
import StatCards from "../components/sections/home/StatCards";
import RecentOrders from "../components/sections/home/RecentOrders";
import ActionItems from "../components/sections/home/ActionItems";

export default function Home() {
  const { user } = useAuth();
  // fetch client info
  const { data: clientInfo } = useGetQuery({
    endpoint: `/clients/${user?.data?.clientid}`,
    token: user?.token,
    queryKey: ["clientInfo", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });

  // fetch stores details
  const { data: stores } = useGetStores();

  const storeCount = stores?.data?.length > 0 ? stores?.data?.length : 0;
  const storeLimit = user?.data?.storeLimit || 0;

  // progress of total store limit
  const progressPercentage = (storeCount / storeLimit) * 100;

  return (
    <section className="mx-auto max-w-7xl">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white">
        <div className="bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%223%22 cy=%223%22 r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] absolute inset-0 opacity-20"></div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-xl font-bold">
                Hi {clientInfo?.data?.clientFname}{" "}
                {clientInfo?.data?.clientLname}! 👋
              </h1>
              <p className="text-sm text-gray-300">
                Welcome back to your dashboard
              </p>
            </div>

            {/* Store Usage Summary */}
            <div className="hidden sm:block">
              <div className="mb-3 text-right">
                <div className="text-lg font-bold text-white">
                  {storeCount}/{storeLimit}
                </div>
                <div className="text-sm text-gray-300">stores created</div>
              </div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-white/20">
                <div
                  className="to-dashboard-primary h-full bg-gradient-to-r from-blue-400 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <StatCards />

      {/* recent orders and actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <RecentOrders />

        <ActionItems />
      </div>

      {/* Stores Management Section */}
      {/* <div className="mt-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Your Stores</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage and create your online stores
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores &&
            stores?.data &&
            stores?.data?.length > 0 &&
            stores?.data?.map((store) => (
              <StoreCard key={store?.storeId} store={store} />
            ))}

          {storeCount < storeLimit ? (
            <CreateStoreCard />
          ) : (
            <StoreLimitCard createdStore={stores?.data?.length} />
          )}
        </div>
      </div> */}

      {/* Quick Navigation Section */}
      {/* <div className="mt-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Quick Navigation</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Access your most used features
          </p>
        </div>

        <QuickNavs />
      </div> */}

      {/* Quick Tips Section */}
      <div className="mt-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Quick Tips</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Learn how to get the most out of e-Bfinit
          </p>
        </div>

        <QuickTips />
      </div>
    </section>
  );
}

import IncomingRideDataTable from "@/components/modules/ride/IncomingRideDataTable";
import Loading from "@/components/modules/shared/Loading";
import PaginationPage from "@/components/modules/shared/Pagination";
import {
  useGetDriverProfileQuery,
  useGetIncomingRideRequestsQuery,
} from "@/redux/features/driver/driver.api";
import { useMemo, useState } from "react";

export default function IncomingRequest() {
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: driverProfile } = useGetDriverProfileQuery(undefined);

  // Compute sort param for API: prepend "-" if descending
  const sort =
    sortConfig.sortOrder === "asc"
      ? sortConfig.sortBy
      : `-${sortConfig.sortBy}`;

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      sort,
    }),
    [page, limit, sort]
  );

  const { data, isLoading } = useGetIncomingRideRequestsQuery(queryParams, {
    pollingInterval: 15000,
  });

  if (isLoading && !data) return <Loading />;

  // Show offline message
  if (data && driverProfile?.availability !== "online") {
    return (
      <div>
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="font-semibold text-2xl min-[370px]:text-4xl font-ride-title">
              You are currently Offline.
            </h2>
            <p className="text-xs min-[370px]:text-base mt-3">
              To accept rides, you need to go online first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const allIncomingRides = data?.data ?? [];
  const pagination = data?.meta;
  const serialNumber = (page - 1) * limit;

  // Sorting toggle handler
  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>
      </div>

      {/* Table */}
      <IncomingRideDataTable
        allIncomingRides={allIncomingRides}
        serialNumber={serialNumber}
        handleSort={handleSort} // pass sort handler for columns
        sortConfig={sortConfig} // pass current sort state for UI
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10">
          <PaginationPage
            page={page}
            setPage={setPage}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
}

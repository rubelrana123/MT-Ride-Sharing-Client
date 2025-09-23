 
 
import FilterIncomingRequest from "@/components/modules/ride/FilterIncomingRequest";
import IncomingRideDataTable from "@/components/modules/ride/IncomingRideDataTable";
import Loading from "@/components/modules/shared/Loading";
import PaginationPage from "@/components/modules/shared/Pagination";
import { useGetDriverProfileQuery, useGetIncomingRideRequestsQuery } from "@/redux/features/driver/driver.api";
 
 
// import type { IIncomingRideRequest } from "@/types";
import {   useMemo, useState } from "react";

export default function IncomingRequest() {
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("createdAt-desc");
 
 

  const { data: driverProfile } = useGetDriverProfileQuery(undefined);

  console.log(driverProfile,  'driverProfile');
 

  const sortParams = useMemo(() => {
    const [sortBy, sortOrder] = sortValue.split("-");
    return { sortBy, sortOrder };
  }, [sortValue]);


  const queryParams = useMemo(
    () => ({
      page,
      limit: 15,
      sortBy: sortParams.sortBy,
      sort: sortParams.sortOrder,
    }),
    [page, sortParams]
  );
  // fetch incoming ride request data from db using rtk query
  const { data, isLoading } = useGetIncomingRideRequestsQuery(queryParams, { pollingInterval: 15000});
  console.log(data, 'incoming ride request data');
  if (isLoading && !data) return <Loading/>;

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

  const handleResetFilterr = () => {
    
    setSortValue("createdAt-desc");
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>
      </div>

      {/* incoming request filter */}
      <FilterIncomingRequest

        sortValue={sortValue}
        setSortValue={setSortValue}

        handleResetFilterr={handleResetFilterr}
      />

      {/* ================ table body ================== */}
      {/* //as IIncomingRideRequest[] */}
      <IncomingRideDataTable
        allIncomingRides={allIncomingRides }
        queryParams={queryParams}
      />
      {/* ================ table body ================== */}

      {Array.isArray(allIncomingRides) &&
        allIncomingRides?.length > 19 &&
        pagination &&
        pagination.total > 20 && (
          <div className="mt-10">
            <PaginationPage
              page={page}
              setPage={setPage}
              totalPages={pagination?.totalPages}
            />
          </div>
        )}
    </div>
  );
}

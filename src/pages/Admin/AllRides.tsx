import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useGetAllRidesQuery } from "@/redux/features/ride/ride.api";
import type { IRide } from "@/types/ride.type";
import { dateFormater } from "@/utils/dateFormater";

import Loading from "@/components/modules/shared/Loading";
import PaginationPage from "@/components/modules/shared/Pagination";
import { RideStatusUpdateModal } from "@/components/modules/ride/RideStatusUpdateModal";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown, ChevronUp, Eye, Pencil } from "lucide-react";

export default function ViewAllRides() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Sort state
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => setSearchTerm(inputValue), 500);
    return () => clearTimeout(timerId);
  }, [inputValue]);

  // Prepare sort param
  const sort =
    sortConfig.sortOrder === "asc"
      ? sortConfig.sortBy
      : `-${sortConfig.sortBy}`;

  // Fetch rides
  const { data, isLoading } = useGetAllRidesQuery({
    page,
    limit,
    sort,
    searchTerm,
    minFare,
    maxFare,
  });

  if (isLoading && !data) return <Loading />;

  const allRides = data?.data || [];
  const pagination = data?.meta;
  const serialNumber = (page - 1) * limit;
  console.log(data, "All rides here");
  // Sort handler
  const handleSort = (field: string) => {
    const newSortOrder =
      sortConfig.sortBy === field && sortConfig.sortOrder === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ sortBy: field, sortOrder: newSortOrder });
  };

  // Modal handler
  const handleModal = (ride: IRide) => {
    setSelectedRide(ride);
    setIsOpen(true);
  };

  return (
    <div className="lg:px-6">
      {/* Title */}
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">All Rides</h1>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search rider-type, ride-status"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="max-w-xs"
        />

        {/* Fare Range */}
        <div className="flex items-center h-8 bg-card p-0 rounded border max-w-52">
          <Input
            placeholder="Min Fare"
            value={minFare}
            onChange={(e) => setMinFare(e.target.value)}
            className="border-0 bg-transparent focus:ring-0"
          />
          <Input
            placeholder="Max Fare"
            value={maxFare}
            onChange={(e) => setMaxFare(e.target.value)}
            className="border-0 bg-transparent focus:ring-0"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Rider</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>RideType</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead
              onClick={() => handleSort("fare")}
              className="cursor-pointer"
            >
              Fare{" "}
              {sortConfig.sortBy === "fare" &&
                (sortConfig.sortOrder === "asc" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </TableHead>
            <TableHead
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer"
            >
              Date{" "}
              {sortConfig.sortBy === "createdAt" &&
                (sortConfig.sortOrder === "asc" ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allRides.map((ride: any, idx: number) => (
            <TableRow key={ride._id}>
              <TableCell>{serialNumber + idx + 1}</TableCell>
              <TableCell>{ride.rider?.name}</TableCell>
              <TableCell>{ride.driverName || "Not Assigned"}</TableCell>
              <TableCell>{(ride?.rideType).toUpperCase()}</TableCell>
              <TableCell>{ride.distance}</TableCell>
              <TableCell>{ride.fare}</TableCell>
              <TableCell>{dateFormater(ride.createdAt)}</TableCell>
              <TableCell>
                <Badge className="capitalize">
                  {ride.rideStatus?.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      onClick={() => handleModal(ride)}
                      className="bg-blue-700 dark:bg-blue-500 dark:text-foreground"
                    >
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button size="icon" variant="outline">
                  <Link to={`/dashboard/rideDetails/${ride._id}`}>
                    <Eye />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      {/* Status Modal */}
      {isOpen && selectedRide && (
        <RideStatusUpdateModal
          ride={selectedRide}
          open={isOpen}
          onChange={setIsOpen}
        />
      )}
    </div>
  );
}

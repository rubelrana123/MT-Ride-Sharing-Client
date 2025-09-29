// Main AllDriverApplications Component
import { useState } from "react";
 
import { Filter, Search, Download } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDriverApplicationsQuery, useUpdateDriverStatusMutation } from "@/redux/features/driver/driver.api";
import type { DriverApplication, DriverStatus } from "@/types/driver.type";
import ApplicationStats from "@/components/modules/driver/ApplicationStats";
import { ApplicationRow } from "@/components/modules/driver/ApplicationRow";
import Swal from "sweetalert2";
 
 
export default function AllDriverApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("all");

  const { 
    data: driverApplicationsResponse, 
    isLoading, 
    error 
  } = useGetDriverApplicationsQuery(undefined);

const [updateApplicationStatus] = useUpdateDriverStatusMutation();
  
console.log(driverApplicationsResponse, "driver applications data")

  const applications: DriverApplication[] = driverApplicationsResponse || [];
  const meta = driverApplicationsResponse?.meta;

  const handleStatusUpdate = async (applicationId: string, newStatus: DriverStatus) => {
    try {
      const res =  await updateApplicationStatus({ id: applicationId, driverStatus: newStatus }).unwrap();
      console.log(res, "status update response");
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update application status");
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: Implement API call - DELETE /driver-application/:id
      Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the delete API here
          // toast.success("Application deleted successfully");
          toast.success("sorry! you cann't delete, - Under the construction");
        }
        toast.success("Application deleted successfully");
      });
    } catch (error) {
      toast.error("Failed to delete application");
    }
  }

  // Filter applications based on search and filters
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.driverStatus === statusFilter;
    
    const matchesVehicleType = 
      vehicleTypeFilter === "all" || 
      app.vehicleInfo.vehicleType.toLowerCase() === vehicleTypeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesVehicleType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load applications</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Driver Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and review driver applications
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <ApplicationStats applications={applications} />

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or license number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="suspend">Suspended</SelectItem>
              </SelectContent>
            </Select>

            {/* Vehicle Type Filter */}
            <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="ac-car">AC Car</SelectItem>
                <SelectItem value="nac-car">Car</SelectItem>
                <SelectItem value="scooter">Scooter</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(searchTerm || statusFilter !== "all" || vehicleTypeFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setVehicleTypeFilter("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredApplications.length} of {applications.length} applications
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Applications List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle Info</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No applications found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((application) => (
                    <ApplicationRow 
                      key={application._id} 
                      application={application}
                      onStatusUpdate={handleStatusUpdate}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {meta.page} of {meta.totalPages} ({meta.total} total applications)
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={meta.page === 1}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={meta.page === meta.totalPages}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
 
  
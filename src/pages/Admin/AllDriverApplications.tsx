import React from "react";
import { Link } from "react-router";
import { Eye, Plus, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useGetDriverApplicationsQuery } from "@/redux/features/driver/driver.api";
 
export default function AllDriverApplications() {
  const {data : driverApplications} = useGetDriverApplicationsQuery(undefined);
  console.log(driverApplications, "driver applications data")
  const handleAccept = (id: string) => {
    // TODO: integrate with API call: PATCH /driver-application/:id/status
    toast.success(`Application ${id} accepted!`);
  };

  const handleDelete = (id: string) => {
    // TODO: integrate with API call: DELETE /driver-application/:id
    toast.error(`Application ${id} deleted!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Applications</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>

            <TableHead>Vehicle Type</TableHead>
            <TableHead>Model</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {driverApplications?.map((application : any) => (
            <TableRow key={application._id}>
              <TableCell>{application?.driver?.name}</TableCell>
              <TableCell>{application?.driver?.email}</TableCell>

              <TableCell>{application.vehicleInfo.vehicleType}</TableCell>
              <TableCell>{application.vehicleInfo.model}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  {/* View button */}
                  <Link to={`/applications/${application._id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </Link>

                  {/* Accept button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => handleAccept(application._id)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Accept</span>
                  </Button>

                  {/* Delete button with confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete application</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete "
                          {application.vehicleInfo.vehicleType}" application.
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(application._id)}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Trash2, BookPlus, Eye, Plus, BookLock } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { useState } from "react";
// import { Link } from "react-router";
// import { toast } from "sonner";
// import { useGetDriverApplicationsQuery } from "@/redux/features/driver/driver.api";

// const applicatoinsData = {
//   "statusCode": 200,
//   "success": true,
//   "message": "All Driver Application has been retrive successfully",
//   "meta": {
//       "page": 1,
//       "limit": 10,
//       "total": 3,
//       "totalPages": 1
//   },
//   "data": [
//       {
//           "vehicleInfo": {
//               "vehicleType": "texi",
//               "model": "BM RE",
//               "plate": "SYL-5621"
//           },
//           "_id": "68a21c02e0361c0d4b7b692a",
//           "driver": "68a0b3b564445e3276f79bcb",
//           "licenseNumber": "DX-2025-0789",
//           "availability": "offline",
//           "driverStatus": "pending",
//           "earnings": 0,
//           "createdAt": "2025-08-17T18:14:26.213Z",
//           "updatedAt": "2025-08-17T18:14:26.213Z"
//       },
//       {
//           "vehicleInfo": {
//               "vehicleType": "CNG",
//               "model": "Bajaj RE",
//               "plate": "SYL-5621"
//           },
//           "_id": "689b831bf15176bd6cc3c4e7",
//           "driver": "6891ae0d170cad5ec181ea5d",
//           "licenseNumber": "DL-2025-0789",
//           "availability": "offline",
//           "driverStatus": "pending",
//           "earnings": 0,
//           "createdAt": "2025-08-12T18:08:27.341Z",
//           "updatedAt": "2025-08-12T18:08:27.341Z"
//       },
//       {
//           "vehicleInfo": {
//               "vehicleType": "CNG",
//               "model": "Bajaj RE",
//               "plate": "SYL-5621"
//           },
//           "_id": "689b82c4f15176bd6cc3c4de",
//           "driver": "6891ae3b170cad5ec181ea66",
//           "licenseNumber": "DL-2025-0789",
//           "availability": "offline",
//           "driverStatus": "pending",
//           "earnings": 0,
//           "createdAt": "2025-08-12T18:07:00.437Z",
//           "updatedAt": "2025-08-12T18:07:00.437Z"
//       }
//   ]
// }


// const AllDriverApplications = () => {

// const [currentPage, setCurrentPage] = useState(1);
// const applicationPerPage = 6;

// const { data, isLoading } = useGetDriverApplicationsQuery(
//   { page: currentPage, limit: applicationPerPage },
//   {
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true,
//     refetchOnReconnect: true,
//   }
// );

// const applications = applicatoinsData?.data || [];
// const totalPages = applicatoinsData?.meta?.totalPages || 1;
// console.log(applications, "applications")
 

//   if (isLoading) {
//     return (
//       <>
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
//             <p className="text-muted-foreground">Loading books...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">All Drivers Applications</h1>
//             <p className="text-muted-foreground">Manage your Drivers Applications</p>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 Total Applications
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {applications?.length}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 Available Books
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-success">
//                 {/* {books?.filter((book: IBook) => book?.available).length} */}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 Total Copies
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">
//                 {/* {applications.reduce(
//                   (sum: number, book: IBook) => sum + book.copies,
//                   0
//                 )} */}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Books Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Books</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {applications?.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-muted-foreground mb-4">
//                   <BookPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                   <p className="text-lg">No books found</p>
//                   <p className="text-sm">Add your first book to get started</p>
//                 </div>
              
//                   <Button>No Applications here</Button>
                
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Title</TableHead>
//                       <TableHead>Availability</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>View</TableHead>
//                       <TableHead className=" text-center">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   {/*table body */}
//                   <TableBody>
//                     {applications?.map((application) => (
//                       <TableRow key={application._id}>
//                         <TableCell className="font-medium">
//                           {application?.vehicleInfo?.vehicleType}
//                         </TableCell>
//                         <TableCell>{application?.availability}</TableCell>
//                         <TableCell>{application?.driverStatus}</TableCell>
  
//                         <TableCell>
//                           <Badge
//                             variant={application.availability ? "default" : "secondary"}
//                             className={
//                               application?.availability
//                                 ? "bg-white text-green-500"
//                                 : "bg-white text-red-500 line-through"
//                             }
//                           >
//                             {application.availability ? "Available" : "available"}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <div className="flex items-center justify-end space-x-2">
//                             <Link to={`/applications/${application._id}`}>
//                               <Button variant="ghost" size="sm">
//                                 <Eye className="h-4 w-4" />
//                                 <span className="sr-only">View details</span>
//                               </Button>
//                             </Link>

//                             {/* <Button variant="ghost" size="sm">
//                               <EditapplicationDialog application={application} />
//                             </Button> */}
// {/* 
//                             {application.available && application.copies ? (
//                               <>
//                                 {" "}
//                                 <BorrowapplicationDialog application={application} />
//                               </>
//                             ) : (
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="text-red-500 block"
//                               >
//                                 <BookLock className="h-4 w-4" />
//                                 <span className="sr-only">Borrow book</span>
//                               </Button>
//                             )} */}

//                             <AlertDialog>
//                               <AlertDialogTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="text-destructive"
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                   <span className="sr-only">Delete book</span>
//                                 </Button>
//                               </AlertDialogTrigger>
//                               <AlertDialogContent>
//                                 <AlertDialogHeader>
//                                   <AlertDialogTitle>
//                                     Are you sure?
//                                   </AlertDialogTitle>
//                                   <AlertDialogDescription>
//                                     This will permanently delete "{application.vehicleInfo.vehicleType}"
//                                     from your library. This action cannot be
//                                     undone.
//                                   </AlertDialogDescription>
//                                 </AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                   {/* <AlertDialogAction
//                                     onClick={() => handleDelete(application._id)}
//                                     className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                                   >
//                                     Delete
//                                   </AlertDialogAction> */}
//                                 </AlertDialogFooter>
//                               </AlertDialogContent>
//                             </AlertDialog>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>                  

//                 </Table>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="text-center my-10">
//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-2 flex-wrap mt-10">
//             {/* Previous Button */}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 text-sm font-medium rounded-md border 
//       ${
//         currentPage === 1
//           ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//           : "bg-green-500 text-white hover:bg-green-600 border-green-500"
//       }
//     `}
//             >
//               Previous
//             </button>

//             {/* Page Buttons */}
//             {[...Array(totalPages)].map((_, i) => {
//               const page = i + 1;
//               const isActive = currentPage === page;
//               return (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-3 py-1 text-sm font-medium rounded-md border transition-all duration-150
//           ${
//             isActive
//               ? "bg-green-600 text-white border-green-600"
//               : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
//           }
//         `}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             {/* Next Button */}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 text-sm font-medium rounded-md border 
//       ${
//         currentPage === totalPages
//           ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//           : "bg-green-500 text-white hover:bg-green-600 border-green-500"
//       }
//     `}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllDriverApplications;
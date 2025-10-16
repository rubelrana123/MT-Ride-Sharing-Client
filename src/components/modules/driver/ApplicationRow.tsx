import { TableCell, TableRow } from "@/components/ui/table";
import type { DriverApplication, DriverStatus } from "@/types/driver.type";

import StatusUpdateDialog from "./StatusUpdateDialog";
import StatusBadge from "./StatusBadge";
import { dateFormater } from "@/utils/dateFormater";

interface ApplicationRowProps {
  application: DriverApplication;
  onStatusUpdate: (id: string, status: DriverStatus) => void;
  onDelete: (id: string) => void;
}

export function ApplicationRow({
  application,
  onStatusUpdate,
}: ApplicationRowProps) {
  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <TableCell>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {application.driver.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ID: {application.driver._id.slice(-8)}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <div className="text-sm font-medium">{application.driver.email}</div>
          {application.driver.phone && (
            <div className="text-sm text-gray-500">
              {application.driver.phone}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <div className="font-medium capitalize">
            {application.vehicleInfo.vehicleType}
          </div>
          <div className="text-sm text-gray-500">
            {application.vehicleInfo.model}
          </div>
          <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {application.vehicleInfo.plate}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {application.licenseNumber}
        </div>
      </TableCell>

      <TableCell>
        <StatusBadge status={application.driverStatus} />
      </TableCell>

      <TableCell>
        <div className="font-medium">
          {application.earnings === "0" ? "No earnings" : application.earnings}
        </div>
      </TableCell>

      <TableCell>
        <div className="text-sm">
          {dateFormater(new Date(application.createdAt))}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end space-x-2">
          {/* under the construction */}
          {/* View Details */}
          {/* <Link to={`/applications/${application._id}`}>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <Eye className="h-4 w-4" />
            </Button>
          </Link> */}

          {/* Status Update */}
          <StatusUpdateDialog
            applicationId={application._id}
            currentStatus={application.driverStatus}
            driverName={application.driver.name}
            onStatusUpdate={onStatusUpdate}
          />
          {/* under the construction */}

          {/* Delete */}
          {/* <ApplicationDeleteModal
            applicationId={application._id}
            driverName={application.driver.name}
            vehicleInfo={`${application.vehicleInfo.vehicleType} - ${application.vehicleInfo.model}`}
            onDelete={onDelete}
          /> */}
        </div>
      </TableCell>
    </TableRow>
  );
}

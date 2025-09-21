import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { PencilIcon, Settings } from "lucide-react";
import type { DriverStatus } from "@/types/driver.type";
 

interface StatusUpdateDialogProps {
  applicationId: string;
  currentStatus: string;
  driverName: string;
  onStatusUpdate: (id: string, status: DriverStatus) => void;
}

export default function StatusUpdateDialog({
  applicationId,
  currentStatus,
  driverName,
  onStatusUpdate
}: StatusUpdateDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<DriverStatus>(currentStatus as DriverStatus);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = () => {
    if (selectedStatus !== currentStatus) {
      onStatusUpdate(applicationId, selectedStatus);
      setIsOpen(false);
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending", description: "Application under review" },
    { value: "approved", label: "Approved", description: "Driver approved and active" },
    { value: "rejected", label: "Rejected", description: "Application rejected" },
    { value: "suspend", label: "Suspended", description: "Driver temporarily suspended" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-orange-50">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
          <DialogDescription>
            Change the status for {driverName}'s driver application.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Status</label>
            <div className="text-sm text-gray-600 capitalize">{currentStatus}</div>
          </div>
          
          <div>
            <label className="text-sm font-medium">New Status</label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as DriverStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate}
            disabled={selectedStatus === currentStatus}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
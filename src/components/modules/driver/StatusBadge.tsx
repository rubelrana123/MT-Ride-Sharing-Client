import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Ban } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          variant: "secondary" as const,
          className:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
          icon: Clock,
          label: "Pending",
        };
      case "approved":
        return {
          variant: "secondary" as const,
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
          icon: CheckCircle,
          label: "Approved",
        };
      case "rejected":
        return {
          variant: "secondary" as const,
          className:
            "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          icon: XCircle,
          label: "Rejected",
        };
      case "suspend":
        return {
          variant: "secondary" as const,
          className:
            "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
          icon: Ban,
          label: "Suspended",
        };
      default:
        return {
          variant: "secondary" as const,
          className:
            "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
          icon: Clock,
          label: status,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}

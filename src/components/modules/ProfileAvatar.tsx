import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { role } from "@/types";
 
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";

interface IAvatarProps {
  name: string;
  image?: string;
  userRole: string;
  logOutFn: () => Promise<void>;
}

const ProfileAvatar = ({ name, image, userRole, logOutFn }: IAvatarProps) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const dashboardUrl  = userRole === role.admin ? "/admin" : userRole === role.rider ? "/riders" : "/driver"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={image || "https://avatars.githubusercontent.com/u/124599?v=4"}
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-w-fit mt-3"
        align={isMobile ? "end" : "start"}
      >
        <DropdownMenuItem className="cursor-pointer">
          <Link to={dashboardUrl}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/dashboard/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOutFn} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;

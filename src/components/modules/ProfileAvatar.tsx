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

  const dashboardUrl  = userRole === role.admin ? "/admin" : userRole === role.rider ? "/riders" : "/drivers"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={image || "https://image.winudf.com/p/aHR0cHM6Ly9wbGF5LWxoLmdvb2dsZXVzZXJjb250ZW50LmNvbS9FOVE3WEdaeDNZVVFzcGxwZDRsSnZLT2xDNWx4ejNnaUszajJpdUV4TlpTYnFWcldzUkQtbW0wTG9BYTJORWY5UFE9aDgwMA?k=66f508aaa629d46d3d843b54633e0c0468e25b12&.jpg"}
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

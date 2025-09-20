import { PuffLoader } from "react-spinners";



export default function Loading () {
  return (
    <div className="flex items-center justify-center min-h-screen">
       <PuffLoader size={40} color="#FF4D00" />
   </div>
  );
};

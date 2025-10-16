
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Link } from "react-router";
 
import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Logo } from "@/assets/icons/Logo";
 
 
 
 
 const Register = () => {
//  

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className={cn("flex flex-col gap-6 w-full max-sm:mt-10 max-w-3xl mx-auto")}>
        <Card>
          <CardHeader className="text-center">
          <div className="w-24 h-24 bg-secondary rounded-full mx-auto flex items-center justify-center mb-4 ">
           <Logo className="w-20 h-20 flex content-center ml-5" />

            </div>
            <CardTitle className="text-xl">Register your account</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <RegisterForm/>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

 
export default Register;
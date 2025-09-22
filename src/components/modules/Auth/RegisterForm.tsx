import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
 
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
 
import z from "zod";
import { Button } from "@/components/ui/button";
 
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import Password from "@/components/ui/password";
import { toast } from "sonner";
import { useNavigate } from "react-router";
const registerZodSchema =  z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",   // ✅ match schema
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerZodSchema>) => {

    const finalUserData = {
      name: values.name,   // ✅ map schema fullName → API name
      email: values.email,
      password: values.password,
    };

    try {
      const res = await register(finalUserData).unwrap();
      console.log(res, "register response");
  
        toast.success(res.message || "Registration successful");
        navigate("/login", { replace: true });
 
  } catch (error: unknown) {
  let errorMessage = "An error occurred";
  console.log(error, "error");
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "object" &&
    (error as { data?: unknown }).data !== null
  ) {
    const errData = (error as { data: any }).data;

    // ✅ check both top-level message and nested message
    if (errData.message) {
      errorMessage = errData.message;
    } else if (errData.err?.statusCode === 409) {
      errorMessage = "User already exists";
    }
  }

  toast.error(errorMessage);
}

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ✅ fullName instead of name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}

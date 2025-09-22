import z from "zod";

export const baseSchema = z.object({
  name: z
    .string("Name must be a string")
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string("Email must be a string")
    .nonempty("email is required")
    .email({ message: "please provide valid email address" }),
  password: z
    .string("Password must be a string")
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least 1 lowercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  confirmPassword: z
    .string("Confirm Password must be a string")
    .min(8, { error: "Confirm password must be at least 8 character long" }),
});

export const riderSchema = baseSchema
  .extend({
    role: z.literal("rider"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const driverSchema = baseSchema.extend({
  role: z.literal("driver"),
  licenseNumber: z
    .string()
    .min(6, "License number must be at least 6 characters")
    .max(20, "License number must be at most 20 characters"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  model: z.string().min(1, "Model is required"),
  plate: z
    .string()
    .min(8, "Plate number must be at least 8 characters")
    .max(30, "Plate number must be at most 30 characters"),
});

export const registerZodSchema = z.discriminatedUnion("role", [
  riderSchema,
  driverSchema,
]);


export const baseUpdateSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "name must be contain at least 3 characters lont")
    .optional(),
  email: z.email().optional(),
  phoneNumber: z
    .string("Phone Number must be a string")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string("Address must be a string")
    .max(200, "Address cannot exceed 200 characters.")
    .optional(),
});


export const updateDriverSchma = baseUpdateSchema.extend({
  role: z.literal("driver"),
  licenseNumber: z
    .string()
    .min(6, "License number must be at least 6 characters")
    .max(20, "License number must be at most 20 characters"),
  vehicleType: z.string().min(1, "Vehicle type is required").optional(),
  model: z.string().min(1, "Model is required").optional(),
  plate: z
    .string()
    .min(8, "Plate number must be at least 8 characters")
    .max(30, "Plate number must be at most 30 characters").optional(),
});

export const updateRiderSchema = baseUpdateSchema
  .extend({
    role: z.literal("rider"),
  })

export const updateProfileSchema = z.discriminatedUnion("role", [
  updateRiderSchema,
  updateDriverSchma,
]);




export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string("Old Password must be a string")
      .nonempty("Old Password is required")
      .min(8, "Old Password must be contain at least 8 characters long"),
    newPassword: z
      .string()
      .nonempty({ message: "New Password is required" })
      .min(8, { message: "New Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "New Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "New Password must contain at least 1 lowercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "New Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "New Password must contain at least 1 number.",
      }),
    confirmNewPassword: z
      .string("Confirm New Password must be a string")
      .min(
        8,
        "Confirm New Password must be contain at least 8 characters long"
      ),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New Password do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New Password cannot be the same as the old one",
    path: ["newPassword"],
  });

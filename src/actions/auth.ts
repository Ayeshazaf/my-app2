"use server";
import { RegisterFormSchema } from "@/lib/rules";
export async function register(state , formData){
 
    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });
    if (!validatedFields.success) {
        return {
            errors : validatedFields.error.flatten().fieldErrors,
            email : formData.get("email"),
        }
    }
    const { email, password } = validatedFields.data;

}
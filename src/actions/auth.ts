"use server";
import { getCollection } from "@/lib/db";
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

    const userCollection = await getCollection("users");
    const results = await userCollection?.insertOne({email, password});

    console.log("results", results);
}
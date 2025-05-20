"use server";
import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
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

    const existingUser = await userCollection?.findOne({ email });
    if (existingUser) {
        return {
            errors: {
                email: ["Email already exists"],
            },
            email: formData.get("email"),
        };
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Save the user to the database
    const results = await userCollection?.insertOne({email, password : hashedPassword});

    //Create a session
    await createSession(results.insertedId.toString());

    //Redirect the user
    redirect("/dashbord");
}
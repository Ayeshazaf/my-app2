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

    //Save the user to the database
    const results = await userCollection?.insertOne({email, password});

    //Create a session

    //Redirect the user
    redirect("/dashboard");
    console.log("results", results);
}
"use client";
import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Register() {
const [state , action , isPending] = useActionState(register , undefined)

  return (
    <div>
        <h1>Register</h1>
        <form action={action}>
            
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email"/>
                {state?.errors?.email && <p className="text-1xl ">{state.errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password"/>
                {state?.errors?.password && (
                    <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((err) =>(
                            <li key={err}>{err}</li>
                        ))}       
                        </ul>
                    </div>)}
            </div>
            <div>
                <label htmlFor="confirmPassword">confirmPassword</label>
                <input type="confirmPassword" name="confirmPassword" placeholder="confirmPassword"/>
                {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
            </div>
            <button disabled={isPending} type="submit">{isPending ? "Loading..." : "Register"}</button>
            <Link href="/">Or login here</Link>
        </form>
    </div>
    
  );
}
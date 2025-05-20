import Link from "next/link";

export default function Register() {
  return (
    <div>
        <h1>Register</h1>
        <form action="">
            
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password"/>
            </div>
            <div>
                <label htmlFor="confirmPassword">confirmPassword</label>
                <input type="confirmPassword" name="confirmPassword" placeholder="confirmPassword"/>
            </div>
            <button type="submit">Register</button>
            <Link href="/">Or login here</Link>
        </form>
    </div>
    
  );
}
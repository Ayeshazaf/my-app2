import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link href="/">MyApp</Link>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashbord">Dashboard</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}   
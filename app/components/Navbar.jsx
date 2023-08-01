import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="border border-blue-700 p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Books-Buzz</Link>
      <div className="gap-4 hidden md:flex ">
        <Link href="/#">Favourites</Link>
        <Link href="/#">Saved</Link>
        <Link href="/#">Currently Reading</Link>
        <Link href="/#">Profile</Link>
        <Link href="/#">Sign out</Link>
      </div>
    </nav>
  )
}

export default Navbar
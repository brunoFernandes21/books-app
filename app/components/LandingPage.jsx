import Image from "next/image";
import landingPageImage from "../../public/images/landingPageImage.png"
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className=" flex justify-center items-center flex-col p-4 m-auto">
      <h1>Welcome to my books</h1>
      {/* add image below */}
      <div className="bg-white rounded shadow-md">
      <Image src={landingPageImage} width={250} height={250} alt="a stack of books" />
      </div>
      <p>
        Keep track of current reads, find new favourites and connect with
        friends
      </p>
      <div className="flex gap-4 mt-4">
        <Link href="/login" className="bg-blue-500 p-2 rounded text-white">Login</Link>
        <Link href="/register" className="bg-blue-500 p-2 rounded text-white"> Register</Link>
      </div>
    </section>
  );
};

export default LandingPage;

import Image from "next/image";
import landingPageImage from "../../public/images/landingPageImage.png";
import Link from "next/link";

const LandingPage = () => {
  return (
    <main className="landing__page ">
      <section className="rounded-2xl border-4 border-blue-950 text-slate-800 bg-white flex justify-center items-center flex-col p-4 m-auto">
        <h1 className="uppercase font-black text-2xl my-4">
          Welcome to my books
        </h1>
        {/* add image below */}
        <div>
          <Image
            src={landingPageImage}
            width={250}
            height={250}
            alt="a stack of books"
          />
        </div>
        <p className="text-center font-black mt-5">
          Keep track of current reads, find new favourites and connect with
          friends.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/login"
            className="bg-blue-800 p-2 font-bold rounded text-white px-6 hover:bg-blue-400"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-800 p-2 font-bold rounded text-white hover:bg-blue-400"
          >
            {" "}
            Register
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;

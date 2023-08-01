import { Featured } from "./components/Featured";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";

export default function Home() {
  return (
    <main>
      <Search/>
      <section className="flex justify-center">
        <p>Welcome to MyBooks</p>
        <p>Search for books to add to your favourites</p>
        <p>your currently reading list, and save for later</p>
      </section>
      {/* <LandingPage/> */}
      <Featured />
    </main>
  )
}

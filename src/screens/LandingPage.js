import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function LandingPage({ history }) {
  const [search, setSearch] = useState("");
  //   const [search, setSearch] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [data, setData] = useState();

  //   const router = useHistory();

  //   const submitHandler = (e) => {
  //     e.preventDefault();

  //     // if (category) {
  //     //   router.push(`/home?title=${search}`);
  //     // } else {
  //     //   router.push("/");

  //     // }
  //     console.log(data);
  //   };
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(`https://api.aniapi.com/v1/anime`);
      //console.log(req.data);
      setAnimes(req.data.data.documents);
    }

    fetchData();
  }, []);
  return (
    <div className="bg-gray-800 ">
      <Header setSearch={(s) => setSearch(s)}></Header>
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4  mb-12 bg-gray-800 bg-opacity-75">
        <article className="">
          <section class=" grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 ">
            {animes &&
              animes
                .filter((filteredAnime) =>
                  filteredAnime.titles.en
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((anime) => (
                  <article class="bg-indigo-300 group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 mt-4 mb-4">
                    <div class="relative w-full h-80 md:h-64 lg:h-44">
                      <img
                        src={anime.cover_image}
                        alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="px-3 py-4">
                      <h3 class="text-md text-gray-500 pb-2">
                        <a
                          class="bg-indigo-500 py-1 px-2 text-white rounded-lg"
                          href={`/anime/${anime.id}`}
                        >
                          <span class="absolute inset-0"></span>
                          {anime.titles.en}
                        </a>
                      </h3>
                    </div>
                  </article>
                ))}
          </section>
        </article>
      </section>
    </div>
  );
}

export default LandingPage;

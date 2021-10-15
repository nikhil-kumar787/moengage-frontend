import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReviewAction } from "../actions/animeActions";
import Header from "../components/Header";
import Review from "../components/Review";
const image =
  "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80";

function Anime({ match, history }) {
  const [cover, setCover] = useState();
  const [title, setTitle] = useState();
  const [trailer, setTrailer] = useState();
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState();
  const [season, setSeason] = useState();
  const [episodes, setEpisodes] = useState();

  const [review, setReview] = useState([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState("");
  const [animeId, setAnimeId] = useState("");
  const [desc, setDesc] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user._id);

  useEffect(() => {
    const fetching = async () => {
      const req = await axios.get(
        `https://api.aniapi.com/v1/anime/${match.params.id}`
      );

      setCover(req.data.data.banner_image);
      setTitle(req.data.data.titles.en);
      setTrailer(req.data.data.trailer_url);
      setGenres(req.data.data.genres);
      setDescription(req.data.data.descriptions.en);
      setSeason(req.data.data.season_year);
      setEpisodes(req.data.data.episodes_count);
      setName(localStorage.getItem("userName"));
      setUserId(localStorage.getItem("userId"));
    };

    fetching();
  }, [match.params.id]);

  useEffect(() => {
    const fetching = async () => {
      console.log(match.params.id);
      const req = await axios.get(
        `https://moengage-backend.herokuapp.com/api/users/review/${match.params.id}`
      );
      setReview(req.data);
      console.log(review);
    };

    fetching();
  }, [match.params.id]);

  const dispatch = useDispatch();

  const animeCreate = useSelector((state) => state.animeCreate);
  const { loading, error, anime } = animeCreate;

  const resetHandler = () => {
    setName("");
    setRating("");
    setUserId("");
    setAnimeId("");
    setDesc("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userId);
    // setAnimeId(`${match.params.id}`);
    // console.log(animeId);
    dispatch(createReviewAction(rating, `${match.params.id}`, desc));
    if (!rating || !desc) return;

    resetHandler();
    history.push(`/anime/${match.params.id}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="bg-gray-300">
      <Header />
      <section class=" bg-blueGray-200 mt-10">
        <div
          class="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
          data-movie-id="438631"
        >
          <div class="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>
          <div
            class="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info"
            data-lity=""
            href={`${trailer}`}
          >
            <div class="poster__info align-self-end w-full">
              <div class="h-32"></div>
              <div class="space-y-6 detail_info">
                <div class="flex flex-col space-y-2 inner">
                  <a
                    class="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700"
                    data-unsp-sanitized="clean"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-10 h-10"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div class="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2">
                      Trailer
                    </div>
                  </a>
                  <h3
                    class="text-2xl font-bold text-white"
                    data-unsp-sanitized="clean"
                  >
                    {title}
                  </h3>
                </div>
                <div class="flex flex-row justify-between datos">
                  <div class="flex flex-col datos_col">
                    <div class="popularity">{season}</div>
                    <div class="text-sm text-gray-400">Season:</div>
                  </div>

                  <div class="flex flex-col datos_col">
                    <div class="release">{episodes}</div>
                    <div class="text-sm text-gray-400">Episodes:</div>
                  </div>
                </div>
                <div class="flex flex-col overview">
                  <div class="flex flex-col"></div>
                  <div class="text-xs text-gray-400 mb-2">Description:</div>
                  <p class="text-xs text-gray-100 mb-6">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <img
            class="absolute inset-0 transform w-full -translate-y-4"
            src={cover}
            style={{ filter: "grayscale(0)" }}
          />
        </div>
        <div className="mt-2">
          <h2 className="text-indigo-500 text-2xl font-extrabold">Genres:</h2>
          {genres.map((data) => (
            <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-md rounded-md transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300">
              {data}
            </button>
          ))}
        </div>
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div class="w-full text-center pb-8">
            <svg
              class="mx-auto"
              width="48"
              height="42"
              viewBox="0 0 48 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6153 19.154H10.1537C9.38437 19.154 8.73037 18.8849 8.19185 18.3463C7.65363 17.8078 7.38417 17.154 7.38417 16.3845V15.4619C7.38417 13.4233 8.10546 11.6831 9.54795 10.2406C10.9903 8.79859 12.7309 8.0773 14.7693 8.0773H16.6153C17.1152 8.0773 17.5477 7.89453 17.9133 7.52929C18.2786 7.16384 18.4613 6.73131 18.4613 6.23128V2.53864C18.4613 2.03872 18.2785 1.60578 17.9133 1.24034C17.5478 0.875398 17.1153 0.692322 16.6153 0.692322H14.7693C12.7691 0.692322 10.8608 1.08212 9.04327 1.86059C7.22595 2.63958 5.65404 3.69257 4.32694 5.01967C2.99994 6.34616 1.94726 7.91817 1.16837 9.7357C0.389491 11.553 0 13.4618 0 15.4618V35.769C0 37.3083 0.538216 38.6152 1.61515 39.6926C2.69219 40.7693 4.00019 41.3076 5.53856 41.3076H16.616C18.1542 41.3076 19.4618 40.7693 20.539 39.6926C21.6157 38.6152 22.1542 37.3083 22.1542 35.769V24.6926C22.1542 23.1536 21.6157 21.8466 20.5383 20.7692C19.4616 19.6925 18.1535 19.154 16.6153 19.154Z"
                fill="#2865E9"
              />
              <path
                d="M46.3856 20.7692C45.309 19.6925 44.0013 19.154 42.4626 19.154H36.0011C35.2322 19.154 34.5776 18.8849 34.04 18.3463C33.5012 17.8078 33.2323 17.154 33.2323 16.3845V15.4619C33.2323 13.4233 33.9536 11.6831 35.3954 10.2406C36.8372 8.79859 38.5777 8.0773 40.6171 8.0773H42.4627C42.9627 8.0773 43.3955 7.89453 43.7608 7.52929C44.1258 7.16384 44.3092 6.73131 44.3092 6.23128V2.53864C44.3092 2.03872 44.1259 1.60578 43.7608 1.24034C43.3956 0.875398 42.9628 0.692322 42.4627 0.692322H40.6171C38.6158 0.692322 36.7079 1.08212 34.8899 1.86059C33.0729 2.63958 31.5015 3.69257 30.1744 5.01967C28.8473 6.34616 27.7941 7.91817 27.0155 9.7357C26.2368 11.553 25.8468 13.4618 25.8468 15.4618V35.769C25.8468 37.3083 26.3855 38.6152 27.4622 39.6926C28.5389 40.7693 29.8466 41.3076 31.3852 41.3076H42.462C44.0006 41.3076 45.3082 40.7693 46.3849 39.6926C47.4623 38.6152 47.9999 37.3083 47.9999 35.769V24.6926C48 23.1535 47.4623 21.8466 46.3856 20.7692Z"
                fill="#2865E9"
              />
            </svg>

            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 pb-2">
              Find some Reviews
            </h1>
            <button
              onClick={() => window.location.reload(false)}
              class="ml-2 p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300"
            >
              Refresh
            </button>
          </div>
          <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {review.map((data) => (
              <div class="bg-white rounded-lg p-6 transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item">
                <div class="flex items-center space-x-6 mb-4">
                  <div>
                    <p class="text-xl text-gray-700 font-normal mb-1">
                      {data.name}
                    </p>
                    <p class="text-base text-blue-600 font-normal">
                      Rated: {data.rating}/5
                    </p>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400 leading-loose font-normal text-base">
                    {data.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <form onSubmit={submitHandler}>
          <div class="relative py-3 sm:max-w-xl sm:mx-auto mt-14">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div class="max-w-md mx-auto">
                <div>
                  <h1 class="text-2xl font-semibold">Add Your Review</h1>
                </div>
                <div class="divide-y divide-gray-200">
                  <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div class="relative">
                      <input
                        autocomplete="off"
                        id="text"
                        name="text"
                        type="text"
                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                      <label
                        for="Rating"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Rating (Rate out of 5)
                      </label>
                    </div>
                    <div class="relative">
                      <input
                        autocomplete="off"
                        id="text"
                        name="text"
                        type="text"
                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                      <label
                        for="description"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Description (min 255 characters)
                      </label>
                    </div>
                    <div class="relative">
                      <button
                        class="bg-blue-500 text-white rounded-md px-2 py-1"
                        // onClick={() => window.location.reload(false)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Anime;

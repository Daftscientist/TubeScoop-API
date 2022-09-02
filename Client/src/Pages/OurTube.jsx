import axios from "axios";
import LoadingItem from "Components/Elements/LoadingItem";
import YoutubeItem from "Components/Elements/YoutubeItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function OurTube() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState(null);
  const [value, setValue] = useState("");
  const [videosLoaded, setVideosLoaded] = useState(false);

  function handle_form(event) {
    event.preventDefault();
    setQuery(event.target[0].value);
    setValue("");
  }

  useEffect(() => {
    async function get_data() {
      if (!query) return;
      setVideosLoaded(false);
      const result = await axios.get("http://localhost:3000/api/v1/youtube/search?query=" + query);
      setVideos(result.data);
      setVideosLoaded(true);
    }
    get_data();
  }, [query]);
  return (
    <div className="bg-gray-900 h-screen text-white w-full">
      <div className="px-7 container w-full bg-gray-900 items-center justify-center">
        <div className="">
          <form onSubmit={(event) => (handle_form(event))} className="col-span-12 w-full pt-4">   
            <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={(event) => (setValue(event.currentTarget.value))} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" value={value} placeholder={query || "Search YouTube"} required/>
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>
      </div>
      <div className="pt-4 flex bg-gray-900 items-center justify-center">
        <div className="">
          {!query ? (<></>) : (
            <>
              {videosLoaded ? (
                <div className="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl pb-3">
                  {videos.map((video, idx) => (
                    <YoutubeItem key={idx} video={video} />
                  ))}
                </div>
              ) : (
                <LoadingItem />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OurTube;
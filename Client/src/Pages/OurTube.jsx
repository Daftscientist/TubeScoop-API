import axios from "axios";
import YoutubeItem from "Components/Elements/YoutubeItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function OurTube() {
  const [videos, setVideos] = useState([]);
  let { query } = useParams();

  useEffect(() => {
    async function get_data() {
      const result = await axios.get("http://localhost:3000/api/v1/youtube/search?query=" + query);
      setVideos(result.data);
    }
    get_data();
  }, [query]);
  return (
    <div className="bg-gray-900 text-white">
      <h1>OurTube</h1>
      <h2>Search results for: {query}</h2>
      <div className="h-full flex bg-gray-900 items-center justify-center">
        <div className="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl">
          {videos.map((video, idx) => (
            <YoutubeItem key={idx} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurTube;
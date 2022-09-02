import { useParams } from "react-router";

function OurTube() {

  let { query } = useParams();

  const data = [
    {
      'thumbnail_url': 'https://i.ytimg.com/vi/YLtEc-kvOqA/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCF7Ru6h8afm8n8LbTwmKTPZTUs2g',
      'video_title': "Stray Kids 'CHEESE' Video", 'video_id': 'YLtEc-kvOqA', 
      'video_url': 'https://www.youtube.com/watch?v=YLtEc-kvOqA'
    }
  ]

  return (
    <div class="h-screen flex bg-gray-900 items-center justify-center">
      <div class="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl">
        {
          data.map((item, idx) => {
            return (
              <div class="col-span-12 sm:col-span-6 md:col-span-3">
      <card class="w-full flex flex-col">
        <div class="relative">

          <a href="#">
            <img src="https://picsum.photos/seed/59/300/200" class="w-96 h-auto" />
          </a>

          <p class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">1:15</p>
        </div>

        <div class="flex flex-row mt-2 gap-2">

          <a href="#">
            <img src="https://picsum.photos/seed/1/40/40" class="rounded-full max-h-10 max-w-10" />
          </a>

          <div clas="flex flex-col">
            <a href="#">
              <p class="text-gray-100 text-sm font-semibold">Learn CSS Box Model in 8 Minutes</p>
            </a>
            <a class="text-gray-400 text-xs mt-2 hover:text-gray-100" href="#"> Web Dev Simplified </a>
            <p class="text-gray-400 text-xs mt-1">241K views . 3 years ago</p>
          </div>

        </div>
      </card>
    </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OurTube;
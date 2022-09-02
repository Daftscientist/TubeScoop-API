// make component
const YoutubeItem = ({ video }) => {
    return (
        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <card class="w-full flex flex-col">
                <div class="relative">
                    <a href="#">
                        <img src={video.thumbnail} class="w-96 h-auto" />
                    </a>

                    <p class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">{video.duration}</p>
                    </div>

                    <div class="flex flex-row mt-2 gap-2">

                    <a href="#">
                        <img src={video.channel.picture} class="rounded-full max-h-10 max-w-10" />
                    </a>

                    <div clas="flex flex-col">
                        <a href="#">
                        <p class="text-gray-100 text-sm font-semibold">{video.title}</p>
                        </a>
                        <a class="text-gray-400 text-xs mt-2 hover:text-gray-100" href="#">{video.channel.name}</a>
                        <p class="text-gray-400 text-xs mt-1">{video.views} . 3 years ago</p>
                    </div>

                </div>
            </card>
        </div>
    );
    };
export default YoutubeItem;
// Language: javascript
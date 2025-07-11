import { useState } from "react";

function Screens() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex flex-col w-auto h-100vh justify-center items-center bg-blue-700">
      <div className="w-3/4 h-max rounded-3xl bg-[#14264e] py-10 px-10 gap-5 flex justify-center flex-col items-center">
        <h3 className="text-white font-semibold text-2xl">Upload</h3>
        <div className="w-44 bg-yellow-400 p-0.5 mb-2"></div>
        <h2 className="text-white font-medium">
          Bring your songs to life with the help of NYX AI and Professionals
          guidance!{" "}
        </h2>
        <p className="text-slate-400  w-1/2 text-center">
          Check your audio and video creation for monitization upload your track
          below and check it for free
        </p>
        <div className="flex w-max justify-center items-center gap-4">
          <div className="w-1/2">
            <label className="text-slate-400">Track Type</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Indian Hindi Songs</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-slate-400">Select Genre</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Selected Category</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-1/2 flex-col justify-center items-center flex gap-4 mb-6">
            {selected === 1 ? (
              <div className="flex gap-5 w-auto justify-center align-center">
                <div className="p-4 rounded-full bg-emerald-400 w-32 h-32 mt-4 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="98"
                    height="90"
                    viewBox="0 0 101 101"
                    fill="none"
                  >
                    <path
                      d="M46.2904 67.332V33.0341L35.3487 43.9758L29.457 37.8737L50.4987 16.832L71.5404 37.8737L65.6487 43.9758L54.707 33.0341V67.332H46.2904ZM25.2487 84.1654C22.9341 84.1654 20.9527 83.3412 19.3044 81.693C17.6562 80.0447 16.832 78.0633 16.832 75.7487V63.1237H25.2487V75.7487H75.7487V63.1237H84.1654V75.7487C84.1654 78.0633 83.3412 80.0447 81.693 81.693C80.0447 83.3412 78.0633 84.1654 75.7487 84.1654H25.2487Z"
                      fill="#3B226F"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="flex gap-5 w-auto justify-center align-center">
                <div className="p-4 rounded-full bg-emerald-400 w-32 h-32 mt-4 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="98"
                    height="90"
                    viewBox="0 0 101 101"
                    fill="none"
                  >
                    <path
                      d="M46.2904 67.332V33.0341L35.3487 43.9758L29.457 37.8737L50.4987 16.832L71.5404 37.8737L65.6487 43.9758L54.707 33.0341V67.332H46.2904ZM25.2487 84.1654C22.9341 84.1654 20.9527 83.3412 19.3044 81.693C17.6562 80.0447 16.832 78.0633 16.832 75.7487V63.1237H25.2487V75.7487H75.7487V63.1237H84.1654V75.7487C84.1654 78.0633 83.3412 80.0447 81.693 81.693C80.0447 83.3412 78.0633 84.1654 75.7487 84.1654H25.2487Z"
                      fill="#3B226F"
                    />
                  </svg>
                </div>
                <div className="p-4 rounded-full bg-emerald-400 w-32 h-32 mt-4 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="98"
                    height="90"
                    viewBox="0 0 101 101"
                    fill="none"
                  >
                    <path
                      d="M46.2904 67.332V33.0341L35.3487 43.9758L29.457 37.8737L50.4987 16.832L71.5404 37.8737L65.6487 43.9758L54.707 33.0341V67.332H46.2904ZM25.2487 84.1654C22.9341 84.1654 20.9527 83.3412 19.3044 81.693C17.6562 80.0447 16.832 78.0633 16.832 75.7487V63.1237H25.2487V75.7487H75.7487V63.1237H84.1654V75.7487C84.1654 78.0633 83.3412 80.0447 81.693 81.693C80.0447 83.3412 78.0633 84.1654 75.7487 84.1654H25.2487Z"
                      fill="#3B226F"
                    />
                  </svg>
                </div>
              </div>
            )}

            <div className="w-full flex justify-center items-center gap-2">
              <div
                className={`py-2 font-semibold px-10 rounded-md cursor-pointer border-2 text-white border-yellow-300 ${
                  selected === 1 ? "bg-yellow-300 text-black" : " "
                }`}
                onClick={() => setSelected(1)}
              >
                Original
              </div>
              <div
                className={`py-2 font-semibold px-10 rounded-md text-white cursor-pointer border-2 border-yellow-300 ${
                  selected === 2 ? "bg-yellow-300 text-black " : ""
                }`}
                onClick={() => setSelected(2)}
              >
                Reference
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center gap-5 ">
            <div className="w-full flex justify-between items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="42"
                  viewBox="0 0 41 42"
                  fill="none"
                >
                  <path
                    d="M18.7904 28V13.7375L14.3487 18.2875L11.957 15.75L20.4987 7L29.0404 15.75L26.6487 18.2875L22.207 13.7375V28H18.7904ZM10.2487 35C9.30911 35 8.50477 34.6573 7.83568 33.9719C7.16658 33.2865 6.83203 32.4625 6.83203 31.5V26.25H10.2487V31.5H30.7487V26.25H34.1654V31.5C34.1654 32.4625 33.8308 33.2865 33.1617 33.9719C32.4926 34.6573 31.6883 35 30.7487 35H10.2487Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold">Upload your track</h2>
                <p className="text-white text-sm font-thin">
                  Upload your MP3, AIFF, or WAV file by clicking the button at
                  the top of the home page. The song will then be sent to our AI
                  engine.
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                >
                  <path
                    d="M11.0833 26.9167H14.25V19H11.0833V26.9167ZM23.75 26.9167H26.9167V11.0833H23.75V26.9167ZM17.4167 26.9167H20.5833V22.1667H17.4167V26.9167ZM17.4167 19H20.5833V15.8333H17.4167V19ZM7.91667 33.25C7.04583 33.25 6.30035 32.9399 5.68021 32.3198C5.06007 31.6997 4.75 30.9542 4.75 30.0833V7.91667C4.75 7.04583 5.06007 6.30035 5.68021 5.68021C6.30035 5.06007 7.04583 4.75 7.91667 4.75H30.0833C30.9542 4.75 31.6997 5.06007 32.3198 5.68021C32.9399 6.30035 33.25 7.04583 33.25 7.91667V30.0833C33.25 30.9542 32.9399 31.6997 32.3198 32.3198C31.6997 32.9399 30.9542 33.25 30.0833 33.25H7.91667ZM7.91667 30.0833H30.0833V7.91667H7.91667V30.0833Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold">Analyse and Modify</h2>
                <p className="text-white text-sm font-thin">
                  NYX predictive AI will analyse the track with cutting edge AI
                  model trained on Millions of historical songs and publish a
                  report based upon major parameters impacting song virality &
                  popularity.
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                >
                  <path
                    d="M5.38464 28.5L3.16797 26.2833L14.8846 14.4875L21.218 20.8208L29.4513 12.6667H25.3346V9.5H34.8346V19H31.668V14.8833L21.218 25.3333L14.8846 19L5.38464 28.5Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-semibold">
                  Master and Monetize
                </h2>
                <p className="text-white text-sm font-thin">
                  Modify your track based upondetailed report and help of
                  professionals. Bring your songs to life by listing it on
                  popular streaming platform and witness monetization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
}

export default Screens;

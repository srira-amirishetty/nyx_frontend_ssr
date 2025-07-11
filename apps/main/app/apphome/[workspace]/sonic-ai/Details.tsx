export default function Details() {
  return (
    <>
      <div className="w-full flex justify-between items-start gap-3">
        <div className="p-2 rounded-full bg-nyx-yellow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 41 42"
            className="w-[20px] md:w-[42px]"
            fill="none"
          >
            <path
              d="M18.7904 28V13.7375L14.3487 18.2875L11.957 15.75L20.4987 7L29.0404 15.75L26.6487 18.2875L22.207 13.7375V28H18.7904ZM10.2487 35C9.30911 35 8.50477 34.6573 7.83568 33.9719C7.16658 33.2865 6.83203 32.4625 6.83203 31.5V26.25H10.2487V31.5H30.7487V26.25H34.1654V31.5C34.1654 32.4625 33.8308 33.2865 33.1617 33.9719C32.4926 34.6573 31.6883 35 30.7487 35H10.2487Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="text-sm md:text-base">
          <h2 className="text-white font-bold">
            Upload your track
          </h2>
          <p className="text-white font-light">
            Upload your MP3, AIFF, or WAV file by clicking the button at the top
            of the home page. The song will then be sent to our AI engine.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between items-start gap-3">
        <div className="p-2 rounded-full bg-nyx-yellow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 38 38"
            className="w-[20px] md:w-[38px]"
            fill="none"
          >
            <path
              d="M11.0833 26.9167H14.25V19H11.0833V26.9167ZM23.75 26.9167H26.9167V11.0833H23.75V26.9167ZM17.4167 26.9167H20.5833V22.1667H17.4167V26.9167ZM17.4167 19H20.5833V15.8333H17.4167V19ZM7.91667 33.25C7.04583 33.25 6.30035 32.9399 5.68021 32.3198C5.06007 31.6997 4.75 30.9542 4.75 30.0833V7.91667C4.75 7.04583 5.06007 6.30035 5.68021 5.68021C6.30035 5.06007 7.04583 4.75 7.91667 4.75H30.0833C30.9542 4.75 31.6997 5.06007 32.3198 5.68021C32.9399 6.30035 33.25 7.04583 33.25 7.91667V30.0833C33.25 30.9542 32.9399 31.6997 32.3198 32.3198C31.6997 32.9399 30.9542 33.25 30.0833 33.25H7.91667ZM7.91667 30.0833H30.0833V7.91667H7.91667V30.0833Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="text-sm md:text-base">
          <h2 className="text-white font-bold">
            Analyze and Modify
          </h2>
          <p className="text-white font-light">
            NYX predictive AI will analyse the track with cutting edge AI model
            trained on Millions of historical songs and publish a report based
            upon major parameters impacting song virality & popularity.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between items-start gap-3">
        <div className="p-2 rounded-full bg-nyx-yellow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 38 38"
            className="w-[20px] md:w-[38px]"
            fill="none"
          >
            <path
              d="M5.38464 28.5L3.16797 26.2833L14.8846 14.4875L21.218 20.8208L29.4513 12.6667H25.3346V9.5H34.8346V19H31.668V14.8833L21.218 25.3333L14.8846 19L5.38464 28.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="text-sm md:text-base">
          <h2 className="text-white font-bold">
            Master and Monetize
          </h2>
          <p className="text-white font-light">
            Modify your track based upon detailed report and help of
            professionals. Bring your songs to life by listing it on popular
            streaming platform and witness monetization
          </p>
        </div>
      </div>
    </>
  );
}

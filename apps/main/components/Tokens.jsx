/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { MODAL_CONFIG } from "@nyx-frontend/main/utils/modalstyles";
import { BASEURL, GET_USER_TOKEN, TOKENS } from "@nyx-frontend/main/utils/utils";
function TokenTab() {
  const {
    setcontentHeight,
    type,
    tokenCache,
    setTokenCache,
    portfolio,
    setPortfolio,
  } = useContext(UseContextData);
  const { get } = useRequests();
  const [loaded, setLoaded] = useState(false);
  const navigate = useRouter();
  useEffect(() => {
    if (type && type.length != 0 && type === "user") {
      getTokensForUsers(type);
    } else {
      getTokensForArtists(type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const getTokensForArtists = async (type) => {
    if (tokenCache.length === 0) {
      const data = await get(BASEURL + TOKENS, MODAL_CONFIG("Loading..."));
      if (data.response === "Success") {
        setTokenCache([...data.data.nyx_tokens]);
        setLoaded(true);
      }
    } else {
      setTokenCache([...tokenCache]);
      setLoaded(true);
    }
  };
  const getTokensForUsers = async (type) => {
    if (portfolio.length === 0) {
      const data = await get(
        `${BASEURL}/users/${GET_USER_TOKEN}`,
        MODAL_CONFIG("Loading..."),
      );
      if (data.response === "Success") {
        setTokenCache([...data.data.portfolio]);
        setPortfolio([...data.data.portfolio]);
        setLoaded(true);
      }
    } else {
      setTokenCache([...portfolio]);
      setPortfolio([...portfolio]);
      setLoaded(true);
    }
  };

  useEffect(() => {
    setcontentHeight("h-[42rem]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="m-auto w-[90%]">
      {type === "user" ? (
        <>
          {loaded && !tokenCache?.length ? (
            <div className="flex mt-12 justify-center text-white font-light">
              You haven&apos;t purchased any tokens yet. Start Buying now to
              earn royalties.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-0 md:gap-4">
              {tokenCache.map((token) => (
                <div key={token.tokenId}>
                  <div className="cursor-pointer my-1 px-1 w-full lg:my-4 lg:px-4">
                    <div
                      onClick={() =>
                        navigate.push(`/description/${token.tokenId}`)
                      }
                      className="bg-transparent border text-white p-1 overflow-hidden rounded-md shadow-lg"
                    >
                      <img
                        alt={token.title}
                        className="relative rounded-md  h-auto w-full"
                        src={token.thumbnail}
                      />
                      <div className="p-2 mt-2">
                        <h4 className="text-xs md:text-md truncate ...">
                          {token.title}
                        </h4>
                        <div className="flex justify-between truncate ...">
                          <h4 className="text-sm font-light">
                            {token.artist === null ? "N/A" : token.artist}
                          </h4>
                          <h4 className="text-sm font-bold ">
                            {token.tierType === null ? "N/A" : token.tierType}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <img  className='w-[14rem] h-[14rem]' src={token.tierThumbnail}></img> */}
                </div>
              ))}
            </div>
          )}
        </>
      ) : loaded && !tokenCache?.length ? (
        <div className="flex mt-12 justify-center text-white font-light">
          You don&apos;t have any active / approved share requests. Add your
          song / video to start listing your shares.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-4">
          {tokenCache.map((token) => (
            <>
              <div key={token.tokenId}>
                {/* <img onClick={()=>navigate.push(`/listing/${token.tokenId}`)} className='w-[14rem] h-[14rem]' src={token.thumbnail}></img> */}
                <div className="cursor-pointer my-1 px-1 w-full lg:my-4 lg:px-4">
                  <div className="bg-transparent border text-white p-1 overflow-hidden rounded-md shadow-lg">
                    <img
                      onClick={() =>
                        navigate.push(`/description/${token.tokenId}`)
                      }
                      alt={token.title}
                      className="relative rounded-md  h-auto w-full"
                      src={token.thumbnail}
                    />
                    <div className="p-2 mt-2">
                      <h4 className="text-md">{token.title}</h4>
                      <h4 className="text-sm font-light">
                        {token.users.name === null ? "N/A" : token.users.name}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}

      <div className="mt-12">
        {type === "artist" ? (
          <div className="flex flex-col md:flex-row gap-5 items-center text-white justify-center">
            <h4>Want to earn more Revenue?</h4>
            <button
              className="block font-light text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
              onClick={() => {
                navigate.push("/upload");
              }}
            >
              {!tokenCache?.length ? "Add Shares" : "Add More Shares"}
            </button>
          </div>
        ) : (
          <div>
            {/* <div className='flex gap-3 justify-center'>
                    <ButtonElement width="w-[12rem]" name="Buy More"></ButtonElement>
                    <ButtonElement width="w-[12 rem]" name="Earn & Share"></ButtonElement>
                </div> */}
            <div className="font-light text-sm flex flex-row mt-18 gap-5 items-center text-white justify-center">
              <button
                onClick={async () => navigate.push("/marketplace")}
                className="w-32 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 rounded-md py-2 text-center"
              >
                {!tokenCache?.length ? "Buy Now" : "Buy More"}
              </button>
              <button
                onClick={async () => navigate.push("/distribute")}
                className="w-32 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 rounded-md py-2 text-center"
              >
                Share & Earn
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenTab;

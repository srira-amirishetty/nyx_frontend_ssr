"use client";
import { useState, createContext } from "react";

const UseContextData = createContext();

const UseContextProvider = (props) => {
  const [type, setType] = useState("");
  const [currentInput,setCurrentInput]=useState("")
  const [loaderText, setLoaderText] = useState("");
  const [contentHeight, setcontentHeight] = useState();
  const [walletDetails, setWalletDetails] = useState({});
  const [cartDetails, setCartDetails] = useState({});
  const [notifications, setNotifications] = useState({});
  const [sort, setSort] = useState("");
  const [tokenCache, setTokenCache] = useState([]);
  const [copiedObject, setCopiedObject] = useState([]);
  const [leaderBoardCache, setLeaderBoardCache] = useState({
    investment: [],
    distribution: [
      {
        userId: "XXX",
        profilePic: "XXX",
        username: "XXX",
        total_quantity: "XXX",
        total_investment: "XXX",
      },
    ],
  });
  const [listing_cache, setListingsCache] = useState({});
  const [tokenRequestCache, setTokenRequestsCache] = useState([]);
  const [modalConfig, setModal] = useState({
    isOpen: false,
    style: "",
    component: "",
  });
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showError, setShowError] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [filterParam, setFilterParam] = useState("?");

  const [filters, setFilters] = useState({});

  const [token_details_cache, set_token_details_cache] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const [authParams, setAuthParams] = useState({
    tabUser: "User",
    currentTab: 0,
  });

  const [toastConfig, setToastConfig] = useState({
    message: "",
    color: "bg-green-500",
    flag: false,
  });

  const [userDetails, setUserDetails] = useState([]);
  const [tabName, setTabName] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentRoute, setCurrentRoute] = useState("login");

  const [triggerModal, setModalConfig] = useState({
    isOpen: false,
    style: "",
    component: "",
    className: "",
  });

  const [apiLoaded, setApiLoaded] = useState(false);
  const [currentInputLine,setCurrentInputLine]=useState("")
  const [lyricsData, setLyricsData] = useState({
    generateType: "",
    user_input: {
      input: "",
      base_instruction: "",
      additional_inputs:""
    },
    additional_settings: {
      persona: {},
      context: "",
      task: "",
      exemplar: {},
      format: {},
      tone: {},
      language: "English",
      theme:{},
      Target_Listeners:{},

  
    },
    generateId: "",
    prev_response: "",
  });

  const [lyricsResponse,setLyricsResponse]=useState([])
  const [lyricsIndex,setLyricsIndex]=useState(0)
  const [errorLyrics,setErrorLyrics]=useState(null)
  const [notepadFile,setNotepadFile]=useState([])
  const [historyIndex,setHistoryIndex]=useState(0)
  const [relatedWordResponse,setRelatedWordResponse]=useState([])
  const [history,setHistory]=useState([])
  const [relatedWordError,setRelatedWordError]=useState("")
  const [relatedIndex,setRelatedIndex]=useState(0)
  const [hoverFileMenu,setHoveredFileMenu]=useState(false)
  const [cartCount,setCartCount]=useState(0)
  const [ShowWithdraw,setShowWithdraw]=useState(false)
  const [trigger,setTrigger]=useState("")
  const [imageUploaded,setimageUploaded]=useState(true)
  const [fontSized, setFontSize] = useState(20); 
  const [toggleIcon,setToggleIcon]=useState({
    font:"",
    fontNumber:0,
    leftAlignment:false,
    rightAlignment:false,
    justifyAligment:false,
    bold:false,
    italic:false,
    underline:false,
    uppercase:false,
    lowercase:false,
    file:"",
    bg_color:"",
    text_color:""

  })
  const reset = () => {
    setType("");
    setSort("");
    setPortfolio([]);
    setCoupons([]);
    setModal({});
    setShowError("");
    setShowSubscribe(false);
    setShowEmail(true);
    setIsLoggedIn(false);
    setLoaderText("");
    setUserDetails([]);
    setWalletDetails({});
    setCartDetails({});
    setTokenCache([]);
    setLeaderBoardCache({});
    setListingsCache({});
    setTokenRequestsCache([]);
    setFilterParam("");
    setFilters({});
    set_token_details_cache(null);
    setNotifications({});
    localStorage.removeItem("token");
    sessionStorage.removeItem("logintype");
  };

  return (
    <UseContextData.Provider
      value={{
        sort,
        setSort,
        portfolio,
        setPortfolio,
        coupons,
        setCoupons,
        modalConfig,
        setModal,
        reset,
        showError,
        setShowError,
        showSubscribe,
        setShowSubscribe,
        showEmail,
        setShowEmail,
        authParams,
        setAuthParams,
        toastConfig,
        setToastConfig,
        isLoggedIn,
        setIsLoggedIn,
        tabName,
        setTabName,
        loaderText,
        setLoaderText,
        contentHeight,
        setcontentHeight,
        type,
        setType,
        userDetails,
        setUserDetails,
        currentRoute,
        setCurrentRoute,
        walletDetails,
        setWalletDetails,
        cartDetails,
        setCartDetails,
        tokenCache,
        setTokenCache,
        leaderBoardCache,
        setLeaderBoardCache,
        listing_cache,
        setListingsCache,
        tokenRequestCache,
        setTokenRequestsCache,
        filterParam,
        setFilterParam,
        setFilters,
        filters,
        token_details_cache,
        set_token_details_cache,
        notifications,
        setNotifications,
        triggerModal,
        setModalConfig,
        apiLoaded,
        setApiLoaded,
        lyricsData, setLyricsData,
        lyricsResponse,setLyricsResponse,
        lyricsIndex,setLyricsIndex,
        errorLyrics,setErrorLyrics,
        notepadFile,setNotepadFile,
        relatedWordResponse,setRelatedWordResponse,
        history,setHistory,
        historyIndex,setHistoryIndex,
        relatedWordError,setRelatedWordError,
        relatedIndex,setRelatedIndex,
        hoverFileMenu,setHoveredFileMenu,
        currentInput,setCurrentInput,
        currentInputLine,setCurrentInputLine,
        cartCount,setCartCount,
       ShowWithdraw, setShowWithdraw,
       trigger,setTrigger,
       toggleIcon,setToggleIcon,
       imageUploaded,setimageUploaded,
       copiedObject, setCopiedObject,
       fontSized, setFontSize
      }}
    >
      {props.children}
    </UseContextData.Provider>
  );
};

export { UseContextProvider, UseContextData };

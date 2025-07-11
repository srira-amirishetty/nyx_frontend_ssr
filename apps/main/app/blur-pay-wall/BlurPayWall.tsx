import { getAvailableCredit } from "@nyx-frontend/main/services/workSpace";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const BlurPaywall = ({ children }: { children: JSX.Element }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { data,isFetching } = useQuery({
    queryKey: ["credits"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  useEffect(() => {
    if (isFetching || !data) return;
    setPopupVisible(!data?.availableCredits);
  }, [data, isFetching]);

  const router= useRouter()
  
  const handleClosePopup = () => {
    const workspaceName = localStorage.getItem('workspace_name')
    router.push(`/apphome/${workspaceName}/settings/plans`)
  };

  return (
    <div className="h-full w-auto absolute inset-0">
      <div className={clsx("blurred-content", isPopupVisible && "blurred")}>
        {children}
      </div>
      {isPopupVisible && (
        <div className="popup-overlay bg-primary">
          <div className="popup text-black">
            <p>Purchase a Plan to access Campulse AI</p>
            <button className="rounded-lg" onClick={handleClosePopup}>Subscribe</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .blurred {
          filter: blur(10px);
        }

        .popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        .popup {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          width: 300px;
        }

        .popup h2 {
          margin-top: 0;
        }

        .popup button {
          margin-top: 15px;
          padding: 10px 20px;
          border: none;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }

        .popup button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

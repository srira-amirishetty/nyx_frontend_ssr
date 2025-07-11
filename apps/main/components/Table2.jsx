import React from "react";

function Table2({ data }) {
  let ref_header = ["User Name", "Referrals", "User type"];
  let ref_data = [
    { username: "ram", referrals: 4, coins_earned: 12 },
    { username: "sam", referrals: 10, coins_earned: 102 },
    { username: "john", referrals: 6, coins_earned: 22 },
  ];

  return (
    <>
      <ul className="">
        <li className="py-2 text-center bg-new border border-blue rounded">
          <div className="flex items-center space-x-4">
            {ref_header.map((item, index) => (
              <div className="flex-1 min-w-0" key={"table2"+index}>
                <p className="text-base font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </li>

        {data?.map((item, index) => (
          <li className="py-2 my-4 text-center border border-blue rounded" key={"table2key"+index}>
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-base text-white">{item.name}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-white">{item.phone}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base  text-[#31C7C8]">{item.referredType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Table2;

import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Table({ header, data }) {
  const navigate = useRouter();
  return (
    <>
      <table className="w-full text-sm text-left text-white">
        <thead className="border-blue border-b text-xs text-white bg-new">
          <tr>
            {header?.map((item, index) => (
              <td key={index} className="px-6 py-3">
                {item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr className="bg-transparent" key={item.title + index}>
              <td className="px-6 py-4 font-light">{item.title}</td>
              <td className="px-6 py-4">{item.sale_amount}</td>
              <td className="px-6 py-4">
                {item.sale_amount + item.sale_amount * 0.1}
              </td>
              <td className="px-6 py-4">10%</td>
              <td className="px-6 py-4">{item.sold_quantity}</td>
              <td className="px-6 py-4">{item.sale_amount}</td>
              <td className="px-6 py-4">
                <span onClick={() => navigate.push("")} rel="noreferrer noopener">
                  <FaShareAlt />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;

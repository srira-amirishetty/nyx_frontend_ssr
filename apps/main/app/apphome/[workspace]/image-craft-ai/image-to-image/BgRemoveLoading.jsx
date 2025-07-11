import React from 'react'

const BgRemoveLoading = ({ message }) => {

  return (
    <div className="h-full w-full flex justify-center items-center	mb-8 space-x-4">
      <div className="h-[108px] w-[316px] flex justify-center items-center rounded-md">
        <div className="">
          <p className="text-white mb-4">{message}</p>
          <div className="flex justify-center items-center space-x-4">
            <div className="w-4 h-4 bg-white rounded-full shadow animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow animate-bounce delay-700"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow animate-bounce delay-1400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BgRemoveLoading
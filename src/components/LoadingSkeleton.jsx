import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="rounded-md p-4 w-full mx-auto mt-6 transition-all duration-500">
      <div className="animate-pulse flex justify-between items-center  space-x-4">
        <div className='flex gap-4 items-center'>
          <div className="rounded-full backdrop-sepia-0 bg-white/30 h-12 w-12"></div>
          <div className=''>
            <div className='h-5 w-[200px] backdrop-sepia-0 bg-white/30 rounded'></div>
            <div className='h-3 w-[100px] backdrop-sepia-0 bg-white/30 rounded mt-2'></div>
          </div>
        </div>

        <div className='h-6 w-10 backdrop-sepia-0 bg-white/30 rounded'>

        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
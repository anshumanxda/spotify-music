import React, { useState } from 'react'
import hamburgerIcon from '../assets/menu.svg'

import PlaylistDrawer from './PlaylistDrawer'

const Title = ({ title }) => {
  const [open, setIsOpen] = useState(false)
  return (
    <div className='flex items-center gap-5'>
      <PlaylistDrawer setIsOpen={setIsOpen} isOpen={open} />
      <img src={hamburgerIcon} alt="menu" className='w-8 lg:hidden' onClick={() => setIsOpen(true)} />
      <p className='text-white font-bold text-[32px]'>{title}</p>
    </div>
  )
}

export default Title
import React from 'react'

const SearchBar = ({ value, onChange}) => {
  return (
    <div className='w-full mb-6'>
      <input 
      type="text"
      placeholder='"Search Food Products..'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default SearchBar

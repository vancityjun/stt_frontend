import React from 'react'

function Field({title, onChange, type, placeholder, required = true}) {
  return (
    <div>
      <label className="sr-only">{title}</label>
      <input onChange={(e) => onChange(e.target.value)} name={title} type={type} autoComplete={type} required={required} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={placeholder} />
    </div>
  )
}

export default Field
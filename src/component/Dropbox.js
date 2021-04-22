import React, {useState} from 'react'

function Dropbox() {
  const [file, setFile] = useState()
  const [content, setContent] = useState('')
  
  const fullPath = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFile(reader.result)
    }
  }

  const submit = () => {
    let formData = new FormData()
    formData.append("file", file)
    formData.append('languageCode', 'en-US')
    fetch('http://localhost:4000/transcript', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then((result) => {
        setContent(result)
      })
  }
  return (
    <>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
      <div className="space-y-1 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a file</span>
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">
          MP3 up to 10MB
        </p>
      </div>
      <input id="file-upload" name="file-upload" type="file" className="file-upload" onChange={({target}) => fullPath(target.files[0])} />
    </div>
    <div className="flex justify-center">
      <button type="button" onClick={()=> submit()} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </div>
    <div className="mt-1">
      <textarea type="text" value={content} onChange={({target}) => setContent(target.value)} rows="7" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" />
    </div>
    </>
  )
}

export default Dropbox
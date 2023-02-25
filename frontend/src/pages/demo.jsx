import React from 'react'

const demo = () => {
    return (
        <div>
            <div className='container mx-auto flex flex-col lg:flex-row gap-6 mt-6'>

                <main className="px-2 lg:px-9 bg-slate-300" style={{ flex: "5" }}>

                    <input className='lg:mt-6 p-3' type="text" name='title' value={title} placeholder='title' onChange={handleChange} />

                    <div className='editor h-96 overflow-scroll lg:my-6 bg-white'>
                        <ReactQuill theme="snow" className='h-full border-none' name='description' value={description} onChange={handleChange} />
                    </div>

                </main>

                <aside className="flex flex-col gap-6 bg-slate-300 px-3 py-6" style={{ flex: "2" }}>

                    <h3 className='bg-blue-500 px-4 py-2 font-semibold text-white text-center cursor-pointer items-center space-x-2 w-1/2 rounded' onClick={handleClick}>Publish</h3>

                    <div className='flex justify-between'>
                        <span> <b>Status: </b>Draft</span>
                        <span> <b>Visibility: </b>Public</span>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Upload Post Thumbnail
                        </label>
                        <input className='hidden' type="file" id='thumbnail' name='thumbnail' value={file} onChange={handleChange} />
                        <label htmlFor="thumbnail" className='relative mt-2 flex min-h-[99px] items-center justify-center cursor-pointer rounded-md border border-dashed border-blue-600 p-12 text-center'>Select Image</label>
                    </div>

                    <div>
                        <label htmlFor="category">Select Post Category</label>
                        <select id="category" className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-violet-500 p-2.5 block w-full">
                            <option selected>Choose a Category</option>
                            <option value="web">Web</option>
                            <option value="java">Java</option>
                            <option value="art">Art</option>
                            <option value="dsa">DSA</option>
                        </select>
                    </div>

                    <div className='flex justify-between'>
                        <button className='bg-blue-300 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded'>Save as Draft</button>
                        <button className='bg-blue-400 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded'>Update</button>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default demo

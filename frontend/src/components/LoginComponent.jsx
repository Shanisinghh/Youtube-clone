import React from 'react'

function LoginComponent({heading , }) {
  return (
       <>
    <div className='flex justify-center flex-col items-center '>
       <div className='w-[40vw] p-4 bg-gray-100 rounded-2xl'>
        <h3 className='text-2xl font-semibold m-auto text-center mb-2 w-full'>SignUp</h3>
        <form action="" className='flex flex-col gap-2  p-2.5'>
            <label htmlFor="username" className='text-md font-semibold text-gray-700'>UserName</label>
            <input type="text" className='outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold' id='username' name='username' placeholder='Enter your username' />
            <label htmlFor="email" className='text-md font-semibold text-gray-700'>Email</label>
            <input type="email" className='outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold' id='email' name='email' placeholder='Enter your email' />
            <label htmlFor="password" className='text-md font-semibold text-gray-700'>Password</label>
            <input type="password" className='outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold' name='password' id='password' placeholder='Enter your password' />
            <label htmlFor="userImage" className='text-md font-semibold text-gray-700'>User Image</label>
            <input type="text" className='outline-none border border-gray-500 px-2.5 py-1 rounded-md font-semibold' name='avatar' id='userImage' placeholder='Paste your image URL' />
            <div className='flex justify-center gap-2.5 items-center'>
                <button type='submit' className=' w-63  py-1 bg-green-700 cursor-pointer mt-2.5 rounded-md outline-none border border-gray-300 hover:bg-green-600' >Submit</button>
                <div className='text-blue-700 font-semibold cursor-pointer mt-1.5 hover:text-blue-900 hover:underline '>Go to Login</div>
            </div>
        </form>
       </div>

        {/* {isLogIn? <h1>login</h1>:<h1>register</h1>} */}
    </div>
    </>
  )
}

export default LoginComponent
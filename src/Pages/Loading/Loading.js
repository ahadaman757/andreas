import React from 'react'
import ReactLoading from 'react-loading';
function Loading() {
  return (
    <div className="container-fluid d-flex flex-column " style={{height:'100vh'}}> 
        <div className="container  d-flex justify-content-center align-items-center  flex-grow-1">
            <div className="  flex-grow-1 d-flex justify-content-center align-items-center ">
                    {/* <h1 className='text-white'>
                        Loading screen
                    </h1> */}
                    <div>
                    <ReactLoading type='spin' color='black'  height={100} width={100} />

                    </div>
            </div>
        </div>

    </div>
  )
}

export default Loading
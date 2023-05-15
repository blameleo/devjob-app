import React from 'react'
import data from '../data.json'
import Job from './Job';

const Jobs = () => {
    console.log(data);
  return (
 
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 mt-16  w-10/12 mx-auto'>
      {
        data.map((job,index)=>{
            return <Job key={index} data={job}/>
        })
      }


    </div>

  

  )
}

export default Jobs

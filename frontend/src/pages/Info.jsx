import React, { useState } from 'react'
import StudentInfo from '../components/StudentInfo'
import { getStudent,getUser } from '../Redux/slices/UserSlice'
import { useSelector,useDispatch } from 'react-redux'
const Info = () => {
  const [data,setData] = useState("");
  const dispatch = useDispatch();
  const user =  useSelector(getUser)
  const fetchUser = async(e,val)=>{
    e.preventDefault();
    try{
      
      await dispatch(getStudent({uuid:val})); 
    } catch(rejectedValueOrSerializedError)
    {
      console.error(rejectedValueOrSerializedError)
    }
  } 
  
  return (
    <>
    <div className='container'>
        <form className='search-box mb-3' onSubmit={(e)=>{fetchUser(e,data)}}>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder='Please enter UUID'
            aria-describedby="name"
            style={{width:"50%"}}
            onChange={(e)=>setData(e.target.value)}
          />
          <input  type="submit" className='btn btn-primary ms-3' value="Lookup"/>
        </form>
        
        {user ? <StudentInfo {...user} /> : null}
    </div>
    </>
  )
}

export default Info
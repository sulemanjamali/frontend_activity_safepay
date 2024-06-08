import React from 'react'
import StudentList from "../components/StudentList";
import StudentInfo from "../components/StudentInfo";
import AddStudent from '../components/Modals/AddStudent';
import { getUser } from '../Redux/slices/UserSlice'
import { useSelector,useDispatch } from 'react-redux'
const Home = () => {
  const user = useSelector(getUser);
  return (
   <>
   <div  className="container mb-3 student-list">
   {user ? <StudentInfo {...user} /> : null}
   <AddStudent/>  
   </div>
   <StudentList/>
   </>
  )
}

export default Home
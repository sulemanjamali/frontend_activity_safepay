import {Fragment, useEffect,useState} from 'react'
import { getStudents } from '../Redux/slices/StudentsSlice'
import { useSelector,useDispatch } from 'react-redux'
import EditStudent from './Modals/EditStudents'
import DeleteStudents from './Modals/DeleteStudents'
import { getUserList } from '../Redux/slices/StudentsSlice'
const StudentList = () => {
  const [search,setsearch] = useState("");
  const students = useSelector(getUserList)
  const dispatch = useDispatch();
  const Students = async()=>{
    try{
      const data = await dispatch(getStudents()).unwrap();
      // setStudents(data);
    } catch(rejectedValueOrSerializedError){
      console.error(rejectedValueOrSerializedError);
    }
  };

  useEffect(()=>{
    let mount = true;
    if(mount){
      Students()
    }
    return ()=>{
      mount = false;
    }
  },[]);

  return (
    <>
      <div className="container">
        <form className='search-box mb-3'>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder='search by name'
            aria-describedby="name"
            style={{width:"50%"}}
            onChange={(e)=>setsearch(e.target.value)}
          />
          {/* <button className='btn btn-primary ms-3'>
            search
          </button> */}
        </form>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">UUI</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Sex</th>
                <th scope="col">Siblings</th>
                <th scope="col">Gpa</th>
                <th scope="col">Class</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {students
              .filter((item)=>{
                return item.name.toLowerCase().includes(search.toLowerCase())
              })
                .map((item, i) => {
                  return (
                    <Fragment key={i}>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{item.uuid}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.sex}</td>
                        <td>{item.siblings}</td>
                        <td>{item.gpa}</td>
                        <td>{item.class}</td>
                        <td className="actions">
                          <EditStudent {...item} />
                          <DeleteStudents uuid={item.uuid} />
                        </td>
                      </tr>
                    </Fragment>
                  );
                })
                .sort((a, b) => {
                  return b.uuid - a.uuid;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentList
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addStudents,adduser } from '../../Redux/slices/StudentsSlice';

const AddStudent = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {register, handleSubmit,formState:{errors},reset } = useForm();
    const dispatch = useDispatch();
    const postData = async (data)=>{
           try{
            if(Object.entries(errors).length==0){
              await dispatch(addStudents(data))
              .then(async(res)=>{
                console.log(res.payload)
                if(res.payload.uuid){
                  data.uuid = res.payload.uuid;
                  await dispatch(adduser(data));
                  reset();
                  handleClose();
                }
              })
            }
           }catch(rejectedValueOrSerializedError){
            console.error(rejectedValueOrSerializedError);
           }
    };
    return (
      <>
        <div id="add-student">
          <Button variant="primary" onClick={handleShow}>
            Add student
          </Button>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <form onSubmit={handleSubmit(async(data)=>{
            postData(data);
          })}>
          <Modal.Header closeButton>
            <Modal.Title>Add student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="form-scroll">
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                 Name
                </label>
                <input
               {...register("name",{required:"This is required!",})}
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="name"
                />
                <p className='form-error'>{errors.name?.message}</p>
              </div>
              <div className="mb-2">
                <label htmlFor="age" className="form-label">
                 Age
                </label>
                <input
                 {...register("age", {required:"This is required!",valueAsNumber: true})}
                  type="number"
                  className="form-control"
                  id="age"
                  aria-describedby="age"
                />
                <p className='form-error'>{errors.age?.message}</p>
              </div>
              <div className="mb-2">
              <label htmlFor="name" className="form-label">
               Sex
              </label>
                <select 
                {...register("sex", {required:"This is required!"})}
                type="text"
                className="form-control"
                id="sex"
                aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <p className='form-error'>{errors.sex?.message}</p>
              </div>
              <div className="mb-2">
                <label htmlFor="siblings" className="form-label">
                Siblings
                </label>
                <input
                 {...register("siblings", {required:"This is required!",valueAsNumber: true})}
                  type="number"
                  className="form-control"
                  id="siblings"
                  aria-describedby="siblings"
                />
                 <p className='form-error'>{errors.siblings?.message}</p>
              </div>
              <div className="mb-2">
                <label htmlFor="gpa" className="form-label">
                gpa
                </label>
                <input
                 {...register("gpa", {required:"This is required!",
                 valueAsNumber:true,
                 min:{
                  value: 1,
                  message:"Min GPA 1"
                 },
                 max:{
                  value: 4,
                  message:"Max GPA 4"
                 },
                },
                )}
                  type="number"
                  className="form-control"
                  id="gpa"
                  aria-describedby="gpa"
                />
                 <p className='form-error'>{errors.gpa?.message}</p>
              </div>
              <div className="mb-2">
                <label htmlFor="class" className="form-label">
                Class
                </label>
                <input
                 {...register("class", {required:"This is required!",valueAsNumber: true})}
                  type="number"
                  className="form-control"
                  id="class"
                  aria-describedby="class"
                />
                 <p className='form-error'>{errors.class?.message}</p>
              </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit"variant="primary">
              Add
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </>
    );
}

export default AddStudent
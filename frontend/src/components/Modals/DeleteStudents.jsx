import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteStudents,deleteUser } from '../../Redux/slices/StudentsSlice';
import { useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md"
const DeleteStudents = ({uuid}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    const deleteStudent = async()=>{
      try{
        await dispatch(deleteStudents({uuid}))
      .then(async(res)=>{
        if(res.payload.success){
          await dispatch(deleteUser({uuid}));
          handleClose()
        }
      });
      } catch(rejectedValueOrSerializedError){
        console.error(rejectedValueOrSerializedError)
      }
     }
    return (
      <>
       <div id='delete-student'>
       <Button variant="danger" onClick={handleShow}>
       <MdDelete />
        </Button>
       </div>
  
        <Modal 
        show={show} 
        onHide={handleClose}
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='delete-model'>
            <Button variant="danger" style={{width:"40%"}} onClick={handleClose}>
              cancel
            </Button>
            <Button variant="primary" style={{width:"40%"}} onClick={deleteStudent}>
              yes
            </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default DeleteStudents
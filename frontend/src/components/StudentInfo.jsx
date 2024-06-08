import React from "react";

const StudentInfo = ({uuid,name, age,siblings,sex,gpa,class : studentclass}) => {
  return (
    <>
     
     <div className="card" style={{width:"18rem"}}>
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h4 className="card-title">Student</h4>
          <div className="card-text">
          <p className="">UUID : {uuid}</p>
          <p className="">Name : {name}</p>
          <p className="">Age : {age}</p>
          <p className="">Sex : {sex}</p>
          <p className="">age : {siblings}</p>
          <p className="">GPA : {gpa}</p>
          <p className="">Class : {studentclass}</p>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default StudentInfo;

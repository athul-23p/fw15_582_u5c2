import './addstudent.css';
import axios from "axios";
import { useState, useEffect } from "react";

export const AddStudent = () => {

  const [formData,setFormData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    gender:"",
    age:0,
    tenth_score:0,
    twelth_score:0,
    preferred_branch:""
  });

  

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if(err.length > 0){
      console.log(err);
      alert(err.join('\n'));
      return;
    }
    axios.post("http://localhost:8080/students",formData)
    .then(response => {console.log(response)})
    .catch(error => console.log(error));
  }

  const validate = () => {
    
    const errors = [];
    
    //validate age
    if(+formData.age > 50){
      errors.push('Age should not be greater than 50')
    }

    // validate 10 the score
    if(+formData.tenth_score > 100){
      errors.push('10th score should be not be greate than 100')
    }

    // validate 12 the score
    if (+formData.twelth_score > 100) {
      errors.push("12th score should be not be greate than 100");
    }

    return errors;
  }
  return (
    <form className="addstudent" onSubmit={handleSubmit}>
      <div>
        Firstname:{" "}
        <input
          type="text"
          name="first_name"
          className="first_name"
          placeholder="enter first name"
          onChange={handleChange}
        />
      </div>
      <div>
        {" "}
        Last Name:
        <input
          type="text"
          name="last_name"
          className="last_name"
          placeholder="enter last name"
          onChange={handleChange}
        />
      </div>
      <div>
        {" "}
        Email:
        <input
          type="email"
          name="email"
          className="email"
          placeholder="enter email"
          onChange={handleChange}
        />
      </div>

      <div>
        Gender: {/* NOTE: radio boxes only work when they have same `name`. */}
        <div>
          Male
          <input
            name="gender"
            className="male"
            type="radio"
            value={"male"}
            onChange={handleChange}
          />{" "}
          Female{" "}
          <input
            name="gender"
            className="female"
            type="radio"
            value={"female"}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        Age{" "}
        <input
          type="number"
          name="age"
          className="age"
          placeholder="enter age"
          onChange={handleChange}
        />
      </div>
      <div>
        Tenth Score:{" "}
        <input
          type="number"
          name="tenth_score"
          className="tenth_score"
          placeholder="enter 10th score"
          onChange={handleChange}
        />{" "}
      </div>
      <div>
        Twelth Score:{" "}
        <input
          type="number"
          name="twelth_score"
          className="twelth_score"
          placeholder="enter 12th score"
          onChange={handleChange}
        />{" "}
      </div>
      <div>
        <select
          value={""} // select dropdown needs both value and onChange attributes
          name="preferred_branch"
          className="preferred_branch"
          onChange={handleChange}
        >
          <option value="law">law</option>
          <option value="commerce">commerce</option>
          <option value="science">science</option>
          <option value="sports">sports</option>
          <option value="arts">arts</option>
          <option value="acting">acting</option>
        </select>
      </div>

      <input className="submit" type="submit" value="Submit" />
      {
        // <div className="error"></div>
        // show this div with proper error before submitting form, if there's anything not provided
        // eg: first name missing, age cannot be greater than 100 etc
      }
    </form>
  );
};

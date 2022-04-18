import "./showstudents.css";
import axios from "axios";
import { useState, useEffect } from "react";
export const ShowStudents = () => {
  const [students, setStudents] = useState([]);
  const [sortControls, setSortControls] = useState({
    sortby: "first_name",
    sortorder: "asc",
  });
  useEffect(() => {
    getStudentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSortControls({ ...sortControls, [name]: value });
  };

  const getStudentData = () => {
    axios
      .get("http://localhost:8080/students")
      .then((response) => {
        setStudents(sortData(response.data));
      })
      .catch((error) => console.log(error));
  };

  const sortData = (studentData) => {
    const { sortby, sortorder } = sortControls;

    const tempData = [...studentData];

    if (sortby === "first_name" || sortby === "gender") {
      tempData.sort((a, b) => {
        if (sortControls.sortorder === "desc") {
          if (a[sortby] < b[sortby]) {
            return 1;
          } else if (a[sortby] > b[sortby]) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (a[sortby] < b[sortby]) {
            return -1;
          } else if (a[sortby] > b[sortby]) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    } else {
      tempData.sort((a, b) => {
        if (sortorder === "asc") {
          return a[sortby] - b[sortby];
        } else {
          return b[sortby] - a[sortby];
        }
      });
    }
    return tempData;
  };

  const handleUpdate = (data) => {
    setStudents(data);
  };
  return (
    <div>
      <div className="controls">
        <div>
          Sort By:{" "}
          <select
            // select dropdown needs both value and onChange
            className="sortby"
            onChange={handleChange}
            name="sortby"
          >
            <option value="first_name" selected>
              First Name
            </option>
            <option value="gender">Gender</option>
            <option value="age">Age</option>
            <option value="tenth_score">10th Score</option>
            <option value="twelth_score">12th Score</option>
          </select>
        </div>
        <div>
          Order:
          <select
            // select dropdown needs both value and onChange
            className="sortorder"
            onChange={handleChange}
            name="sortorder"
          >
            <option value="asc" selected>
              Ascending
            </option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button
          className="sort"
          onClick={() => {
            handleUpdate(sortData(students));
          }}
        >
          sort
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th>10th Score</th>
            <th>12th Score</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {/* populate all rows like below: */}

          {/* <tr className="row">
            <td className="first_name"></td>
            <td className="last_name"></td>
            <td className="email"></td>
            <td className="gender"></td>
            <td className="age"></td>
            <td className="tenth_score"></td>
            <td className="twelth_score"></td>
            <td className="preferred_branch"></td>
          </tr> */}
          {students.map((s) => {
            return (
              <tr className="row">
                <td className="first_name">{s.first_name}</td>
                <td className="last_name">{s.last_name}</td>
                <td className="email">{s.email}</td>
                <td className="gender">{s.gender}</td>
                <td className="age">{s.age}</td>
                <td className="tenth_score">{s.tenth_score}</td>
                <td className="twelth_score">{s.twelth_score}</td>
                <td className="preferred_branch">{s.preferred_branch}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

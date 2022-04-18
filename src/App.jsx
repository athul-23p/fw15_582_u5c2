import { AddStudent } from "./components/AddStudent";
import { ShowStudents } from "./components/ShowStudents";
import {useState} from 'react';

function App() {
  const [showStudents,setShowStudents] = useState(true);

  return (
    <div className="App">
      <button className="togglebtn" onClick={() => setShowStudents(!showStudents)}>
        {showStudents?"Go to form":"show students"}
      </button>
      {showStudents? <ShowStudents/> : <AddStudent/>}
      {/* Show either  AddStudent component or ShowStudents dependeing on the above button click  */}
      {/* make sure the table is shown initially, do not show form initially */}
      {/* make sure to show either of them do not both together */}
    </div>
  );
}

export default App;

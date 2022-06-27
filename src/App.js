import './App.css';
import React, { useEffect, useState } from 'react';
import db from "./api/firebaseConfig";
import { onSnapshot, collection, doc, addDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const [waterData, setWaterData] = useState([{ name: "Loading...", id: "initial" }]);
  console.log(db);
  useEffect(
    () =>
      onSnapshot(collection(db, "WaterData"), (snapshot) =>
      // console.log(snapshot);
        setWaterData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  const waterCollectionRef = collection(db, "WaterData");
  // const [new_do, setNew_do] = useState(0);
  // const [new_tds, setNew_tds] = useState(0);
  // const [new_turbidity, setNew_turbidity] = useState(0);
  // const [new_ph, setNew_ph] = useState(0);
  // const [new_temp, setNew_temp] = useState(0);
  const [new_timestamp, setNew_timestamp] = useState();

  const createData = async () => {
    await addDoc(waterCollectionRef, { do: Number(7), tds: Number(240), turbidity: Number(3), ph: Number(7), temp: Number(28), timestamp: String(new_timestamp) });
  };

  const deleteData = async (id) => {
    const DataDoc = doc(db, "WaterData", id);
    await deleteDoc(DataDoc);
  };

  console.log(waterData);

  return (
    <div className="App">
      <h1>Insert Data Here</h1>
      <div class="inputDiv">
      <input
        type="string"
        placeholder="TimeStamp..."
        onChange={(event) => {
          setNew_timestamp(event.target.value);
        }}
      />
      
      </div>

      <button onClick={createData}> Insert Data </button>

      {waterData.map((data) => {
        return(
          <>
          <table>
            <th>DO</th>
            <th>TDS</th>
            <th>Turbidity</th>
            <th>pH</th>
            <th>Temp</th>
            <tr>
              <td>{data.do}</td>
              <td>{data.tds}</td>
              <td>{data.turbidity}</td>
              <td>{data.ph}</td>
              <td>{data.temp}</td>
              <button
              onClick={() => {
                deleteData(data.id);
              }}
            >
              {" "}
              Delete Data
            </button>
            </tr>
          </table>
         
            </>
        );})}
    </div>
  );
}

export default App;

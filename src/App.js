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
    await addDoc(waterCollectionRef, { do: Number(7.1), tds: Number(140), turbidity: Number(1.5), ph: Number(7.05), temp: Number(26), wqi: Number(48.67), timestamp: String(new_timestamp) });
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
      <br></br>

      {waterData.map((data) => {
        return(
          <>
          <table>
            <th>No</th>
            <th>DO</th>
            <th>TDS</th>
            <th>Turbidity</th>
            <th>pH</th>
            <th>Temp</th>
            <th>WQI</th>
            <tr>
              <td>{data.id}</td>
              <td>{data.do}</td>
              <td>{data.tds}</td>
              <td>{data.turbidity}</td>
              <td>{data.ph}</td>
              <td>{data.temp}</td>
              <td>{data.wqi}</td>
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

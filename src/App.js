import React, { useState } from 'react';
import axios from 'axios';
import server from './constants/api';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';
import Card from './Components/PlantCard';
import Graph from './Components/Graph';

function GetAll() {
  const [data, setData] = useState([]);
  
  return (
    <div>
      <h1>Get All</h1>
      <button onClick={() => {
        axios.get(server.base+"/getMoistureLevels/")
        .then(res =>setData(res.data))
      }}>
       Get All
      </button>
      <div>
        {data.map(item=>(
          <div>
            <div>{item.created}</div>
            <div>{item.level}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GetOne() {
  const [id, setId] = useState("");
  const [data, setData] = useState({});
  
  return (
    <div>
      <h1>Get 1</h1>
      <input onChange={(e)=>setId(e.target.value)}/>
      <button onClick={() => {
        axios.get("/getMoistureLevel/"+id+"/")
        .then(res => setData(res.data))
       }}
      >Get By ID
      </button>
      <div>
        <div>{data.created}</div>
        <div>{data.level}%</div>
      </div>
    </div>
  );
}

function Insert() {
  const [sendData, setsendData] = useState({});
  const [data, setData] = useState({});
  
  return (
    <div>
      <h1>Create</h1>
      <div>Moisture: </div>
      <input onChange={(e)=>setsendData({...sendData, level: e.target.value})}/>
      <div>Meter Id: </div>
      <input onChange={(e)=>setsendData({...sendData, plant_id: e.target.value})}/>
      <div>Plant Type: </div>
      <input onChange={(e)=>setsendData({...sendData, plant_type: e.target.value})}/>

      <button onClick={() => {
        axios.post(server.base+server.create, sendData)
        .then(res => setData(res.data))
      }}
      >Insert
      </button>
      <div>
        <div>ID: {data.id}</div>
        <div>meter num: {data.plant_id}</div>
        <div>date: {data.created}</div>
        <div>level: {data.level}%</div>
        <div>type: {data.plant_type}</div>
      </div>
    </div>
  );
}

function Update() {
  const [id, setId] = useState("");
  const [moisture, setMoisture] = useState("");
  const [data, setData] = useState("");
  
  return (
    <div>
      <h1>Update</h1>
      <div>ID: </div>
      <input onChange={(e)=>setId(e.target.value)}/>
      <div>Moisture: </div>
      <input onChange={(e)=>setMoisture(e.target.value)}/>
      
      <button onClick={() => {
        let sendData = {"level": moisture};
       
        axios.put("/updateMoistureLevel/"+id+"/", sendData)
        .then(res => setData(res.data))
       }}
      >Update by ID
      </button>
      <div>
        <div>{data.id}</div>
        <div>{data.plantId}</div>
        <div>{data.name}</div>
        <div>{data.created}</div>
        <div>{data.level}%</div>
        <div>{data.plantType}%</div>
      </div>
    </div>
  );
}

function Remove() {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  
  return (
    <div>
      <h1>Delete</h1>
      <div>ID: </div>
      <input onChange={(e)=>setId(e.target.value)}/>
      <button onClick={() => {
       
        axios.delete("/deleteMoistureLevel/"+id+"/")
        .then(res => setData(res.data))
       }}
      >Delete By ID
      </button>
      <div>
        {data}
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <br/>
      <Grid columns='equal'>
        <Grid.Row centered verticalAlign={'middle'}>
          <Grid.Column style={{marginLeft:'5rem'}}>
            <Card title="Meter 1" id='plant1'/>
          </Grid.Column>
          <Grid.Column>
            <Card title="Meter 2" id='plant2'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered verticalAlign={'middle'}>
          <Grid.Column style={{marginLeft:'5rem'}}>
            <Graph title="Meter 1" id='plant1'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{marginLeft:'5rem'}}>
            <Graph title="Meter 2" id='plant2'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;

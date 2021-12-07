import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';
import Card from './Components/PlantCard';
import Graph from './Components/Graph';

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

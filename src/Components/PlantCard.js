import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server, {plantValues} from '../constants/api';
import { Card, Image, Dropdown, Modal, Message } from 'semantic-ui-react';

const PlantCard = ({title, id}) => {
    const [data, setData] = useState({});

    const mapOptions = () => {
        return Object.keys(plantValues).map(plant => {
            return {
                key: plant,
                text: plant,
                value: plant,
            }
        });
    }

    const dropdownHandler = (event, item) => {
        let sendData = {...data, plant_type: item.value};
        axios.put(server.base + server.update(data.id), sendData)
        .then(res =>setData(res.data))
        .catch(err => console.error(err))
    }

    const alertBox = () => {
        alert(`${title} needs watering`)
        return (<div></div>);
    }

    useEffect(() => {
        setInterval(()=>{
            axios.get(server.base + server.getRecent(id))
            .then(res =>setData(res.data[0]))
            .catch(err => console.error(err))
        }, 20000);
    },[id]);

    return (

        <Card>
            <Image src={'/plant.png'} ui={false}/>
            <Card.Content>
                <Card.Header>{data?.plant_type?.toUpperCase()}</Card.Header>
                <Card.Meta>Current Level: {data?.level}%</Card.Meta>
                <Card.Description>{plantValues[data?.plant_type]?.desc}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Dropdown placeholder='Change Plant?' fluid selection options={mapOptions()} onChange={dropdownHandler}/>
            </Card.Content>
            {
                data?.level < plantValues[data?.plant_type]?.level 
                && 
                (
                    <Message>
                        <Message.Header>{title} needs watering</Message.Header>
                    </Message>
                )
            }
        </Card>
    );
}

export default PlantCard

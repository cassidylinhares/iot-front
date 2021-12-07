import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../constants/api';
import { Card, Image, Dropdown, Message } from 'semantic-ui-react';

const PlantCard = ({title, id}) => {
    const [data, setData] = useState({});
    const [options, setOptions] = useState([]);

    const mapOptions = () => {
        return options?.map(plant => {
            return {
                key: plant,
                text: plant,
                value: plant,
            }
        });
    }

    const dropdownHandler = (event, item) => {
        //change plant
        axios.get(server.base + server.changePlant(id, item.value))
        .then(res => {
            console.log(Object.keys(res.data))
            setData({...data, ...res.data})
            console.log(data)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        setInterval(()=>{
            //get recents
            axios.get(server.base + server.getRecent(id))
            .then(res =>setData(res.data))
            .catch(err => console.error(err));

            //get options
            axios.get(server.base + server.getPlants)
            .then(res =>setOptions(res.data))
            .catch(err => console.error(err))
        }, 60000);
    },[id]);

    return (

        <Card>
            <Image src={'/plant.png'} ui={false}/>
            <Card.Content>
                <Card.Header>{data?.plant_type?.toUpperCase()}</Card.Header>
                <Card.Meta>Current Level: {data?.level}%</Card.Meta>
                <Card.Description>{data?.desc}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Dropdown placeholder='Change Plant?' fluid selection options={mapOptions()} onChange={dropdownHandler}/>
            </Card.Content>
            {
                data?.level < data?.ideal_level 
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

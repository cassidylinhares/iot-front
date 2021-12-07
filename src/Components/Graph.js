import React, { useEffect, useState } from 'react'
import axios from 'axios';
import server from '../constants/api';
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { Header } from 'semantic-ui-react';

const Graph = ({title, id}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setInterval(()=>{
            //get recents
            axios.get(server.base + server.getRecents(id))
            .then(res =>setData(res.data.slice(0,14)))
            .catch(err => console.error(err));
        }, 60000);
    },[id]);

    return (
        <div>
            <Header as='h1'>{title}</Header>
            <AreaChart 
            width={830} 
            height={250} 
            data={data? data: []}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id={'colour'} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                {console.log(data)}
                <XAxis dataKey="created" hide/>
                <YAxis dataKey="level"/>
                <Tooltip />
                <Area type="monotone" dataKey="level" stroke="#8884d8" fillOpacity={1} fill="url(#colour)" />
            </AreaChart>
        </div>
    )
}

export default Graph

import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    MDBCard,
    MDBCardImage,
    MDBIcon
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import '../Css/Stats.css';
import solarpanelImage from '../Images/solarpanel-login.jpeg';


    const Stats = () => {

        const [producedToday, setProducedToday] = useState(0);
        const [totalProduced, setTotalProduced] = useState(0);
        const userId = 2; // Replace with the actual user ID


        // Fetch produced energy for today
        const fetchProducedToday = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/users/${userId}/produced-energy`);
                if (response.ok) {
                    const data = await response.json();
                    setProducedToday(data);
                } else {
                    console.error('Failed to fetch produced energy for today:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching produced energy for today:', error);
            }
        };
    
        useEffect(() => {
            // Fetch data initially
            fetchProducedToday();
    
            // Set interval to fetch data periodically
            const interval = setInterval(() => {
                fetchProducedToday();
            }, 1000); // Fetch every 60 seconds (adjust as needed)
    
            // Clear interval on component unmount
            return () => clearInterval(interval);
        }, []);        

        const data1 = [
        { name: "Gerado", value: 2 },
        { name: "Resto", value: 5 }
        ];
    
    const COLORS1 = ["green", "#A9E09B"];

        const data2 = [
        { name: "Consumido", value: 1 },
        { name: "Resto", value: 6 }
        ];
    
    const COLORS2 = ["orange", "#7C3C00"];

    const classes = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));
    
    return (
      <div className="stats-container">
        <MDBCard className='out-card'>
            <div className='parent'>
                <MDBCard className='div1'>
                    <MDBCardImage src={solarpanelImage} className='div1'/>
                </MDBCard>
                <MDBCard className='div2'>
                    <p>Criado em: 10.09.2021</p>
                    <p>Classificação: Residencial</p>
                    <p>Capacidade FV: 2.10 kW</p>
                    <p>Endereço: Rua da alegria 120, 3800-025</p>
                </MDBCard>
                <MDBCard className='div3'>
                    <p>Hoje: Sol 23º</p>
                    <p>Amanhã: Chuva 21º</p>
                    <p>Terça-Feira: Chuva 20º</p>
                    <p>Quarta-feira: SoL 26º</p>
                </MDBCard>
                <MDBCard className='div4'>

                </MDBCard>
                <MDBCard className='div5'>
                    <MDBCard className='div10'>
                        <MDBIcon size="3x" icon="bolt" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Produção Hoje</p>
                        <p>{producedToday.toFixed(3)} kWh</p>
                    </MDBCard>
                    <MDBCard className='div11'>
                        <MDBIcon size="3x" icon="coins" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Receita Hoje</p>
                        <p>{(producedToday*0.1).toFixed(2)} €</p>
                    </MDBCard>
                    <MDBCard className='div12'>
                        <MDBIcon size="3x" icon="bolt" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Geração Total</p>
                        <p>000.00 kw/Wh</p>
                    </MDBCard>
                    <MDBCard className='div13'>
                        <MDBIcon size="3x" icon="money-bill-wave" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Receita Total</p>
                        <p>0.00 EUR</p>
                    </MDBCard>

                </MDBCard>
                <MDBCard className='div6'>
                    <div className='div20'>
                        <ButtonGroup size="small" color="inherit" aria-label="small outlined button group">
                            <Button>Dia</Button>
                            <Button>Mês</Button>
                            <Button>Ano</Button>
                        </ButtonGroup>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data1}
                                outerRadius={130}
                                innerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                stroke="transparent"
                            >
                                {data1.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div>
                    <div className='div21'>
                                    
                        <div className={classes.root}>
                            <ButtonGroup size="small" color="inherit" aria-label="small outlined button group">
                                <Button>Dia</Button>
                                <Button>Mês</Button>
                                <Button>Ano</Button>
                            </ButtonGroup>
                        </div>
                        <PieChart width={400} height={400}>
                                <Pie
                                    data={data2}
                                    outerRadius={130}
                                    innerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    stroke="transparent"
                                >
                                    {data2.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </div>
                </MDBCard>
                <MDBCard className='div7'>
                    
                </MDBCard>
            </div>
        </MDBCard>
      </div>
    );
  }
      
  export default Stats;
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {
    MDBCard,
    MDBCardImage,
    MDBIcon,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useEffect, useState } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { useParams } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { useAuth } from '../Context/AuthContext'; // Import useAuth from your authentication context
import '../Css/Stats.css';
import energyRealTime from '../Images/energy.png';
import solarpanelImage from '../Images/solarpanel-login.jpeg';


    const Stats = () => {
        const { isLoggedin } = useAuth(); // Retrieve authentication status from the context
        const [producedToday, setProducedToday] = useState(0);
        const [totalProduced, setTotalProduced] = useState(0);
        const {sistemaId} = useParams(); // Replace with the actual morada ID
        const [morada, setMorada] = useState('');
        const [capacidade, setCapacidade] = useState(0);


        // Fetch produced energy for today
        const fetchProducedToday = async () => {
            try {
                const response = await fetch(`http://localhost:8080/sistemas/${sistemaId}/consumed-energy`);
                if (response.headers.get("Content-Type").includes("application/json")) {
                    const data = await response.json();
                    setProducedToday(data);
                } else {
                    console.error('Failed to fetch produced energy for today:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching produced energy for today:', error);
            }
        };


        // Fetch sistema info
        const fetchSisInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/sistemas/${sistemaId}`);
                if (response.ok) {
                    const data = await response.json();
                    setMorada(data.morada);
                    setCapacidade(data.potencia);
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
            fetchSisInfo();
    
            // Set interval to fetch data periodically
            const interval = setInterval(() => {
                fetchProducedToday();
            }, 1000); // Fetch every 60 seconds (adjust as needed)
    
            // Clear interval on component unmount
            return () => clearInterval(interval);
        }, [isLoggedin]);

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
                    <p>Morada: {morada}</p>
                    <p>Potência: {capacidade} kW</p>    
                </MDBCard>
                <MDBCard className='div4'>
                    <div className='div41'>
                        <ReactSpeedometer
                            maxValue={500}
                            value={173}
                            valu
                            needleColor="red"
                            needleTransitionDuration={4000}
                            needleTransition="easeElastic"
                            segments={2}
                            segmentColors={['#F58D5B', '#ffffff']}
                            customSegmentStops={[0, 173, 500]}
                            customSegmentLabels={[
                              {
                                text: '',
                                position: 'OUTSIDE',
                                color: '#d8dee9',
                              },
                              {
                                text: '',
                                position: 'OUTSIDE',
                                color: '#d8dee9',
                              },
                            ]}
                            ringWidth={47}
                            />
                    </div>
                </MDBCard>
                <MDBCard className='div5'>
                    <MDBCard className='div10'>
                        <MDBIcon size="3x" icon="bolt" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Produção Hoje</p>
                        <p>{producedToday.toFixed(3)} kW</p>
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
                    <div className='d-flex align-items-center' style={{ height: '100%' }}>
                        <MDBCardImage src={energyRealTime} className='div7 mx-auto d-block' style={{ height: '70%'}} />
                    </div>
                    <div className="texto-sobreposto-1">
                        <p>0 W</p>
                    </div>
                    <div className="texto-sobreposto-2">
                        <p>1045 W</p>
                    </div>
                    <div className="texto-sobreposto-3">
                        <p>1045 W</p>
                    </div>
                </MDBCard>

            </div>
        </MDBCard>
      </div>
    );
  }
      
  export default Stats;
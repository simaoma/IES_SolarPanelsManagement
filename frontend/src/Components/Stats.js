import { subMinutes, format } from 'date-fns';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import {
    LineChart,
    ResponsiveContainer,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { useContext } from "react";
import { UrlContext } from "../App";


    const Stats = () => {
        const { baseUrl } = useContext(UrlContext);
        const { isLoggedin } = useAuth(); // Retrieve authentication status from the context
        const [producedToday, setProducedToday] = useState(0);
        const [totalProduced, setTotalProduced] = useState(0);
        const {sistemaId} = useParams(); // Replace with the actual morada ID
        const [morada, setMorada] = useState('');
        const [capacidade, setCapacidade] = useState(0);
        const [view, setView] = useState('live'); // 'history' or 'live'
        const [pdata, setPdata] = useState([]); // Mudei para useState([]) porque o valor inicial é um array vazio
        const [alarms, setAlarms] = useState([]); // Adicione o estado para os alarmes
        const [activeAlarms, setActiveAlarms] = useState([]); // Adicione o estado para os alarmes ativos



        
        // Função para buscar os alarmes
        const fetchAlarms = async () => {
            try {
            const response = await fetch(`${baseUrl}/alarmes/${sistemaId}`);
            if (response.ok) {
                const alarmData = await response.json();
                setAlarms(alarmData);
            } else {
                console.error('Failed to fetch alarms:', response.statusText);
            }
            } catch (error) {
            console.error('Error fetching alarms:', error);
            }
        };


            // Function to fetch active alarms
        const fetchActiveAlarms = async () => {
            try {
                const response = await fetch(`${baseUrl}/alarmes/ativos/${sistemaId}`);
                if (response.ok) {
                    const activeAlarmData = await response.json();
                    setAlarms(activeAlarmData);
                } else {
                    console.error('Failed to fetch active alarms:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching active alarms:', error);
            }
        };
        


        // Fetch produced energy for today
        const fetchProducedToday = async () => {
            try {
                const response = await fetch(`${baseUrl}/sistemas/${sistemaId}/produced-energy`);
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

        const fetchData = async () => {
            try {
                // Obtém a data atual e a data 5 minutos atrás
                const currentDate = new Date();
                const startDate = subMinutes(currentDate, 5);
            
                // Formata as datas no formato YYYY-MM-DD HH:mm:ss
                const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
                const formattedEndDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
            
                const prodResponse = await fetch(`${baseUrl}/api/sistema/${sistemaId}/historico/prod/start_date=${formattedStartDate}/end_date=${formattedEndDate}`);
                const prodData = await prodResponse.json();
                const pdataprodmap = prodData.map(item => ({ produzido: item.energy }));
    
                const consResponse = await fetch(`${baseUrl}/api/sistema/${sistemaId}/historico/cons/start_date=${formattedStartDate}/end_date=${formattedEndDate}`);
                const consData = await consResponse.json();
                const pdataconsmap = consData.map(item => ({ consumido: item.energy }));
    
                // Atualiza o estado pdata incluindo os dados de produção e consumo
                setPdata([...pdataprodmap, ...pdataconsmap]);
    
                // Restante do código permanece inalterado...
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        // Fetch sistema info
        const fetchSisInfo = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/sistemas/${sistemaId}`);
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
            fetchData();
            fetchAlarms();
            fetchActiveAlarms();
    
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
        console.log(baseUrl),
      <div className="stats-container">
        <MDBCard className='out-card'>
            <div className='parent'>
                <MDBCard className='div1' style={{ backgroundImage: `url(${solarpanelImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                    <div style={{ zIndex: 1, position: 'relative', padding: '16px' }}>
                        {morada && <p>Morada: {morada}</p>}
                        {capacidade && <p>Potência: {capacidade} kW</p>}
                    </div>   
                </MDBCard>
                <MDBCard className='div2'>
                    <p style={{ fontSize: '25px'}}>Alarms:</p>
                    <ul>
                        {alarms.map((alarm) => (
                        <li key={alarm.id}>{alarm.condicao}</li>
                        ))}
                    </ul>
                    <ButtonGroup color="inherit" style={{ marginLeft: '16rem', marginBottom: '1rem' }}>
                        <Link to={`/addalarm/${sistemaId}`} style={{ textDecoration: 'none' }}>
                            <Button style={{backgroundColor: '#f2af13' }}>Add Alarm</Button>
                        </Link>
                    </ButtonGroup>
                </MDBCard>
                <MDBCard className='div3'>
                    <p style={{ fontSize: '25px'}}>Active Alarms:</p>
                    AQUI SAO OS ALARMES ATIVOS
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
                        <p>{(producedToday*0.14).toFixed(2)} €</p>
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
                    <div className='div70'>
                        <ButtonGroup size="small" color="inherit" aria-label="small outlined button group">
                        <Button onClick={() => setView('live')}>Live Info</Button>
                        <Button onClick={() => setView('history')}>History</Button>
                        </ButtonGroup>
                    </div>

                    {view === 'live' && (
                        <>
                        <div className='d-flex align-items-center' style={{ height: '100%' }}>
                            <MDBCardImage src={energyRealTime} className='div7 mx-auto d-block' style={{ height: '70%' }} />
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
                        </>
                    )}

                    {view === 'history' && (
                        <div style={{ height: '100%' , marginLeft: '15rem', marginTop: '5rem'}}>
                            <ResponsiveContainer width="100%" aspect={3}>
                            <LineChart data={pdata} margin={{ right: 300 }}>
                                <CartesianGrid />
                                <YAxis />
                                <Legend />
                                <Line dataKey="produzido" stroke="white" />
                                <Line dataKey="consumido" stroke="orange" />
                            </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </MDBCard>
            </div>
        </MDBCard>
      </div>
    );
  }
      
  export default Stats;
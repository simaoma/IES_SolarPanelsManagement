import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { format, subHours, subMonths, subYears } from 'date-fns';
import {
    MDBCard,
    MDBCardImage,
    MDBIcon,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useContext, useEffect, useState } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { Link, useParams } from 'react-router-dom';
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, YAxis } from 'recharts';
import { UrlContext } from "../App";
import { useAuth } from '../Context/AuthContext'; // Import useAuth from your authentication context
import '../Css/Stats.css';
import energyRealTime from '../Images/energy.png';
import solarpanelImage from '../Images/solarpanel-login.jpeg';


    const Stats = () => {
        const { baseUrl } = useContext(UrlContext);
        const { isLoggedin } = useAuth(); // Retrieve authentication status from the context
        const [producedToday, setProducedToday] = useState(0);
        const [consumedToday, setConsumedToday] = useState(0);
        const {sistemaId} = useParams(); // Replace with the actual morada ID
        const [morada, setMorada] = useState('');
        const [capacidade, setCapacidade] = useState(0);
        const [view, setView] = useState('live'); // 'history' or 'live'
        const [pdata, setPdata] = useState([]); // Mudei para useState([]) porque o valor inicial é um array vazio
        const [alarms, setAlarms] = useState([]); // Adicione o estado para os alarmes
        const [activeAlarms, setActiveAlarms] = useState([]); // Adicione o estado para os alarmes ativos
        const [totalEnergyProduced, setTotalProduced] = useState(0); // Adicione o estado para a energia total produzida
        const [day1EnergyProduced, set1dayProduced] = useState(0); // Adicione o estado para a energia produzida no dia anterior
        const [day1Consumed, set1dayConsumed] = useState(0); // Adicione o estado para a energia consumida no dia anterior
        const [totalEnergyConsumed, setTotalConsumed] = useState(0); // Adicione o estado para a energia total consumida
        const [vista, setVista] = useState('dia'); // 'history' or 'live'
        const [monthEnergyProduced, set1monthProduced] = useState(0); // Adicione o estado para a energia produzida no mês anterior
        const [monthConsumed, set1monthConsumed] = useState(0); // Adicione o estado para a energia consumida no mês anterior


        const data1 = [
            { name: "Gerado no Dia", value: parseFloat(day1EnergyProduced.toFixed(2)) },
            { name: "Resto", value: parseFloat(totalEnergyProduced.toFixed(3))-parseFloat(day1EnergyProduced.toFixed(2)) }
            ];
    
            console.log(data1);
    
    
            const data3 = [
                { name: "Gerado no Mês", value: parseFloat(monthEnergyProduced.toFixed(2)) },
                { name: "Resto", value: parseFloat(totalEnergyProduced.toFixed(3))-parseFloat(monthEnergyProduced.toFixed(2)) }
                ];
        
        const COLORS1 = ["green", "#A9E09B"];
    
            const data2 = [
            { name: "Consumido no Dia", value: parseFloat(day1Consumed.toFixed(2)) },
            { name: "Resto", value: parseFloat(totalEnergyConsumed.toFixed(3))-parseFloat(day1Consumed.toFixed(2)) }
            ];
    
            const data4 = [
                { name: "Consumido no Mês", value: parseFloat(monthConsumed.toFixed(2)) },
                { name: "Resto", value:  parseFloat(totalEnergyConsumed.toFixed(3))-parseFloat(monthConsumed.toFixed(2)) }
                ];
        
        const COLORS2 = ["orange", "#7C3C00"];
    
    
        console.log(data2);

        
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
                    setActiveAlarms(activeAlarmData);
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

                // Fetch produced energy for today
        const fetchConsumedToday = async () => {
            try {
                const response = await fetch(`${baseUrl}/sistemas/${sistemaId}/consumed-energy`);
                if (response.headers.get("Content-Type").includes("application/json")) {
                    const data = await response.json();
                    setConsumedToday(data);
                } else {
                    console.error('Failed to fetch produced energy for today:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching produced energy for today:', error);
            }
        };

        const fetchData = async () => {
            try {
                // Obtém a data atual e a data 5 anos atrás
                const currentDate = new Date();
                const startDate = subYears(currentDate, 5);
            
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

                const totalEnergyProduced = pdataprodmap.reduce((total, item) => total + item.produzido, 0);
                console.log(totalEnergyProduced);
                setTotalProduced(totalEnergyProduced);

                const totalConsumed = pdataconsmap.reduce((total, item) => total + item.consumido, 0);
                console.log(totalConsumed);
                setTotalConsumed(totalConsumed);
    
                // Restante do código permanece inalterado...
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };


        const fetchData1day = async () => {
            try {
                // Obtém a data atual e a data 1 dia atrás
                const currentDate = new Date();
                const startDate = subHours(currentDate, 24);
            
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

                const day1EnergyProduced = pdataprodmap.reduce((total, item) => total + item.produzido, 0);
                console.log(day1EnergyProduced);
                set1dayProduced(day1EnergyProduced);

                const day1Consumed = pdataconsmap.reduce((total, item) => total + item.consumido, 0);
                console.log(day1Consumed);
                set1dayConsumed(day1Consumed);
    
                // Restante do código permanece inalterado...
            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };


        const fetchData1month = async () => {
            try {
                // Obtém a data atual e a data 1 mês atrás
                const currentDate = new Date();
                const startDate = subMonths(currentDate, 1);
        
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
        
                const monthEnergyProduced = pdataprodmap.reduce((total, item) => total + item.produzido, 0);
                console.log(monthEnergyProduced);
                set1monthProduced(monthEnergyProduced);
        
                const monthConsumed = pdataconsmap.reduce((total, item) => total + item.consumido, 0);
                console.log(monthConsumed);
                set1monthConsumed(monthConsumed);
        
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
            fetchData1day();
            fetchConsumedToday();
            fetchData1month();
    
            // Set interval to fetch data periodically
            const interval = setInterval(() => {
                fetchProducedToday();
            }, 1000); // Fetch every 60 seconds (adjust as needed)
    
            // Clear interval on component unmount
            return () => clearInterval(interval);
        }, [isLoggedin]);


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
                <MDBCard className='div1' style={{ backgroundImage: `url(${solarpanelImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                    <div style={{ zIndex: 1, position: 'relative', padding: '16px' }}>
                        {morada && <p>Morada: {morada}</p>}
                        {capacidade && <p>Potência: {capacidade} W</p>}
                    </div>   
                </MDBCard>
                <MDBCard className='div2'>
                    <p style={{ fontSize: '25px'}}>Alarms:</p>
                    {alarms.length === 0 ? (
                        <p>Não há alarmes</p>
                    ) : (
                        <ul>
                            {alarms.map((alarm) => (
                                <li key={alarm.id}>{alarm.condicao}</li>
                            ))}
                        </ul>
                    )}
                    <ButtonGroup color="inherit" style={{ marginLeft: '6rem', marginBottom: '1rem' }}>
                        <Link to={`/addalarm/${sistemaId}`} style={{ textDecoration: 'none' }}>
                            <Button style={{backgroundColor: '#f2af13' }}>Add Alarm</Button>
                        </Link>
                    </ButtonGroup>
                </MDBCard>
                <MDBCard className='div3'>
                    <p style={{ fontSize: '25px'}}>Active Alarms:</p>
                    {activeAlarms.length === 0 ? (
                        <p>Não há alarmes activos</p>
                    ) : (
                        <ul>
                            {activeAlarms.map((alarm) => (
                            <li key={alarm.id}>{alarm.condicao}</li>
                            ))}
                        </ul>
                    )}
                </MDBCard>
                <MDBCard className='div4'>
                    <div className='div41'>
                        <ReactSpeedometer
                            maxValue={500}
                            value={producedToday.toFixed(3)}
                            needleColor="red"
                            needleTransitionDuration={4000}
                            needleTransition="easeElastic"
                            segments={2}
                            segmentColors={['#F58D5B', '#ffffff']}
                            customSegmentStops={[0, producedToday.toFixed(3), 500]}
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
                        <p>{day1EnergyProduced.toFixed(2)} kW</p>
                    </MDBCard>
                    <MDBCard className='div11'>
                        <MDBIcon size="3x" icon="coins" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Receita Hoje</p>
                        <p>{(day1EnergyProduced.toFixed(2)*0.14).toFixed(2)} €</p>
                    </MDBCard>
                    <MDBCard className='div12'>
                        <MDBIcon size="3x" icon="bolt" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Geração Total</p>
                        <p>{totalEnergyProduced.toFixed(2)} kw/Wh</p>
                    </MDBCard>
                    <MDBCard className='div13'>
                        <MDBIcon size="3x" icon="money-bill-wave" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Receita Total</p>
                        <p>{(totalEnergyProduced.toFixed(2)*0.14).toFixed(2)} €</p>
                    </MDBCard>

                </MDBCard>
                <MDBCard className='div6'>
                        <div className='div20'>
                            <ButtonGroup size="small" color="inherit" aria-label="small outlined button group">
                                <Button onClick={() => setVista('dia')}>Dia</Button>
                                <Button onClick={() => setVista('mes')}>Mês</Button>
                            </ButtonGroup>

                            {vista === 'dia' && (
                                <PieChart width={400} height={400} style={{ margin: 'auto' }}>
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
                            )}

                            {vista === 'mes' && (
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={data3}
                                        outerRadius={130}
                                        innerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        stroke="transparent"
                                    >
                                        {data3.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            )}
                        </div>

                        <div className='div21'>
                            <div className={classes.root}>
                                <ButtonGroup size="small" color="inherit" aria-label="small outlined button group">
                                </ButtonGroup>
                            </div>

                            {vista === 'dia' && (
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
                            )}

                            {vista === 'mes' && (
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={data4}
                                        outerRadius={130}
                                        innerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        stroke="transparent"
                                    >
                                        {data4.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            )}
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
                            <p>{producedToday.toFixed(3)} W</p>
                        </div>
                        <div className="texto-sobreposto-2">
                            <p>{consumedToday.toFixed(3)} W</p>
                        </div>
                        <div className="texto-sobreposto-3">
                            <p>{producedToday.toFixed(3)- consumedToday.toFixed(3)} W</p>
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
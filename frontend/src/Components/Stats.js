import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../Css/Stats.css';
import solarpanelImage from '../Images/solarpanel-login.jpeg';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';


    const Stats = () => {
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
                        <p>000.00 kW/h</p>
                    </MDBCard>
                    <MDBCard className='div11'>
                        <MDBIcon size="3x" icon="coins" style={{marginBottom: '10px'}}/>
                        <p></p>
                        <p>Receita Hoje</p>
                        <p>0.00 EUR</p>
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
import './App.css';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import Cloud from '@material-ui/icons/Cloud';

import ThunderIcon from './components/assets/svg/010-storm-2.svg';
import DrizzleIcon from './components/assets/svg/031-rainy.svg';
import RainIcon from './components/assets/svg/016-rainy-2.svg';
import SnowIcon from './components/assets/svg/013-snowing.svg';
import FogIcon from './components/assets/svg/008-sunrise.svg';
import ClearIcon from './components/assets/svg/009-sun.svg';
import TornadoIcon from './components/assets/svg/012-storm.svg';
import CloudIcon from './components/assets/svg/020-cloudy-1.svg';

const Url1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const Url2 = ',nz&appid=7fcd27225ea4c1c2ad4a27517bf3ece0&units=metric';

interface IState {
    postcode: any
    temp: any
    humidity: any
    windSpeed: any
    WindDeg: any
    currentWeather: any
    currentDescript: any
    cityName: any
    loading: boolean
    weatherIcon: any

}

class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            postcode: "",
            temp: '',
            humidity: '',
            windSpeed: '',
            WindDeg: '',
            currentWeather: '',
            currentDescript: '',
            cityName: '',
            weatherIcon: '',
            loading: true

        }
    }

    public callAPI(): void {
        fetch(Url1 + this.state.postcode + Url2)
            .then(res => res.json())
            .then(data => {
                if (data.cod === '404') {
                    alert("Oops we couldn't find your zipcode, try again with another one")
                } else if (data.cod === '500') {
                    alert("This location is on cooldown, please try another one")
                } else {
                    const weatherid = data.weather[0].id;

                    if(weatherid <= 232 ) {
                        this.setState({weatherIcon: ThunderIcon})
                    } else if(weatherid >= 300 && weatherid <= 321) {
                        this.setState({weatherIcon: DrizzleIcon})
                    } else if(weatherid >= 500 && weatherid <= 531) {
                        this.setState({weatherIcon: RainIcon})
                    } else if(weatherid >= 600 && weatherid <= 622) {
                        this.setState({weatherIcon: SnowIcon})
                    } else if(weatherid >= 601 && weatherid <= 771) {
                        this.setState({weatherIcon: FogIcon})
                    } else if(weatherid === 781 ) {
                        this.setState({weatherIcon: TornadoIcon})
                    } else if(weatherid === 800) {
                        this.setState({weatherIcon: ClearIcon})
                    } else if(weatherid >= 801 && weatherid <= 804) {
                        this.setState({weatherIcon: CloudIcon})
                    }

                    this.setState({
                        temp: Math.round(data.main.temp) + '°',
                        humidity: data.main.humidity + '%',
                        windSpeed: data.wind.speed + 'm/s',
                        WindDeg: data.wind.deg,
                        currentWeather: data.weather[0].main,
                        currentDescript: data.weather[0].description,
                        cityName: data.name,
                        loading: false
                    })
                }

            })
            .catch(err => {  
                console.log(err);
            })
    }

    public handleOnClick(event: any): void {
        if (this.state.postcode.length === 4) {
            this.callAPI()
        } else {
            alert("Please enter a valid zipcode")
        }
    }

    public handleOnChange(event: any): void {
        this.setState({ postcode: event.target.value });
    }

    public render() {
        return (

            <div>
                <div className="backgroundCard">
                    <div className='header'>
                            <h2>New Zealand Weather Forecast</h2>
                            <div className='weatherIcon'>
                                    <Cloud/>
                            </div>
                        </div>

                        <div className="instructions">
                            <p>Enter a New Zealand postcode below to get a weather forecast for that city</p>
                        </div>
                        <div className="inputZip">
                            <Input
                                onChange={e => this.handleOnChange(e)}
                                name='postcode'
                                type='text'
                                placeholder='Enter postcode..'
                            />
                            <Button variant="contained" onClick={e => this.handleOnClick(e)}>ENTER</Button>
                        </div>
                        <br />
                        <br />
                </div>

                <div>
                    {
                        this.state.loading === true ?
                            <div >
                                <div className="loader">
                                    <CircularProgress thickness={3} style={{ color: '#F57F17' }}/>
                                </div>
                                <div className="loadText">
                                    <p>Awaiting user input...</p>
                                </div>
                            </div>
                             :
                            <div className="weatherCardContainer">
                                <div className="weatherCard">
                                    <img src = {this.state.weatherIcon} style={{width: '100px', height: '100px'}}/>
                                    <div className="generalData">
                                        <p>{this.state.temp}</p>
                                        <p>{this.state.currentDescript}</p>
                                    </div>
                                    <div className="detailedData">
                                        <p>Humidity: {this.state.humidity} </p>
                                        <p>Wind Speed: {this.state.windSpeed} </p>
                                    </div>
                                    <h4> Location | {this.state.cityName} </h4>
                                </div>

                            </div>
                    }

                </div>

            </div>
        )
    }
}

export default App;

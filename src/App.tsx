import './App.css';

import * as React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import Cloud from '@material-ui/icons/Cloud';

const Url1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const Url2 = ',nz&appid=7fcd27225ea4c1c2ad4a27517bf3ece0&units=metric';

interface IState {
    zipcode: any
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
            zipcode: "",
            temp: '',
            humidity: '',
            windSpeed: '',
            WindDeg: '',
            currentWeather: '',
            currentDescript: '',
            cityName: '',
            loading: true,
            weatherIcon: Cloud
        }
    }

    public callAPI(): void {
        fetch(Url1 + this.state.zipcode + Url2)
            .then(res => res.json())
            .then(data => {
                if (data.cod === '404') {
                    alert("Please enter a valid zipcode")
                } else if (data.cod === '500') {
                    alert("This location is on cooldown, please try another one")
                } else {
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
        if (this.state.zipcode.length === 4) {
            this.callAPI()
        } else {
            alert("Please enter a valid zipcode")
        }
    }

    public handleOnChange(event: any): void {
        this.setState({ zipcode: event.target.value });
    }

    public render() {
        return (

            <div>
                <div className='squareComponent'>
                    <div className='header'>
                            <h2>Weather Forecast</h2>
                        </div>

                        <div className="instructions">
                            <p>Enter a NZ zipcode below to get the <br />
                                current weather conditions for that area.</p>
                        </div>
                        <div className='inputZip'>
                            <Input
                                onChange={e => this.handleOnChange(e)}
                                name='zipcode'
                                type='text'
                                placeholder='Enter zipcode..'
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
                                <div className='loader'>
                                    <CircularProgress thickness={3} style={{ color: '#EC4E20' }}/>
                                </div>
                                <div className='loadText'>
                                <p>Awaiting user input...</p>
                                </div>
                            </div>
                             :
                            <div className='weatherCardContainer'>
                                <div className='weatherCard'>
                                <img src={this.state.weatherIcon} alt='Weather Icon'/>
                                    <div className='conditionsOverview'>
                                        <p>{this.state.temp}</p>
                                        <p>{this.state.currentDescript}</p>
                                    </div>
                                    <div className='conditionDetails'>
                                        <p>Humidity: {this.state.humidity} </p>
                                        <p>Wind Speed: {this.state.windSpeed} </p>
                                    </div>
                                </div>
                                <h4> Location | {this.state.cityName} </h4>
                            </div>
                    }

                </div>

            </div>
        )
    }
}

export default App;

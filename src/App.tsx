import * as React from 'react';

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
            cityName: ''


        }
    }

    public test(): void {
        fetch(Url1 + this.state.zipcode + Url2)
        .then(res => res.json())
        .then(data => {
            if(data.cod === '404') {
                alert("Please enter a valid zipcode")
            } else if(data.cod === '500') {
                alert("This location is on cooldown, please try another one")
            } else {
                this.setState({
                    temp: Math.round(data.main.temp) + '°',
                    humidity: data.main.humidity + '%',
                    windSpeed: data.wind.speed + 'km/h',
                    WindDeg: data.wind.deg,
                    currentWeather: data.weather[0].main,
                    currentDescript: data.weather[0].description,
                    cityName: data.name
                })
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    public handleOnClick(event: any): void {
        if(this.state.zipcode.length === 4) {
            this.test()
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
                <div className='header'>
                    <h2>Weather Forcast</h2>
                </div>

                <div className="instructions">
                    <p>Enter a NZ zipcode below to get the <br />
                        current weather conditions for that area.</p>
                </div>

                <div className='inputZip'>
                    <input 
                        onChange={e => this.handleOnChange(e)} 
                        name='zipcode' 
                        type='text' 
                        placeholder='Enter zipcode..' 
                        />
                    <button onClick={e => this.handleOnClick(e)}>ENTER</button>
                </div>

                <div className="results">
                    {this.state.temp}<br />
                    {this.state.humidity}<br />
                    {this.state.windSpeed}<br />
                    {this.state.WindDeg}<br />
                    {this.state.currentWeather}<br />
                    {this.state.currentDescript}<br />
                    {this.state.cityName}<br />
                </div>

            </div>
        )
    }
}

export default App;

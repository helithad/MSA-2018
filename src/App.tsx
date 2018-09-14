import * as React from 'react';

const Url1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const Url2 = ',nz&appid=7fcd27225ea4c1c2ad4a27517bf3ece0&units=metric';

interface IState {
    zipcode: any
    currentTemp: any
    humidity: any
}

class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            zipcode: "",
            currentTemp: '',
            humidity: ''
        }
    }

    public test(): void {
        fetch(Url1 + this.state.zipcode + Url2)
        .then(res => res.json())
        .then(data => {
            if(data.cod === '404') {
                alert("Please enter a valid zipcode")
            } else {
                this.setState({
                    currentTemp: Math.round(data.main.temp) + '°',
                    humidity: data.main.humidity + '%'
                })
            }
            
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
                    {this.state.currentTemp}<br />
                    {this.state.humidity}
                </div>
                
            </div>
        )
    }
}

export default App;

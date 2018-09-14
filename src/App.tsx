import * as React from 'react';

interface IState {
    zipcode: any
}

class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            zipcode: ""
        }
    }

    public test(): void {
        alert('your zipcode is ' + this.state.zipcode)
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
            </div>
        )
    }
}

export default App;

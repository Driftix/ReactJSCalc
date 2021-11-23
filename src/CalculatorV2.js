import React from 'react';


export default class CalculatorV2 extends React.Component{
    state = {
        percentage : null,
        currentValue : null,
        oldValue : null,
        operator : null,
        displayValue : "0",
        memory : [],
        pendingOperation: false,
    };

    //on efface tout ce qui y'a dans le display
    clearInput(){
        const {displayValue} = this.state;
        this.setState({
           displayValue: "0"
        });
    }
    operation(newOperator){
        const {displayValue, operator, percentage} = this.state;

        const operation = {
          "/" :  (prevValue, nextValue) => prevValue / nextValue,
          "*" :  (prevValue, nextValue) => prevValue * nextValue,
          "-" :  (prevValue, nextValue) => prevValue - nextValue,
          "+" :  (prevValue, nextValue) => prevValue + nextValue,
          "=" :  (prevValue, nextValue) => prevValue
        };
        //On récupère ce qu'il y a sur l'affichage et on le transforme en float
        const inputValue = parseFloat(displayValue);
        if(percentage == null){
            this.setState({
               percentage: inputValue,
            });
        }else if(operator){
            const currentValue = percentage || 0;
            const newValue = operation[operator](currentValue,inputValue);
            this.setState({
               percentage: newValue,
               displayValue: parseFloat(newValue.toFixed(6))
            });
        }

    }

    inputNumber(number){
        const {displayValue, pendingOperation } = this.state;
        if(pendingOperation){
            this.setState({
               displayValue: String(number),
               pendingOperation: false,
            });
        }else{
            this.setState({
               displayValue: displayValue === "0" ? String(number) : displayValue + number
            });
        }
    }

    //Ici qu'on a le html et tout et tout
    render(){
        const { displayValue } = this.state;
        return(
            <div>
                <div>
                    <div>{displayValue}</div>
                </div>
                <div>
                    <div>
                        <div>
                            <button onClick={()=> this.clearInput()}>
                                AC
                            </button>
                        </div>
                        <div>
                            <div>
                                <button onClick={()=> this.inputNumber(1)}>
                                    1
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(2)}>
                                    2
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(3)}>
                                    3
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(4)}>
                                    4
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(5)}>
                                    5
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(6)}>
                                    6
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(7)}>
                                    7
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(8)}>
                                    8
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(9)}>
                                    9
                                </button>
                            </div>
                            <div>
                                <button onClick={()=> this.inputNumber(0)}>
                                    0
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}
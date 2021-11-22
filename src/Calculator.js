import React from 'react';


export default class Calculator extends React.Component{
    state = {
        value: null,
        displayValue: "0",
        operator: null,
        pendingOperation: false
    };

    inputNumber(digit) {
        const { displayValue, pendingOperation } = this.state;

        if (pendingOperation) {
            this.setState({
                displayValue: String(digit),
                pendingOperation: false
            });
        } else {
            this.setState({
                displayValue: displayValue === "0" ? String(digit) : displayValue + digit
            });
        }
    }
    deleteLastdigit(digit){
        const{ displayValue, pendingOperation} = this.state;
        if(pendingOperation){
            this.setState({displayValue: String(digit).slice(0,digit.length()-1),
                pendingOperation: false
            });
        }else{
            this.setState({
                displayValue : displayValue === "0" ? String(digit): displayValue.slice(0,displayValue.length-1)
            });
        }
    }

    inputDot() {
        const { displayValue, pendingOperation } = this.state;

        if (pendingOperation) {
            this.setState({
                displayValue: ".",
                pendingOperation: false
            });
        } else if (displayValue.indexOf(".") === -1) {
            this.setState({
                displayValue: displayValue + "."
            });
        }
    }
    inputAllClear() {
        const { displayValue } = this.state;
        this.setState({
            displayValue: "0"
        });
    }
    inputPlusMinus() {
        const { displayValue } = this.state;
        this.setState({
            displayValue:
                displayValue.charAt(0) === "-" ? displayValue.substr(1) : "-" + displayValue
        });
    }

    inputPercentage() {
        const { displayValue } = this.state;
        const value = parseFloat(displayValue);
        this.setState({
            displayValue: String(displayValue / 100)
        });
    }

    operations(nextOperator) {
        const operations = {
            "/": (prevValue, nextValue) => prevValue / nextValue,
            "*": (prevValue, nextValue) => prevValue * nextValue,
            "-": (prevValue, nextValue) => prevValue - nextValue,
            "+": (prevValue, nextValue) => prevValue + nextValue,
            "=": (prevValue, nextValue) => nextValue
        };
        const { displayValue, operator, value } = this.state;

        const inputValue = parseFloat(displayValue);

        if (value == null) {
            this.setState({
                value: inputValue
            });
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = operations[operator](currentValue, inputValue);

            this.setState({
                value: newValue,
                displayValue: parseFloat(newValue.toFixed(6))
            });
        }

        this.setState({
            pendingOperation: true,
            operator: nextOperator
        });
    }

    render() {
        const { displayValue } = this.state;
        return (
            <div className="Calculator">
                <div id="display-screen">
                    <div id="display">{displayValue}</div>
                </div>
                <div className="keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <button
                                className="calc-btn"
                                id="clear"
                                onClick={() => this.inputAllClear()}
                            >
                                AC
                            </button>
                            <button
                                className="calc-btn"
                                id="plus-minus"
                                onClick={() => this.inputPlusMinus()}
                            >
                                &#177;
                            </button>
                            <button
                                className="calc-btn"
                                id="percentage"
                                onClick={() => this.inputPercentage()}
                            >
                                &#37;
                            </button>
                        </div>
                        <div className="number-keys">
                            <button
                                className="calc-btn"
                                id="zero"
                                onClick={() => this.inputNumber(0)}
                            >
                                0
                            </button>
                            <button
                                className="calc-btn"
                                id="del"
                                //Changer ici le bail pour que ça supprime le dernier chiffre affiché
                                onClick={() => this.deleteLastdigit(0)}
                            >
                                del
                            </button>
                            <button
                                className="calc-btn"
                                id="decimal"
                                onClick={() => this.inputDot()}
                            >
                                .
                            </button>
                            <button
                                className="calc-btn"
                                id="one"
                                onClick={() => this.inputNumber(1)}
                            >
                                1
                            </button>
                            <button
                                className="calc-btn"
                                id="two"
                                onClick={() => this.inputNumber(2)}
                            >
                                2
                            </button>
                            <button
                                className="calc-btn"
                                id="three"
                                onClick={() => this.inputNumber(3)}
                            >
                                3
                            </button>
                            <button
                                className="calc-btn"
                                id="four"
                                onClick={() => this.inputNumber(4)}
                            >
                                4
                            </button>
                            <button
                                className="calc-btn"
                                id="five"
                                onClick={() => this.inputNumber(5)}
                            >
                                5
                            </button>
                            <button
                                className="calc-btn"
                                id="six"
                                onClick={() => this.inputNumber(6)}
                            >
                                6
                            </button>
                            <button
                                className="calc-btn"
                                id="seven"
                                onClick={() => this.inputNumber(7)}
                            >
                                7
                            </button>
                            <button
                                className="calc-btn"
                                id="eight"
                                onClick={() => this.inputNumber(8)}
                            >
                                8
                            </button>
                            <button
                                className="calc-btn"
                                id="nine"
                                onClick={() => this.inputNumber(9)}
                            >
                                9
                            </button>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <button
                            className="calc-btn"
                            id="divide"
                            onClick={() => this.operations("/")}
                        >
                            &#247;
                        </button>
                        <button
                            className="calc-btn"
                            id="multiply"
                            onClick={() => this.operations("*")}
                        >
                            &#215;
                        </button>
                        <button
                            className="calc-btn"
                            id="subtract"
                            onClick={() => this.operations("-")}
                        >
                            &#8722;
                        </button>
                        <button
                            className="calc-btn"
                            id="add"
                            onClick={() => this.operations("+")}
                        >
                            &#43;
                        </button>
                        <button
                            className="calc-btn"
                            id="equals"
                            onClick={() => this.operations("=")}
                        >
                            &#61;
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import {Calculs} from "./Calculs";

export default class Calculator extends React.Component{
    state = {
        value: null,
        displayValue: "0",
        operator: null,
        pendingOperation: false,
        history : [],
        calcul :null
    };
    constructor(props){
        super(props);
        this.state.calcul = new Calculs(0,0,0,0);
    }

    inputNumber(digit) {
        const { displayValue, pendingOperation, history , calcul} = this.state;
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
    Restauration(res) {
        const { displayValue } = this.state;
         this.setState({
             displayValue : res,
         });
    }
    Suppression(){
        const { history,displayValue } = this.state;
        this.setState({
           history:[],
            displayValue: 0
        });
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
        const { displayValue, history } = this.state;

        this.setState({
            displayValue: "0",
            history : []
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
        const { displayValue, calcul, history } = this.state;
        const value = parseFloat(displayValue);
        calcul.addn1(displayValue);
        calcul.addOp("/");
        calcul.addn2(100);
        calcul.addRes(displayValue/100);
        history.push(calcul);
        this.setState({
            displayValue: String(displayValue / 100),
            calcul : new Calculs(0,0,0,0)
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

        const { displayValue, operator, value, history, calcul , pendingOperation} = this.state;
        //On veut récupérer ce qu'il y a à l'écran ici
        if([nextOperator] == "="){
            history.push(calcul);
        }

        calcul.addn1(value);
        //calcul.addn1(displayValue);
       // history.push(displayValue);
        //calcul.addOp(nextOperator);
       // history.push(nextOperator);
        calcul.addn2(displayValue);
        const inputValue = parseFloat(displayValue);

        if (value == null) {
            this.setState({
                value: inputValue
            });
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = operations[operator](currentValue, inputValue);
            if(history[history.length-2] != newValue){
                //history.push(newValue);
                calcul.addOp(operator);
                calcul.addRes(newValue);
            }

            this.setState({
                value: newValue,
                displayValue: parseFloat(newValue.toFixed(6)),
                calcul : new Calculs(0,0,0,0)
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
            <div className="leCadre">
                <h1 className="monTitre">Calculator</h1>
                <div className="monCadreRes">{displayValue}</div>
                <div className="allClavier">
                    <div className="monClavier">
                        <button
                            className="unBouton"
                            id="nine"
                            onClick={() => this.inputNumber(9)}
                        >
                            9
                        </button>
                        <button
                            className="unBouton"
                            id="eight"
                            onClick={() => this.inputNumber(8)}
                        >
                            8
                        </button>
                        <button
                            className="unBouton"
                            id="seven"
                            onClick={() => this.inputNumber(7)}
                        >
                            7
                        </button>
                        <button
                            className="unBouton"
                            id="six"
                            onClick={() => this.inputNumber(6)}
                        >
                            6
                        </button>
                        <button
                            className="unBouton"
                            id="five"
                            onClick={() => this.inputNumber(5)}
                        >
                            5
                        </button>
                        <button
                            className="unBouton"
                            id="four"
                            onClick={() => this.inputNumber(4)}
                        >
                            4
                        </button>
                        <button
                            className="unBouton"
                            id="three"
                            onClick={() => this.inputNumber(3)}
                        >
                            3
                        </button>
                        <button
                            className="unBouton"
                            id="two"
                            onClick={() => this.inputNumber(2)}
                        >
                            2
                        </button>
                        <button
                            className="unBouton"
                            id="one"
                            onClick={() => this.inputNumber(1)}
                        >
                            1
                        </button>
                        <button
                            className="unBouton"
                            id="zero"
                            onClick={() => this.inputNumber(0)}
                        >
                            0
                        </button>
                        <button
                            className="unBoutonEgale"
                            id="equals"
                            onClick={() => this.operations("=")}
                        >
                            &#61;
                        </button>
                        </div>
                    <div className="monClavierOp">
                        <button
                            className="unBouton"
                            id="divide"
                            onClick={() => this.operations("/")}
                        >
                            &#247;
                        </button>
                        <button
                            className="unBouton"
                            id="multiply"
                            onClick={() => this.operations("*")}
                        >
                            &#215;
                        </button>
                        <button
                            className="unBouton"
                            id="subtract"
                            onClick={() => this.operations("-")}
                        >
                            &#8722;
                        </button>
                        <button
                            className="unBouton"
                            id="add"
                            onClick={() => this.operations("+")}
                        >
                            &#43;
                        </button>
                    </div>
                    <div className="monClavierSupr">
                        <button
                            className="unBouton"
                            id="clear"
                            onClick={() => this.inputAllClear()}
                        >
                            AC
                        </button>
                        <button
                            className="unBouton"
                            id="del"
                            //Changer ici le bail pour que ça supprime le dernier chiffre affiché
                            onClick={() => this.deleteLastdigit(0)}
                        >
                            del
                        </button>
                        <button
                            className="unBouton"
                            id="plus-minus"
                            onClick={() => this.inputPlusMinus()}
                        >
                            &#177;
                        </button>
                        <button
                            className="unBouton"
                            id="percentage"
                            onClick={() => this.inputPercentage()}
                        >
                            &#37;
                        </button>
                    </div>
                </div>
                <div id="monResultat">
                    <p className="unP"> Mon historique de calculs :</p>
                    <button className="unBTNSupr" onClick={() => this.Suppression()}>Supprimer mon historique</button>
                    <ul className="maListe">
                        {this.state.history.map((valeur) => <li>{valeur.getn1()}  {valeur.getOp()}  {valeur.getn2()} =  {valeur.getRes()} <button className="unBTNSupr" onClick={() => this.Restauration(valeur.getRes())}>Restaurer</button></li>)}
                    </ul>
                </div>
            </div>

        );
    }
}

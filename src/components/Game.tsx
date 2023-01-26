import { useLocation } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { useState, useEffect, useMemo, useReducer } from 'react';
import '../App.css';

const Game = () => {
    const location = useLocation();
    const state = location.state;
    const category = state[0].name;
    const user = state[1];
    const [wordToGuess, setWordToGuess] = useState('');
    const [defaultLives,] = useState(8);
    const [currentLives, setCurrentLives] = useState(8);
    const [count, setCount] = useState(0);
    const [previousGuesses, setPreviousGuesses] = useState<any[]>([]);
    const [uncoveredPart, setUncoveredPart] = useState<any[]>([]);
    const [actualImage, setActualImage] = useState('img/s0.gif');
    const [isDisabledInput, setIsDisabledInput] = useState(false);
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
    const [isUsedUndo, setIsUsedUndo] = useState(false);
    const [isUsedHint, setIsUsedHint] = useState(false);
    const [hint, setHint] = useState('');
    const [isUsedHelpLetter, setIsUsedHelpLetter] = useState(false);
    const calculatePoints = useMemo(() => playerPoints(currentLives),[currentLives]);
    const [stateReducer, dispatch] = useReducer(reducer, { moves: 0 });

    //Equivalent for componentDidMount
    //https://stackoverflow.com/questions/53945763/componentdidmount-equivalent-on-a-react-function-hooks-component
    useEffect(() => {
        loadWords();
    }, []);

    function playerPoints(currentLives:any){
      return   (currentLives / defaultLives) * 100 ;
    }
    function reducer(state:any, action:any ) {
        if (action.type === 'incremented_move') {
          return {
            moves: state.moves + 1
          };
        }
        throw Error('Unknown action.');
      }

    function getRandomInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function showHint(){
        if(!isUsedHint){
            setIsUsedHint(true);
        } 
    }

    async function savePlayerScore(){
        let player = state[1];
        let playerScore = currentLives;
        let timeStamp = new Date();
        let data = await getPlayerScore();
        data["players"].push(player);
    }

   async function getPlayerScore(){
    const response = await fetch("statistics.json");
        return response.json();
    }

    function loadWords() {
        fetch("words.json")
            .then((res) => res.json())
            .then((data) => {
                let arrayOfPossibleWords = data[category],
                    randomNumber = getRandomInRange(0, arrayOfPossibleWords.length),
                    randomWord = arrayOfPossibleWords[randomNumber].toUpperCase();
                    setWordToGuess(randomWord);
                let arrayOfPossibleHints = data[category+"_hints"];
                setHint(arrayOfPossibleHints[randomNumber]);
                createCoveredWord(randomWord);
            })
    }

    function createCoveredWord(word: string) {
        let coveredWord = [];
        for (var i = 0; i < word.length; i++) {
            coveredWord.push("_")
        }
        setUncoveredPart(coveredWord)
    }
    
    function HandleSubmit(values:any){
        let letter = values.letter.toUpperCase();
        if (previousGuesses.indexOf(letter) === -1 && letter.length === 1) {
            let copyPreviousGuesses = previousGuesses;
            copyPreviousGuesses.push(letter);
            setPreviousGuesses(copyPreviousGuesses);
            if (wordToGuess.indexOf(letter) === -1) {
                ReduceLives();
            } else {
                FillUncoveredPart(letter, getAllOccurences(wordToGuess, letter));
            }
            increaseCount();
        } 
    };

    function getAllOccurences(arr: any, letter: any) {
        let indexes = [],
            length = arr.length;
        for (let i = 0; i < length; i++)
            if (arr[i] === letter) {
                indexes.push(i);
            }
        return indexes;
    }

    function FillUncoveredPart(letter: string, indexes: any) {
        let copyOfState = uncoveredPart;    
        for (let index of indexes) {
            copyOfState[index] = letter;
        };
        setUncoveredPart(copyOfState);
        if (copyOfState.join("") === wordToGuess) {
            blockInput();
            sendAlert("win");
        }
    }

    function undoMove(){
        if(!isUsedUndo && count > 0){
            let copyOfState = currentLives;
            let copyPreviousGuesses = previousGuesses;
            let lastLetter = copyPreviousGuesses.pop();
            setPreviousGuesses(copyPreviousGuesses);
            FillUncoveredPart("_", getAllOccurences(wordToGuess, lastLetter));
            if(currentLives < defaultLives){
                setCurrentLives(copyOfState + 1);
            }
            if(actualImage !== 'img/s0.gif'){
                let nextImage = 'img/s' + (defaultLives - currentLives - 1) + '.gif';
                setActualImage(nextImage);
            }  
            setIsUsedUndo(true);
            decreaseCount();
        }  
    }

    function helpLetter(){
        if(!isUsedHelpLetter){
            let i = 0;
            let letter = '';
            console.log(previousGuesses.length);
            if(previousGuesses.length === 0){
                FillUncoveredPart(wordToGuess[i], getAllOccurences(wordToGuess, wordToGuess[i]));
                setIsUsedHelpLetter(true);
                console.log(wordToGuess);
            }else{
                while(previousGuesses.includes(wordToGuess[i])){
                    letter = wordToGuess[i]; 
                    i++;
                }
                FillUncoveredPart(wordToGuess[i], getAllOccurences(wordToGuess, wordToGuess[i]));
                setIsUsedHelpLetter(true);  
            }
            increaseCount();
            savePlayerScore();
        }
    }

    function ReduceLives() {
        let copyOfState = currentLives;
        let nextImage = 'img/s' + (defaultLives - currentLives + 1) + '.gif';
        setCurrentLives(copyOfState - 1);
        setActualImage(nextImage);
        if (copyOfState === 1) {
            blockInput();
            sendAlert("loss");
        }
    }

    function blockInput() {
        setIsDisabledInput(true);
        setIsDisabledSubmit(true);
    }

    function sendAlert(winOrLoss: string) {
        if(state[0].language === "EN"){
            if (winOrLoss === "win") {
                alert(
                    "You won"
                )
            } else if (winOrLoss === "loss") {
                alert(
                    "You lose"
                )
            }
        }else{
            if (winOrLoss === "win") {
                alert(
                    "Wygrałeś"
                )
            } else if (winOrLoss === "loss") {
                alert(
                    "Przegrałeś"
                )
            }
        } 
    }

    function show(arrayToMap: any, connector: any) {
        return arrayToMap.map((letter: any) => (
            letter + connector
        ));
    }

    function increaseCount() {
        setCount(count + 1);
    }

    function decreaseCount() {
        setCount(count - 1);
    }

    if(state[0].language === "EN"){
        return (
            <>
                <p className="size-15">User: {state[1]}</p>
                <p className="size-10">Category - {state[0].description}</p>
                <p className="size-5">
                    Points: {calculatePoints}
                    {"\n"}
                    Chances:
                    {"\n"}
                    {currentLives} / {defaultLives}
                </p>
                <h1>     
                    {show(uncoveredPart, ' ')}
                </h1>
                <Formik initialValues={{
                    letter: ''
                }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        HandleSubmit(values);
                        values.letter = '';
                    }}>
                    <Form>
                        <label htmlFor="letter">Letter</label>
                        <Field id="givenLetter" name="letter" placeholder="Letter" maxLength={1} className="green" disabled={isDisabledInput}/>
                        <button type="submit" className="btn btn-success" onClick={() => {
                        dispatch({ type: 'incremented_move' })
                        }} disabled={isDisabledSubmit}>Submit</button>
                    </Form>
                </Formik>
                <p>
                    Checked letters:
                    <br />
                    {
                        show(previousGuesses, ', ')
                    }
                </p>
                <p>
                    Lifelines:
                    <br />
                    <button className="btn btn_undo" name="undo_last_move" onClick={undoMove} disabled={isUsedUndo}>Undo last move</button>
                    <button className="btn btn_hint" name="show_hint" onClick={showHint} disabled={isUsedHint}>Show hint</button>
                    <button className="btn btn_letter" name="help_letter" onClick={helpLetter} disabled={isUsedHelpLetter}>Show help letter</button>
                    <br />
                    {isUsedHint? hint :""}
                </p>
                <p>
                    Attempts so far:
                    {"\n"}
                    {count}
                    {"\n"}
                    Moves:
                    {"\n"}
                    {stateReducer.moves}
                </p>
                <p>
                    <img src={actualImage} alt="hangman"></img>
                </p>
            </>
        );
    }else{
        return (
            <>
                <p className="size-15">Użytkownik: {state[1]}</p>
                <p className="size-10">Kategoria - {state[0].description} {state[0].language}</p>
                <p className="size-5">
                    Punkty: {calculatePoints}
                    {"\n"}
                    Szanse:
                    {"\n"}
                    {currentLives} / {defaultLives}
                </p>
                <h1>     
                    {show(uncoveredPart, ' ')}
                </h1>
                <Formik initialValues={{
                    letter: ''
                }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        HandleSubmit(values);
                        values.letter = '';
                    }}>
                    <Form>
                        <label htmlFor="letter">Litera</label>
                        <Field id="givenLetter" name="letter" placeholder="Litera" className="green" maxLength={1} disabled={isDisabledInput}/>
                        <button type="submit" className="btn btn-success" onClick={() => {
                        dispatch({ type: 'incremented_move' })
                        }} disabled={isDisabledSubmit}>Submit</button>
                    </Form>
                </Formik>
                <p>
                    Już sprawdzone znaki:
                    <br />
                    {
                        show(previousGuesses, ', ')
                    }
                </p>
                <p>
                    Koła ratunkowe:
                    <br />
                    <button className="btn btn_undo" name="undo_last_move" onClick={undoMove} disabled={isUsedUndo}>Cofnij ostatni ruch</button>
                    <button className="btn btn_hint" name="show_hint" onClick={showHint} disabled={isUsedHint}>Pokaż podpowiedź</button>
                    <button className="btn btn_letter" name="help_letter" onClick={helpLetter} disabled={isUsedHelpLetter}>Jedna poprawna litera</button>
                    <br />
                    {isUsedHint? hint :""}
                </p>
                <p>
                    Dotychczasowe próby:
                    {"\n"}
                    {count}
                    {"\n"}
                    Ilość ruchów:
                    {"\n"}
                    {stateReducer.moves}
                </p>
                <p>
                    <img src={actualImage} alt="hangman"></img>
                </p>
            </>
        );
    }
}
export default Game;
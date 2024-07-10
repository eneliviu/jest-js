/**
 * @jest-environment jsdom
 */

// Instal module in nodejs: npm install -D jest-environment-jsdom

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require('../game');

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });

    test('currentGame key exist', ()=>{
        expect('currentGame' in game).toBe(true);
    })

    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });

    test('choices key exists', () =>{
        expect('choices' in game).toBe(true);
    });

    test('choices containg correct IDs', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });

    test('expects data-listener to be true', () => {
        newGame();
        const elements = document.getElementsByClassName('circle');
        for (let element of elements){
            expect(element.getAttribute('data-listener')).toEqual('true');
        };
    });
});

describe('newGame works correctly', () => {
    beforeAll(() => { // runs before all test are ran
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    
    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    
    test('should display 0 for the element with ID of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });

    test('should clear the player moves array', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    
    test("should be one element in the computer's game array", ()=>{
        expect(game.currentGame.length).toBe(1);
    });

    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });

});


describe('gameapp works correctly', () => {
    
    beforeEach(() =>{ // runs before each test is run
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();

    });

    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });

    test('addTurn adds a new turn to the game', () => {
        addTurn()
        expect(game.currentGame.length).toBe(2);
    })

    test('should add correct class to light up the buttons', () =>  {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });

    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });

});


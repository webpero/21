/*
 *	21 - oppgave for NAV - Versjon 0.1.0
 *	04.12.2017: Per Olav Mariussen
 *
 */
 
import React, { Component } from 'react';

import { Deck } from './Cards.js';
import Interface from './Interface.js';
import './App.css';

/* Applikasjonen - selve spillet; trekning av kort og berergning av resultat */
class App extends Component 
{
	constructor() {
		super();
		this.state = {
            player: [],
            dealer: [],
			playerScore: 0,
			dealerScore: 0,
			playerWins: 0,
			dealerWins: 0,
            status: "new"
		};	
	}
	
	/* Funksjoner for å beregne verdien av spillerens hånd */
	_valueOfCard(value)
	{
		let val = parseInt(value,10);
		if ( isNaN(val) ) {
			switch(value) {
				case "A":
					val = 11;	//Ess er alltid 11 i dette spillet
					break;
				case "K":
				case "Q":
				case "J":
					val = 10;
					break;
				default:
					val = 0;
			}
		}
		return ( val );
	}
    _Score(hand)
	{
		let score = 0;
		if ( hand !== undefined ) {
			for( let i =0; i < hand.length; i++ ) {
				score += this._valueOfCard( hand[i].value );
			}
		}
		return score;
    }

	/* Restart av spillet */
	_restartGame() 
	{
		window.location.reload(true);
	}
	
    /* Håndtere første utdeling av kort */
    _handleDeal()
	{
        /* Lokale variable */
        let playerHand  = [],
			dealerHand  = [],
			playerScore = 0,
			dealerScore = 0,
			playerWins = this.state.playerWins,
			dealerWins = this.state.dealerWins,
			newStatus;

        //Spiller får to kort fra Deck
        playerHand.push(this.child.drawCard());
        playerHand.push(this.child.drawCard());
		playerScore = this._Score(playerHand);

        //Magnus får to kort fra Deck 
        dealerHand.push(this.child.drawCard());
		dealerHand.push(this.child.drawCard());
		dealerScore = this._Score(dealerHand);
		
		//Sjekk for vinner og sett status
		newStatus = (dealerScore === 21 || playerScore > 21 ) ? "lose" : 
					(dealerScore > 21) ? "win" :
					(playerScore >= 17) ? "stop" : 
					"playing";
		if ( newStatus === "win" ) {
			playerWins++;
		} else if ( newStatus === "lose" ) {
			dealerWins++;
		}
		
        //Oppdater status i state og sjekk om Magnus eventuelt skal begynne å trekke
        this.setState({
				player: playerHand,
				playerScore: playerScore,
				playerWins: playerWins,
				dealer: dealerHand,
				dealerScore: dealerScore,
				dealerWins: dealerWins,
				status: newStatus
			},
			function() {
				//Callback: Sjekk om Magnus skal starte å trekke
				if ( newStatus === "stop" ) {
					this._handleNewCardsDealer();
				}
			});
		
	}

    /* Håndtere trekning av ett nytt kort for spiller */
    _handleNewCardPlayer()
	{
        /* Lokale variable */
		let newPlayerScore, 
			dealerWins = this.state.dealerWins,
			newStatus = this.state.status,
			playerHand 	= this.state.player;

        // Trekk ett kort fra Deck
        playerHand.push(this.child.drawCard());
        newPlayerScore = this._Score(playerHand);

		//Sjekk for vinner og sett status
        if(newPlayerScore > 21) {
            newStatus = "lose";
			dealerWins++;
		} else if (newPlayerScore >= 17) {
			newStatus = "stop";
		}

        //Oppdater status i state og sjekk om Magnus eventuelt skal begynne å trekke
        this.setState({
				player: playerHand,
				playerScore: newPlayerScore,
				status: newStatus,
				dealerWins: dealerWins
			},
			function() {
				//Callback: Sjekk om Magnus skal starte å trekke
				if ( newStatus === "stop" ) {
					this._handleNewCardsDealer();
				}
			});
    }

    /* Håndtere trekning av kort for Magnus (etter at status er "stop") */
    _handleNewCardsDealer()
	{
        /* Lokale variable */
        let newStatus,
			dealerHand = this.state.dealer,
			dealerScore = this.state.dealerScore,
			dealerWins = this.state.dealerWins,
			playerScore = this.state.playerScore,
			playerWins = this.state.playerWins;

        // Del ut kort til Magnus til han vinner eller taper
        while (dealerScore < playerScore && dealerScore < 21) 
		{
            //Nytt kort fra Deck
			dealerHand.push(this.child.drawCard());
			dealerScore = this._Score(dealerHand);
        }

		//Sjekk for vinner og sett status
		newStatus = (dealerScore <= 21 && dealerScore >= playerScore) ? "lose" : "win";
		if ( newStatus === "win" ) {
			playerWins++;
		} else if ( newStatus === "lose" ) {
			dealerWins++;
		}
			
        //Oppdater status i state
        this.setState({
            dealer: dealerHand,
			dealerScore: dealerScore,
			dealerWins: dealerWins,
			playerWins: playerWins,
            status: newStatus
        });
    }
	
	render() {
		return (
			<div className="container">
				<Deck onRef = {ref => (this.child = ref)} />
				<Interface
					dealer = 		{this.state.dealer}
					dealerScore = 	{this.state.dealerScore}
					dealerWins = 	{this.state.dealerWins}
					player = 		{this.state.player}
					playerScore = 	{this.state.playerScore}
					playerWins = 	{this.state.playerWins}
					restart = 		{this._restartGame.bind(this)}
					dealCards = 	{this._handleDeal.bind(this)}
					newCard = 		{this._handleNewCardPlayer.bind(this)}
					status = 		{this.state.status}
				/>
   				<footer><a href="https://webpero.github.io/">&copy; 2017 webpero</a></footer>	
			</div>
		);
	}
}

export default App;
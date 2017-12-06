/*
 *	21 - oppgave for NAV - Versjon 0.9.2
 *	06.12.2017: Per Olav Mariussen
 *
 *  Håndtering av kort, kortstokk og en spillers hånd (samling av kort)
 *	Kan benyttes i flere typer kortspill
 */
 
import React, { Component } from 'react';
import $ from 'jquery';

import './Cards.css';

/* 	Ett kort. Functional Component (da komponenten ikke har state) */
export function Card ( props )
{
	/* 	
		Bilde på kort ligger i /img på formen:
		[Suit][Value].png 
		Suit = C, S, D, H
		Value = 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
	*/
	const card = props.suit.slice(0,1) + props.value;
	return (
		<img className='card' src={require("../img/"+card+'.png')} alt={card} />
	);
}

/* En kortsokk */
export class Deck extends Component
{
	constructor() {
		super();
		this.state = {
			cards: []
		};	
	}
	  
	componentDidMount() {
		//Referanse til klassen, slik at metoder kan kalles fra parent
		this.props.onRef(this);
	}
	componentWillUnmount() {
		this.props.onRef(undefined);
	}
	componentWillMount() {
		this._getCards();
	}
	
	/* Metode som kalles fra parent */
	drawCard() {
		//Sjekk om vi trenger ny kortstokk
		if ( this.state.cards.length < 5 ) {
			this._getCards();
		}
		return ( this.state.cards.pop() );
	}
	
	/* Hent en tilfeldig stokket kortstokk */
	_getCards() 
	{
		$.ajax({
			url: 'https://nav-deckofcards.herokuapp.com/shuffle',
			success: (response) => {
				this.setState( {cards: response} );
			},
			error: function(response) {
				console.log("Error: "+(response.error !== undefined ? response.error.errors[0].reason : "Ukjent feil!") );
			}
		});		
	}  

	render() 
	{
		// Velger å la kortstokken være skjult 
		return (
            <div />
        );
	}
}

/* 
	En spillers hånd (ett eller flere kort) 
	Functional Component (da komponenten ikke har state)
*/
export function Hand ( props )
{
	return(
		<div className='hand'>
			{
				props.hand.map(function(card,i){
					return <Card suit={card.suit} value={card.value} key={i}/>
				})
			}
		</div>
	);
}

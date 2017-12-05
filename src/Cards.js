/*
 *	21 - oppgave for NAV - Versjon 0.1.0
 *	04.12.2017: Per Olav Mariussen
 *
 *  Håndtering av kort, kortstokk og en spillers hånd (samling av kort)
 *	Kan benyttes i flere typer kortspill
 */
 
import React, { Component } from 'react';
import $ from 'jquery';

import './Cards.css';

export class Card extends Component
{
	render() 
	{
		return (
            <img className='card' src={ require("../img/" + this.props.suit.slice(0,1) + this.props.value + ".png") } />
		);
	}
}
export class Deck extends Component
{
	constructor() {
		super();
		this.state = {
			cards: []
		};	
	}
	  
	componentDidMount() {
		this.props.onRef(this);
	}
	componentWillUnmount() {
		this.props.onRef(undefined);
	}
	componentWillMount() {
		this._getCards();
	}
	
	drawCard() {
		//Sjekk om vi trenger ny kortstokk
		if ( this.state.cards.length < 5 ) {
			this._getCards();
		}
		return ( this.state.cards.pop() );
	}
	
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
		return (
            <div />
        );
	}
}
export class Hand extends Component
{
	static get defaultProps(){
        return {
            hand : []
        }
    }
	render() {
		return(
			<div className='hand'>
				{
					this.props.hand.map(function(card,i){
						return <Card suit={card.suit} value={card.value} key={i}/>
					})
				}
            </div>
		);
	}
}

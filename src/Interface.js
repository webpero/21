/*
 *	21 - oppgave for NAV - Versjon 0.1.0
 *	04.12.2017: Per Olav Mariussen
 *
 * 	Håndtering av brukergrenesnitt; visning av status og resultater
 */
 
import React, { Component } from 'react';

import { Hand } from './Cards.js';
import './Interface.css';

/* Håndtering av brukergrenesnitt; visning av status og resultater */
class ShowStatus extends Component
{
    render() {
		let newGameTxt = <span>Klikk for å starte <strong>Nytt spill</strong></span>;
		
        switch(this.props.status) {
            case "playing":
                return (<div className="alert alert-info btn btn-block" onClick={this.props.action} role="alert button">Klikk for å trekke <strong>Nytt kort</strong></div>);
            case "stop":
                return (<div className="alert alert-info" role="alert">Magnus trekker kort...</div>);
 			case "win":
                return (<div className="alert alert-success btn btn-block" onClick={this.props.action} role="alert button">Du vant! {newGameTxt}</div>);
            case "lose":
                return (<div className="alert alert-danger btn btn-block" onClick={this.props.action} role="alert button">Magnus vant! {newGameTxt}</div>);
            default:
                return(
					<div className="alert alert-info btn btn-block" role="alert button" onClick={this.props.action} >
						<h1 class="h1">Spill 21 med Magnus!</h1>
						<p>
							Magnus vinner på 21, lik, eller høyere poengsum enn deg.<br/>
							Ess (A) er alltid 11, bildekort (K,Q,J) er 10.
						</p>
						<p>
							Du og Magnus får først utdelt to kort hver.<br/>
							Du trekker så <strong>Nytt kort</strong> til du har 17 poeng eller mer.<br/>
							Deretter trekker Magnus til han han vinner eller taper.
						</p>
						<p>
							Det er ingen begrensinger på antall kort.<br/>
							Automatisk ny kortstokk når det er mindre enn 5 kort igjen.
						</p>
						<p>{newGameTxt} - Lykke til!</p>
					</div>
				);
        }
    }
}
export default class Interface extends Component
{
    render() {
		let status = this.props.status,
			action = (status === "new" || status === "win" || status === "lose") ? this.props.dealCards :
					 (status === "playing") ? this.props.newCard :
					 null;
        return (
            <div className='interface'>
			
                <div className="well text-center" aria-label="Magnus">
					<Hand hand={this.props.dealer} />
					<span class="h4"><strong>Magnus</strong> - Poengsum: <strong>{this.props.dealerScore}</strong> - Vunnet: <strong>{this.props.dealerWins}</strong></span>
				</div>
	
	            <div className="controller" aria-label="Spillkontroll">
					<ShowStatus status={status} action={action}/>	
					<button className="btn btn-default btn-block" onClick={this.props.restart}>Start på nytt - Vis instruksjoner</button>
                </div>
				
                <div className="well text-center" aria-label="Spiller">
					<span class="h4"><strong>Spiller</strong> - Poengsum: <strong>{this.props.playerScore}</strong> - Vunnet: <strong>{this.props.playerWins}</strong></span>
					<Hand hand={this.props.player} />
                </div>
				
			</div>
        );
    }
}
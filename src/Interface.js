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
        switch(this.props.status) {
            case "playing":
                return (<div className="alert alert-info" role="alert">Trekk nytt kort</div>);
            case "stop":
                return (<div className="alert alert-info" role="alert">Magnus trekker kort...</div>);
 			case "win":
                return (<div className="alert alert-success" role="alert">Du vant!</div>);
            case "lose":
                return (<div className="alert alert-danger" role="alert">Magnus vant!</div>);
            default:
                return(
					<div className="alert alert-info" role="alert">
						<h1>Spill 21 med Magnus!</h1>
						<p>Regler:</p>
						<ul>
							<li>Ess (A) er alltid 11, bildekort (K,Q,J) er 10, resten er pålydende</li>
							<li>Magnus vinner hvis han får 21, lik, eller høyere poengsum enn deg</li>
							<li>Hver spiller får først utdelt to kort</li>
							<li>Deretter skal du trekke <strong>Nytt kort</strong> så lenge du ikke har fått 17 poeng eller mer</li>
							<li>Deretter trekker Magnus til han får minst like mange poeng som deg, eller får mer enn 21</li>
							<li>Ingen begrensinger på antall kort</li>
							<li>Automatisk ny kortstokk når det er mindre enn 5 kort igjen, eller du klikker på <strong>Restart</strong></li>
						</ul>
						<p>Klikk på <strong>Nytt spill</strong> for å starte. Lykke til!</p>
					</div>
				);
        }
    }
}
export default class Interface extends Component
{
    render() {
        return (
            <div className='interface'>
                <ShowStatus status={this.props.status}/>
                <div className="btn-group btn-group-justified" role="group" aria-label="Spillkontroller">
					<div className="btn-group" role="group">
						<button onClick={this.props.restart} type="button" className="btn btn-default">Restart</button>
					</div>
                    <div className="btn-group" role="group">
                        <button onClick={this.props.dealCards} type="button" className="btn btn-info">Nytt spill</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button onClick={this.props.newCard} type="button" className="btn btn-success" disabled={this.props.status !== "playing"}>Nytt kort</button>
                    </div>
                </div>
                <div className="btn-group btn-group-justified" role="group" aria-label="Stillingen">
                    <span className="btn btn-default">
						<p>
							Magnus: <strong>{this.props.dealerScore}</strong>&nbsp;
							Vunnet: <strong>{this.props.dealerWins}</strong>
						</p>
						<Hand hand={this.props.dealer} />
					</span>
                    <span className="btn btn-default">
						<p>
							Spiller: <strong>{this.props.playerScore}</strong>&nbsp;
							Vunnet: <strong>{this.props.playerWins}</strong>
						</p>
						<Hand hand={this.props.player} />
					</span>
                </div>
			</div>
        );
    }
}
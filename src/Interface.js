/*
 *	21 - oppgave for NAV - Versjon 0.9.2
 *	06.12.2017: Per Olav Mariussen
 *
 * 	Håndtering av brukergrenesnitt; visning av status og resultater
 */
 
import React from 'react';

import { Hand } from './Cards.js';
import './Interface.css';

/* 
	Visning av status som knapp som kan trykkes på for neste handling 
	Functional Component (da komponenten ikke har state)
*/
function ShowStatus ( props )
{
	let newGameTxt = <span>Klikk for å starte <strong>Nytt spill</strong></span>;
	
	switch(props.status) {
		case "playing":
			return (<div className="alert alert-info btn btn-block" onClick={props.action} role="alert button">Klikk for å trekke <strong>Nytt kort</strong></div>);
		case "stop":
			return (<div className="alert alert-info" role="alert">Magnus trekker kort...</div>);
		case "win":
			return (<div className="alert alert-success btn btn-block" onClick={props.action} role="alert button">Du vant! {newGameTxt}</div>);
		case "lose":
			return (<div className="alert alert-danger btn btn-block" onClick={props.action} role="alert button">Magnus vant! {newGameTxt}</div>);
		default:
			return(
				<div className="text-center">
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
					<div className="alert alert-info btn btn-block" role="alert button" onClick={props.action} >
						<p>{newGameTxt} - Lykke til!</p>
					</div>
				</div>
			);
	}
}

/* 
	Brukergrenesnitt, status og resultater 
	Functional Component (da komponenten ikke har state)
*/
export default function Interface ( props )
{
	let status = props.status,
		action = (status === "new" || status === "win" || status === "lose") ? props.dealCards :
				 (status === "playing") ? props.newCard :
				 null,
		restartButton = (status !== "new") ? <button className="btn btn-default btn-block" onClick={props.restart}>Start på nytt - Vis instruksjoner</button> : <span></span>;
	return (
		<div className='interface'>
		
			<div className="well text-center" aria-label="Magnus">
				<Hand hand={props.dealer} />
				<span class="h4"><strong>Magnus</strong> - Poengsum:&nbsp;<strong>{props.dealerScore}</strong> - Vunnet:&nbsp;<strong>{props.dealerWins}</strong></span>
			</div>

			<div className="controller" aria-label="Spillkontroll">
				<ShowStatus status={status} action={action}/>	
				{restartButton}
			</div>
			
			<div className="well text-center no-margin" aria-label="Spiller">
				<span class="h4"><strong>Spiller</strong> - Poengsum:&nbsp;<strong>{props.playerScore}</strong> - Vunnet:&nbsp;<strong>{props.playerWins}</strong></span>
				<Hand hand={props.player} />
			</div>
			
		</div>
	);
}
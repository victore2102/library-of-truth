import React, { useState } from 'react';
import Modal from 'react-modal';
import './Main.css';
import BookView from './components/BookView';
import theAlchemist from './static/theAlchemist.jpg';
import theGiver from './static/theGiver.jpg';
import theSonOfNeptune from './static/theSonOfNeptune.jpg';
import frankenstein from './static/frankenstein.jpg';
import theirEyesWereWatchingGod from './static/theirEyesWereWatchingGod.jpg';
import littleWomen from './static/littleWomen.jpg';
import braveNewWorld from './static/braveNewWorld.jpg';
import extremelyLoudAndIncrediblyClose from './static/extremelyLoudAndIncrediblyClose.jpg';
import theOtherWesMoore from './static/theOtherWesMoore.jpg';
import theLightningThief from './static/theLightningThief.jpg';
import Header from './components/Header';


export default function Main() {

  return (
    <div id='main'>
        <Header />
        <BookView book={theAlchemist} bookName='The Alchemist' />
        <BookView book={theGiver} bookName='The Giver' />
        <BookView book={theSonOfNeptune} bookName='The Son of Neptune' />
        <BookView book={frankenstein} bookName='Frankenstein' />
        <BookView book={theirEyesWereWatchingGod} bookName='Their Eyes Were Watching God' />
        <BookView book={littleWomen} bookName='Little Women' />
        <BookView book={braveNewWorld} bookName='Brave New World' />
        <BookView book={extremelyLoudAndIncrediblyClose} bookName='Extremely Loud & Incredibly Close' />
        <BookView book={theOtherWesMoore} bookName='The Other Wes Moore: One Name, Two Fates' />
        <BookView book={theLightningThief} bookName='The Lightning Thief' />
    </div>
  );
}


 import React from 'react';
 import OneOfDiamonds from 'images/OneOfDiamonds.png';
 import TwoOfDiamonds from 'images/TwoOfDiamonds.png';
 import ThreeOfDiamonds from 'images/ThreeOfDiamonds.png';
 import FourOfDiamonds from 'images/FourOfDiamonds.png';
 import FiveOfDiamonds from 'images/FiveOfDiamonds.png';
 import SixOfDiamonds from 'images/SixOfDiamonds.png';
 import SevenOfDiamonds from 'images/SevenOfDiamonds.png';
 import EightOfDiamonds from 'images/EightOfDiamonds.png';
 import NineOfDiamonds from 'images/NineOfDiamonds.png';
 import TenOfDiamonds from 'images/TenOfDiamonds.png';
 import OneOfSpades from 'images/OneOfSpades.png';
 import TwoOfSpades from 'images/TwoOfSpades.png';
 import ThreeOfSpades from 'images/ThreeOfSpades.png';
 import FourOfSpades from 'images/FourOfSpades.png';
 import FiveOfSpades from 'images/FiveOfSpades.png';
 import SixOfSpades from 'images/SixOfSpades.png';
 import SevenOfSpades from 'images/SevenOfSpades.png';
 import EightOfSpades from 'images/EightOfSpades.png';
 import NineOfSpades from 'images/NineOfSpades.png';
 import TenOfSpades from 'images/TenOfSpades.png';
 import OneOfHearts from 'images/OneOfHearts.png';
 import TwoOfHearts from 'images/TwoOfHearts.png';
 import ThreeOfHearts from 'images/ThreeOfHearts.png';
 import FourOfHearts from 'images/FourOfHearts.png';
 import FiveOfHearts from 'images/FiveOfHearts.png';
 import SixOfHearts from 'images/SixOfHearts.png';
 import SevenOfHearts from 'images/SevenOfHearts.png';
 import EightOfHearts from 'images/EightOfHearts.png';
 import NineOfHearts from 'images/NineOfHearts.png';
 import TenOfHearts from 'images/TenOfHearts.png';
 import OneOfClubs from 'images/OneOfClubs.png';
 import TwoOfClubs from 'images/TwoOfClubs.png';
 import ThreeOfClubs from 'images/ThreeOfClubs.png';
 import FourOfClubs from 'images/FourOfClubs.png';
 import FiveOfClubs from 'images/FiveOfClubs.png';
 import SixOfClubs from 'images/SixOfClubs.png';
 import SevenOfClubs from 'images/SevenOfClubs.png';
 import EightOfClubs from 'images/EightOfClubs.png';
 import NineOfClubs from 'images/NineOfClubs.png';
 import TenOfClubs from 'images/TenOfClubs.png';
 import KingOfDiamonds from 'images/KingOfDiamonds.png';
 import QueenOfDiamonds from 'images/QueenOfDiamonds.png';
 import JackOfDiamonds from 'images/JackOfDiamonds.png';
 import KingOfSpades from 'images/KingOfSpades.png';
 import QueenOfSpades from 'images/QueenOfSpades.png';
 import JackOfSpades from 'images/JackOfSpades.png';
 import KingOfHearts from 'images/KingOfHearts.png';
 import QueenOfHearts from 'images/QueenOfHearts.png';
 import JackOfHearts from 'images/JackOfHearts.png';
 import KingOfClubs from 'images/KingOfClubs.png';
 import JackOfClubs from 'images/JackOfClubs.png';
 import QueenOfClubs from 'images/QueenOfClubs.png';

export default function Card({ card }) {

  const cards = {
    OneOfDiamonds:  OneOfDiamonds,
    TwoOfDiamonds:  TwoOfDiamonds,
    ThreeOfDiamonds:  ThreeOfDiamonds,
    FourOfDiamonds:  FourOfDiamonds,
    FiveOfDiamonds:  FiveOfDiamonds,
    SixOfDiamonds:  SixOfDiamonds,
    SevenOfDiamonds:  SevenOfDiamonds,
    EightOfDiamonds:  EightOfDiamonds,
    NineOfDiamonds:  NineOfDiamonds,
    TenOfDiamonds:  TenOfDiamonds,
    OneOfSpades:  OneOfSpades,
    TwoOfSpades:  TwoOfSpades,
    ThreeOfSpades:  ThreeOfSpades,
    FourOfSpades:  FourOfSpades,
    FiveOfSpades:  FiveOfSpades,
    SixOfSpades:  SixOfSpades,
    SevenOfSpades:  SevenOfSpades,
    EightOfSpades:  EightOfSpades,
    NineOfSpades:  NineOfSpades,
    TenOfSpades:  TenOfSpades,
    OneOfHearts:  OneOfHearts,
    TwoOfHearts:  TwoOfHearts,
    ThreeOfHearts:  ThreeOfHearts,
    FourOfHearts:  FourOfHearts,
    FiveOfHearts:  FiveOfHearts,
    SixOfHearts:  SixOfHearts,
    SevenOfHearts:  SevenOfHearts,
    EightOfHearts:  EightOfHearts,
    NineOfHearts:  NineOfHearts,
    TenOfHearts:  TenOfHearts,
    OneOfClubs:  OneOfClubs,
    TwoOfClubs:  TwoOfClubs,
    ThreeOfClubs:  ThreeOfClubs,
    FourOfClubs:  FourOfClubs,
    FiveOfClubs:  FiveOfClubs,
    SixOfClubs:  SixOfClubs,
    SevenOfClubs:  SevenOfClubs,
    EightOfClubs:  EightOfClubs,
    NineOfClubs:  NineOfClubs,
    TenOfClubs:  TenOfClubs,
    KingOfDiamonds:  KingOfDiamonds,
    QueenOfDiamonds:  QueenOfDiamonds,
    JackOfDiamonds:  JackOfDiamonds,
    KingOfSpades:  KingOfSpades,
    QueenOfSpades:  QueenOfSpades,
    JackOfSpades:  JackOfSpades,
    KingOfHearts:  KingOfHearts,
    QueenOfHearts:  QueenOfHearts,
    JackOfHearts: JackOfHearts,
    KingOfClubs:  KingOfClubs,
    JackOfClubs:  JackOfClubs,
    QueenOfClubs: QueenOfClubs
  }

  const values = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten'
  };

  const handleImage = () => {
    if(card.face) {
      return cards[`${card.face}Of${card.suit}`];
    }
    return cards[`${values[card.value]}Of${card.suit}`];
  }

  return <img src={handleImage()} className="image-size"></img>
}

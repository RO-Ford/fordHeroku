import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakedataService {

  constructor() { }

  maximale = {
    "class": "go.GraphLinksModel",
    "nodeKeyProperty": "id",
    "nodeDataArray": [
      { text: "x1", id: -1, loc: "-446 -46", texte: "" },

      { text: "x2", id: -2, loc: "-314 -101", texte: "" },

      { text: "x3", id: -3, loc: "-217 87", texte: "" },

      { text: "x4", id: -4, loc: "-210 -178", texte: "" },

      { text: "x5", id: -5, loc: "-25 -204", texte: "" },

      { text: "x6", id: -6, loc: "-71 70", texte: "" },

      { text: "x7", id: -7, loc: "20 -75", texte: "" },

      { text: "x8", id: -8, loc: "176 -69", texte: "" },

      { text: "x9", id: -9, loc: "110 -169", texte: "" },

      { text: "x10", id: -10, loc: "275 -170", texte: "" },

      { text: "x11", id: -11, loc: "79 74", texte: "" },

      { text: "x12", id: -12, loc: "392 -150", texte: "" },

      { text: "x13", id: -13, loc: "279 115", texte: "" },

      { text: "x14", id: -14, loc: "551 55", texte: "" },

      { text: "x15", id: -15, loc: "534 -112", texte: "" },

      { text: "x16", id: -16, loc: "630 -45", texte: "" },



      /*
        { text: "x1", id: -1, loc: "-338 -17", color: "white" },
        { text: "x2", loc: "-211 -96", id: -2, color: "white" },
        { text: "x3", loc: "-213 16", id: -3, color: "white" },
        { text: "x4", loc: "-112 79", id: -4, color: "white" },
        { text: "x5", loc: "-13 16", id: -5, color: "white" },
        { text: "x6", loc: "129 -61", id: -6, color: "white" },*/
    ],
    "linkDataArray": [

      { from: -1, to: -2, text: "10" },
      { from: -2, to: -3, text: "15" },
      { from: -2, to: -4, text: "8" },
      { from: -4, to: -3, text: "8" },
      { from: -3, to: -6, text: "1" },
      { from: -4, to: -5, text: "6" },
      { from: -6, to: -5, text: "5" },
      { from: -6, to: -7, text: "4" },
      { from: -5, to: -9, text: "1" },
      { from: -7, to: -8, text: "1" },

      //{ from: -8, to: -7, text: "1" }, // arc de boucle infinie

      { from: -9, to: -8, text: "3" },

      { from: -8, to: -10, text: "2" },

      { from: -9, to: -10, text: "4" },

      { from: -3, to: -11, text: "16" },

      { from: -7, to: -11, text: "8" },

      { from: -10, to: -12, text: "7" },

      { from: -11, to: -12, text: "6" },

      { from: -11, to: -13, text: "12" },

      { from: -13, to: -14, text: "3" },

      { from: -12, to: -15, text: "9" },

      { from: -15, to: -16, text: "6" },

      { from: -14, to: -16, text: "3" },

      { from: -15, to: -14, text: "5" }
      /*
            { from: -1, to: -2, text: "20", points: Array(8) },
            { from: -1, to: -3, text: "5", points: Array(8) },
            { from: -3, to: -4, text: "1", points: Array(8) },
            { from: -3, to: -5, text: "4", points: Array(8) },
            { from: -5, to: -6, text: "1", points: Array(8) },
            { from: -4, to: -5, points: Array(8), text: "3" },
            { from: -2, to: -6, points: Array(8), text: "4" },*/

    ]
  }

  minimale = {
    "class": "go.GraphLinksModel",
    "nodeKeyProperty": "id",
    "nodeDataArray": [
      { text: "x1", id: -1, loc: "-446 -46", texte: "" },

      { text: "x2", id: -2, loc: "-314 -101", texte: "" },

      { text: "x3", id: -3, loc: "-217 87", texte: "" },

      { text: "x4", id: -4, loc: "-210 -178", texte: "" },

      { text: "x5", id: -5, loc: "-25 -204", texte: "" },

      { text: "x6", id: -6, loc: "-71 70", texte: "" },

      { text: "x7", id: -7, loc: "20 -75", texte: "" },

      { text: "x8", id: -8, loc: "176 -69", texte: "" },

      { text: "x9", id: -9, loc: "110 -169", texte: "" },

      { text: "x10", id: -10, loc: "275 -170", texte: "" },

      { text: "x11", id: -11, loc: "79 74", texte: "" },

      { text: "x12", id: -12, loc: "392 -150", texte: "" },

      { text: "x13", id: -13, loc: "279 115", texte: "" },

      { text: "x14", id: -14, loc: "551 55", texte: "" },

      { text: "x15", id: -15, loc: "534 -112", texte: "" },

      { text: "x16", id: -16, loc: "630 -45", texte: "" },


      /*{ text: "x1", id: -1, loc: "-338 -17", color: "white" },
      { text: "x2", loc: "-211 -96", id: -2, color: "white" },
      { text: "x3", loc: "-213 16", id: -3, color: "white" },
      { text: "x4", loc: "-112 79", id: -4, color: "white" },
      { text: "x5", loc: "-13 16", id: -5, color: "white" },
      { text: "x6", loc: "129 -61", id: -6, color: "white" },*/

      /*{ text: "A", id: -1, loc: "-391 -50" },
      { text: "B", id: -2, loc: "-310 -111" },
      { text: "C", id: -3, loc: "-276 -37" },
      { text: "D", id: -4, loc: "-282 64" },
      { text: "E", id: -5, loc: "-207 -148" },
      { text: "F", id: -6, loc: "-154 -37" },
      { text: "G", id: -7, loc: "-145 73" },
      { text: "H", id: -8, loc: "-15 69" },
      { text: "I", id: -9, loc: "-59 -153" },
      { text: "J", id: -10, loc: "-32 -65" },
      { text: "K", id: -11, loc: "-30 -7" },
      { text: "L", id: -12, loc: "72 -148" },
      { text: "M", id: -13, loc: "76 25" },
      { text: "N", id: -14, loc: "75 -54" },
      { text: "O", id: -15, loc: "203 -52" },
      { text: "P", id: -16, loc: "340 -46" }*/

    ],
    "linkDataArray": [

      { from: -1, to: -2, text: "10" },
      { from: -2, to: -3, text: "15" },
      { from: -2, to: -4, text: "8" },
      { from: -4, to: -3, text: "8" },
      { from: -3, to: -6, text: "1" },
      { from: -4, to: -5, text: "6" },
      { from: -6, to: -5, text: "5" },
      { from: -6, to: -7, text: "4" },
      { from: -5, to: -9, text: "1" },
      { from: -7, to: -8, text: "1" },

      { from: -8, to: -7, text: "1" },  //infinity loop

      { from: -9, to: -8, text: "3" },

      { from: -8, to: -10, text: "2" },

      { from: -9, to: -10, text: "4" },

      { from: -6, to: -11, text: "16" },

      { from: -7, to: -11, text: "8" },

      { from: -10, to: -12, text: "7" },

      { from: -11, to: -12, text: "6" },

      { from: -11, to: -13, text: "12" },

      { from: -13, to: -14, text: "3" },

      { from: -12, to: -15, text: "9" },

      { from: -15, to: -16, text: "6" },

      { from: -14, to: -16, text: "3" },

      { from: -15, to: -14, text: "5" }

      /*{ from: -1, to: -2, text: "20", points: Array(8) },
      { from: -1, to: -3, text: "5", points: Array(8) },
      { from: -3, to: -4, text: "1", points: Array(8) },
      { from: -3, to: -5, text: "4", points: Array(8) },
      { from: -5, to: -6, text: "1", points: Array(8) },
      { from: -4, to: -5, points: Array(8), text: "3" },
      { from: -2, to: -6, points: Array(8), text: "4" },
      { from: -4, to: -6, points: Array(8), text: "4" }, // 3 lalana miverina */

      /*{ from: -1, to: -2, points: Array(8), text: "5" },
      { from: -1, to: -3, points: Array(8), text: "9" },
      { from: -1, to: -4, points: Array(8), text: "4" },
      { from: -3, to: -4, points: Array(8), text: "4" },
      { from: -2, to: -5, points: Array(8), text: "3" },
      { from: -2, to: -6, points: Array(8), text: "2" },
      { from: -3, to: -6, points: Array(8), text: "1" },
      { from: -4, to: -7, points: Array(8), text: "7" },
      { from: -6, to: -7, points: Array(8), text: "3" },
      { from: -5, to: -9, points: Array(8), text: "9" },
      { from: -5, to: -10, points: Array(8), text: "2" },
      { from: -5, to: -11, points: Array(8), text: "4" },
      { from: -6, to: -9, points: Array(8), text: "9" },
      { from: -6, to: -8, points: Array(8), text: "5" },
      { from: -7, to: -8, points: Array(8), text: "7" },
      { from: -8, to: -14, points: Array(8), text: "2" },
      { from: -9, to: -12, points: Array(8), text: "5" },
      { from: -9, to: -14, points: Array(8), text: "1" },
      { from: -10, to: -12, points: Array(8), text: "10" },
      { from: -11, to: -15, points: Array(8), text: "5" },
      { from: -7, to: -13, points: Array(8), text: "5" },
      { from: -13, to: -14, points: Array(8), text: "4" },
      { from: -12, to: -15, points: Array(8), text: "4" },
      { from: -12, to: -14, points: Array(8), text: "3" },
      { from: -14, to: -16, points: Array(8), text: "4" },
      { from: -15, to: -16, points: Array(8), text: "9" },
      { from: -13, to: -16, points: Array(8), text: "3" },
      { from: -9, to: -10, points: Array(8), text: "9" },
      { from: -10, to: -11, points: Array(8), text: "3" }*/

    ]
  }

}

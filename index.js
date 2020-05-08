const ruimteLengte = 700
const ruimteBreedte = 500
const zwembadLengte = 500 // 25 m.
const zwembadBreedte = 300 // Ongeveer helft van de lengte

// Badlengte in meters. De lengte staat op het scherm in breedte. Verwarrend! :).
let aantalPixelsPerMeter = zwembadLengte/25

let zwemmerAfstand = aantalPixelsPerMeter*1.5
let emmerVeiligheidsMarge = 1.3333 // Emmers 2 meter uit elkaar i.p.v. 1.5
let emmerAfstand = zwemmerAfstand*emmerVeiligheidsMarge
let zwemlijnDikte = 5 //

let aantalBanen = 6 // 6 banen
let aantalEmmersPerBaan = 4 // 4 personen per baan, elk een markeringsemmer.
let aantalZwemmersPerBaan= aantalEmmersPerBaan+1
let aantalPersonen = aantalZwemmersPerBaan*aantalBanen

let margeBadHorizontaal = (ruimteBreedte - zwembadBreedte)/2
let margeBadVerticaal = (ruimteLengte - zwembadLengte)/2

let baanBreedte = zwembadBreedte/aantalBanen
let baanLengte = zwembadLengte

// Kleuren.
let zwemlijkleur, zwemmerkleur, ruimtekleur, waterkleur
let emmerkleur, emmerstipkleur


function setup() {
  zwemlijnkleur = color(255, 10, 10) // Rood
  ruimtekleur = color(128, 128, 128) // Grijs
  waterkleur = color(120, 120, 255) // Lichtblauw
  emmerkleur = color(255, 255, 255) // Wit
  emmerstipkleur = color(255, 0, 0) // Rood
  zwemmerkleur = color(0, 0, 0)
  let canvas = createCanvas(ruimteLengte, ruimteBreedte)
 
  canvas.parent('canvas');

  background(ruimtekleur)  
}

function draw() {
  tekenStartsituatie()
  // TODO: Zwemmers voor alle banen en die bewegen.
  fill(zwemmerkleur);
  for(baan=0; baan<aantalBanen; baan++) {
    for(zwemmer=0; zwemmer<aantalZwemmersPerBaan; zwemmer++) {
      xZwemmer=margeBadHorizontaal+zwemmer*zwemmerAfstand
      yZwemmer=margeBadHorizontaal+baan*baanBreedte
      circle(xZwemmer, yZwemmer, 10)
    }
  }
}

let tekenStartsituatie = () => {
  fill(waterkleur)
  rect(margeBadVerticaal, margeBadHorizontaal, zwembadLengte, zwembadBreedte)
    
  x = margeBadVerticaal
  let aantalZwemlijnen = aantalBanen-1
  
  textAlign(CENTER, CENTER)
  for(let baan=1; baan<=aantalBanen; baan++) {
    y = margeBadHorizontaal+baan*baanBreedte
    // Laatste baan geen zwemlijn
    if(baan<=aantalZwemlijnen) {
      tekenZwemlijn(x, y, baanLengte, zwemlijnDikte);
    }
    // Teken zwembaan nummer.
    fill(0, 0, 0)
    textSize(20)
    text('baan ' + baan, x+baanLengte/2, y-baanBreedte/2)
    tekenEmmers(baan, x, y)
  }
}


function tekenZwemlijn(x, y, baanLengte, zwemlijnDikte) {
  // Voor nu gewoon een lijnvormige rechthoek.
  // TODO: Evt. later aparte schijven voor de mooi ;);
  fill(zwemlijnkleur)
  rect(x, y, baanLengte, zwemlijnDikte)
}

function tekenEmmers(baan, x, y) {
  let isEven = baan%2==0
  xSpiegel = ruimteLengte-margeBadVerticaal;
  x = isEven ? x : xSpiegel  
  yEmmer = y-3*baanBreedte/4
  textSize(8)
  for(let emmer=1; emmer<=aantalEmmersPerBaan; emmer++) {    
    xEmmer = (isEven) ? x + emmer * emmerAfstand : x - emmer * emmerAfstand;
    fill(emmerkleur)
    circle(xEmmer, yEmmer, 25)
    fill(emmerstipkleur)
    circle(xEmmer, yEmmer, 8)
    fill(emmerkleur)
    text(emmer+1, xEmmer, yEmmer)
  }
}

class Zwemmer {
  x = 0;
}
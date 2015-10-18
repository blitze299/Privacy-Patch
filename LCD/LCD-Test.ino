/*
Autor: Fabian Geiselhart
Datum: 17.10.15
Beschreibung: **ACHTUNG** Dieser Code wird im eigentlichem Projekt nicht verwendet. Er ist nur um das LCD zu testen.
Dieser Code Aktiviert alle Zeichen, und lässt sie durchsichtig werden.
*/
// Include library
#include <LiquidCrystal.h>

// Init
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

// Alles an Char
byte an[8] = {
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111,
  0b11111
}
void setup() {
  // neuer Char
  lcd.createChar(0, an);
  // LCD Setup
  lcd.begin(16, 2);

}

void loop() {
  for(int i=0; i<=1, i++){
    for(int x=0; x<=15; x++){
      lcd.setCursor(i, x)
      lcd.write(1);
    }
  }
}

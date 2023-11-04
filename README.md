# React + Vite + serial port + arduino

Simple testing project - serial port sending and receiving data.

## arduino code:

```
int incomingByte = 0; // for incoming serial data

const int length = 20;  
char turnON[length] = "on";  
char turnOFF[length] = "off"; 

void setup() {
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(13, OUTPUT);
}

void loop() {
  // send data only when you receive data:
  if (Serial.available() > 0) {
    String str = Serial.readString();
    str.trim();

    Serial.print("I received: ");
    Serial.println(str);
    
    if(str == turnON)
      digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
    
    if(str == turnOFF)
      digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  }
}
```

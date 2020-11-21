#include <Arduino.h>
#include <ESP8266WiFi.h>                                                   
#include <Adafruit_Sensor.h>
#include <FirebaseArduino.h>                                                
#include <DHT.h>                                                       
#include <LiquidCrystal_I2C.h>
#define FIREBASE_HOST "..."                          
#define FIREBASE_AUTH "..."           
#define WIFI_SSID "..."                                            
#define WIFI_PASSWORD "..."

#define DHTPIN 14       //zdefiniowanie pinu z którym polaczony jest czujnik DHT-22                                                
#define DHTTYPE DHT22   //zdefiniowanie typu czujnika
 
#define smokeA0 A0       //zdefiniowanie pinu z którym polaczony jest czujnik MQ-2 
#define buzzer  D6        //zdefiniowanie pinu z którym polaczony jest buzzer
const int sensorThres = 620;  //zdefiniowanie wartosci granicznej dla czujnika MQ-2

DHT dht(DHTPIN, DHTTYPE);     //inicjalizacja czujnika DHT-22
LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE); //inicjalizacja ekranu LCD                                  

void setup() {
 pinMode(buzzer, OUTPUT);
 pinMode(smokeA0, INPUT);
  Serial.begin(9600);
  delay(1000);
  ESP.eraseConfig();         
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                    
  Serial.print("Laczenie z ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Polaczono z  ");
  Serial.println(WIFI_SSID);
  Serial.print("IP adres : ");
  Serial.println(WiFi.localIP());                                           
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                                 
  dht.begin();                                                            
  lcd.begin(16,2);
  lcd.setCursor(0,0); // Ustawienie kursora w pozycji 0,0 (pierwszy wiersz, pierwsza kolumna)
  lcd.print("Temp: "); // wypisanie tekstu na ekran LCD
  lcd.setCursor(0,1);
  lcd.print("Wilg: ");
}

void loop() { 
  int analogSensor = analogRead(smokeA0); //odczyt stezenia gazu z pinu A0
  float h = dht.readHumidity();        //odczyt wilgotnosci                                      
  float t = dht.readTemperature();     //odczyt temperatury

  Serial.print("\n Pin A0: ");
  Serial.println(analogSensor);    

 if (analogSensor > sensorThres)
 {
   tone(buzzer, 1000, 200);
   Serial.print(" | Wykryto dym!");
   delay(5000);
 }
 else
 {
   noTone(buzzer);
 }
 
 String fireGas = String(analogSensor);
    
//  if (isnan(h) || isnan(t)) {                                               
//    Serial.println(F("Failed to read from DHT sensor!"));
//    return;
//  }
   Serial.print("\n Temperatura: ");  Serial.print(t);  Serial.println("°C ");
  String fireTemp = String(t);                                                   
  
  lcd.clear();
  lcd.setCursor(0,0); // Ustawienie kursora w pozycji 0,0 (pierwszy wiersz, pierwsza kolumna)
  lcd.print("Temp: ");
  lcd.setCursor(6, 0);
  lcd.print(t); //wypisanie wartosci temperatury na ekran LCD
  lcd.setCursor(12,0);
  lcd.print("*C");

  Serial.print("\n Wilgotnosc: ");  Serial.print(h);
  String fireHumid = String(h);                                        


  
  lcd.setCursor(0,1); // Ustawienie kursora w pozycji 0,0 (pierwszy wiersz, pierwsza kolumna)
  lcd.print("Wilg: ");
  lcd.setCursor(6, 1);
  lcd.print(h); //wypisanie wartosci wilgotnosci na ekran LCD
  lcd.setCursor(12,1);
  lcd.print("%");
  
  delay(5000);
  
  Firebase.pushString("/DHT22/Humidity", fireHumid);   //wyslanie odczytow do bazy danych                              
  Firebase.pushString("/DHT22/Temperature", fireTemp);
  Firebase.pushString("/MQ2/Gas", fireGas);      

}

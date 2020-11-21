#include <Arduino.h>
#include <ESP8266WiFi.h>                                                   
#include <Hash.h>
#include <FirebaseArduino.h>                                                

#define FIREBASE_HOST "..."                          
#define FIREBASE_AUTH "..."           
#define WIFI_SSID "..."                                            
#define WIFI_PASSWORD "..."

String fireStatus = "";  //zmienna do przechowywania stanu swiatla w Firebase                                              
int RELAY = D2;          //zmienna do obsługi przekaźnika

void setup() {
  
  Serial.begin(9600);     //rozpoczęcie monitorowania portu szeregowego
  delay(1000); 
  pinMode(RELAY, OUTPUT); //zapisanie przekaznika jako wyjscie
  digitalWrite(RELAY, LOW);  //poczatkowy stan przekaznika      
  ESP.eraseConfig();       
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD); //polaczenie z WiFi                                   
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());                                           
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);   //polaczenie z Firebase 
  //Firebase.setString("LIGHT_STATUS", "OFF");                               
 }

 void loop() {   

  fireStatus = Firebase.getString("LIGHT_STATUS");                                     
  if (fireStatus == "OFF") {                                                          
    Serial.println("Light Turned OFF");                                                                         
    digitalWrite(RELAY, HIGH);                                                        
  } 
  else if (fireStatus == "ON") {                                                  
    Serial.println("Light Turned ON");                                            
    digitalWrite(RELAY, LOW);                                                         
  }  
}

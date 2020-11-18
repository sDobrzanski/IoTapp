import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import * as moment from 'moment-timezone';


admin.initializeApp();

export const formatData = functions.database.ref('/DHT22/Humidity/{pushId}/')
    .onCreate(
        (snapshot, context) => {
            const original = snapshot.val(); 
            const pushId = context.params.pushId; 
            console.log(`Detected new measure ${original} with pushId ${pushId}`);
            return admin.database().ref('timestamped_humi').push({
                value: original,
                timestamp: admin.database.ServerValue.TIMESTAMP 
            });
        });

export const formatData2 = functions.database.ref('/DHT22/Temperature/{pushId}/')
    .onCreate(
        (snapshot, context) => {
            const original = snapshot.val();
            const pushId = context.params.pushId; 
            console.log(`Detected new measure ${original} with pushId ${pushId}`);
            return admin.database().ref('timestamped_temp').push({
                value: original,
                timestamp: admin.database.ServerValue.TIMESTAMP 
            });
        });
    
export const wakeUp = functions.pubsub.schedule('every 1 minutes').onRun(() => {
    // tslint:disable-next-line: no-floating-promises
    admin.database().ref('/timeLightON/').limitToLast(1).once('value')
    .then(function(snapshot) {
        let wakeUpTimeChild;
     snapshot.forEach(function(childSnapshot) {
         wakeUpTimeChild = childSnapshot.val();
     });
     
     console.log('czas wpisany przeze mnie child  ' + wakeUpTimeChild);
     const currentTime = moment().tz("Europe/Warsaw").format('YYYY-MM-DDTHH:mm');
     
         console.log('czas w danej chwili' + currentTime);

     if(wakeUpTimeChild === currentTime){
         // tslint:disable-next-line: no-floating-promises
         admin.database().ref('/').update({LIGHT_STATUS: 'ON'});
     }
   });
   return 1;
   });

   export const goToSleep = functions.pubsub.schedule('every 1 minutes').onRun(() => {
       // tslint:disable-next-line: no-floating-promises
       // tslint:disable-next-line: no-floating-promises
       admin.database().ref('/timeLightOFF/').limitToLast(1).once('value')
       .then(function(snapshot) {
           let goToSleepTimeChild;
        snapshot.forEach(function(childSnapshot) {
            goToSleepTimeChild = childSnapshot.val();
        });
        console.log('czas wpisany przeze mnie child  ' + goToSleepTimeChild);

        const currentTime = moment().tz("Europe/Warsaw").format('YYYY-MM-DDTHH:mm');
            console.log('czas w danej chwili' + currentTime);

        if(goToSleepTimeChild===currentTime){
            // tslint:disable-next-line: no-floating-promises
           admin.database().ref('LIGHT_STATUS').set('OFF');
        }
      });
      return 1;
      });
   

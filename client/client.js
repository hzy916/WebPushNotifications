const publicVapidKey =
'BB5gST2bBwe69DDsflG_OupR0M6kpiMzSODH97LbivgdACrHSdQcBfMZdplBLQtUs7G2HJ4ddKdeYigCIybppyE';

//check for service worker
if('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}
//Register Service worker, push, send Push
async function send() {
  //register service worker
  console.log('registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js',{
    scope:'/'
  });

  console.log('service worker registered...');
  //register Push
  console.log('registering push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  console.log(' push registered...');

  //send push notifications
  console.log('Sending push...');
  await fetch('/subscribe',{
    method:'POST',
    body:JSON.stringify(subscription),
    headers:{
      'content-type':'application/json'
    }
  });

  console.log('Push sent...')

}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

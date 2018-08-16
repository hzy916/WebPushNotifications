console.log('Service worker loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('push recieved...');
  self.registration.showNotification(data.title,{
    body:'Notified by Ziyun',
    icon:'http://image.ibb.co/frYOFd/tmlogo.png'
  });
})

import { useState } from 'react'

function App() {

  let video = document.getElementById('original-video');
  let dehazedImage = document.getElementById('dehazed-image');

  navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
      video.srcObject = stream;

      video.addEventListener('play', function () {
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          canvas.width = 640;
          canvas.height = 480;

          setInterval(function () {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              let imageData = canvas.toDataURL('image/jpeg');

              fetch('/process_frame', {
                  method: 'POST',
                  body: JSON.stringify({ image_data: imageData }),
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then(response => response.json())
              .then(data => {
                  dehazedImage.src = 'data:image/jpeg;base64,' + data.dehazed_image;
              });
          }, 1000 / 30);
      });
  })
  .catch(function (error) {
      console.error('Error accessing camera:', error);
  });

  return (
    <>
      <h1>Real-time Dehazing Platform</h1>
    <div id="video-container">
        <div id="original-frame">
            <h3>Original Frame</h3>
            <video id="original-video" autoplay playsinline width="640" height="480"></video>
        </div>
        <div id="dehazed-frame">
            <h3>Dehazed Frame</h3>
            <img id="dehazed-image" src="" width="640" height="480"/>
        </div>
    </div>
    </>
  )
}

export default App

// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var clicks = 0;
var catchphrases = ["<p style='color:green; font-family: Arial, Helvetica, sans-serif;'>Objeto encontrado</p><p style='font-family: Arial, Helvetica, sans-serif;'>Cadeira</p><br><br><img src='cadeira.png' style='max-width:200px; height:auto'/>", "<p style='color:green; font-family: Arial, Helvetica, sans-serif;'>Objeto encontrado</p><p style='font-family: Arial, Helvetica, sans-serif;'>Copo</p><br><br><img src='copo.png' style='max-height:300px; width:auto'/>", "<p style='color:red; font-family: Arial, Helvetica, sans-serif;'>Erro</p><p style='font-family: Arial, Helvetica, sans-serif;'>Mota</p><br><br><img src='mota.png' style='max-width:300px; height:auto'/><br><br><p style='font-size:12px; font-family: Arial, Helvetica, sans-serif;'>Mas há beleza no erro...</p>"];
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = catchphrases[clicks % 3];
    clicks += 1;

    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

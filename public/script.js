Dropzone.options.dropzoneImage = {
  maxFilesize: 20,
  acceptedFiles: ".jpeg,.jpg,.png,.gif",

  init: function() {
    thisDropzone = this;
    this.on("success", function(file, responseText) {

      var colorDiv = document.getElementById("colorDiv");

      for (let key in responseText.message) {
        let color = responseText.message[key]["rgb"];

        var circle = document.createElement("SPAN");
        circle.setAttribute("class", "circle")
        circle.setAttribute("style", `background-color: rgb(${color[0]},${color[1]},${color[2]});`)
        colorDiv.appendChild(circle);
      }
    });
  }
};

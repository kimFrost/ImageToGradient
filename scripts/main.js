window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(/* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
      };
})();


(function(window, document, undefined) {

  var img = document.getElementById('my-image');
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);


  var width = img.width;
  var height = img.height;

  var goldenRatio = 1.6180338875;

  // Border points for main background
  var borderColors = [];
  var pixelData = canvas.getContext('2d').getImageData(width / goldenRatio, 5, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(width - width / goldenRatio, 5, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(width / goldenRatio, height - 5, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(width - width / goldenRatio, height - 5, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(5, height / goldenRatio, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(5, height - height / goldenRatio, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(width - 5, height / goldenRatio, 1, 1).data;
  borderColors.push(pixelData);

  pixelData = canvas.getContext('2d').getImageData(width - 5, height - height / goldenRatio, 1, 1).data;
  borderColors.push(pixelData);

  // Corners
  pixelData = canvas.getContext('2d').getImageData(5, 5, 1, 1).data;
  borderColors.push(pixelData);
  pixelData = canvas.getContext('2d').getImageData(width - 5, 5, 1, 1).data;
  borderColors.push(pixelData);
  pixelData = canvas.getContext('2d').getImageData(width - 5, height - 5, 1, 1).data;
  borderColors.push(pixelData);
  pixelData = canvas.getContext('2d').getImageData(5, height - 5, 1, 1).data;
  borderColors.push(pixelData);

  var backgroundColor = [0, 0, 0, 0];

  for (var key in borderColors) {
    var color = borderColors[key];
    //console.log('color', color);
    backgroundColor[0] += color[0];
    backgroundColor[1] += color[1];
    backgroundColor[2] += color[2];

    //console.log('backgroundColor', backgroundColor);
  }

  backgroundColor[0] = Math.floor(backgroundColor[0] / borderColors.length);
  backgroundColor[1] = Math.floor(backgroundColor[1] / borderColors.length);
  backgroundColor[2] = Math.floor(backgroundColor[2] / borderColors.length);

  //console.log('backgroundColor avg', backgroundColor);




  // Center points
  var centerColors = [];
  pixelData = ctx.getImageData(Math.floor(width / goldenRatio), Math.floor(height / goldenRatio), 1, 1).data;
  console.log('pixelData', pixelData);
  centerColors.push({
    color: pixelData,
    x: Math.floor(width / goldenRatio),
    y: Math.floor(height / goldenRatio)
  });

  pixelData = ctx.getImageData(Math.floor(width / goldenRatio), Math.floor(height -height / goldenRatio), 1, 1).data;
  centerColors.push({
    color: pixelData,
    x: Math.floor(width / goldenRatio),
    y: Math.floor(height -height / goldenRatio)
  });

  pixelData = ctx.getImageData(Math.floor(width - width / goldenRatio), Math.floor(height / goldenRatio), 1, 1).data;
  centerColors.push({
    color: pixelData,
    x: Math.floor(width - width / goldenRatio),
    y: Math.floor(height / goldenRatio)
  });

  pixelData = ctx.getImageData(Math.floor(width - width / goldenRatio), Math.floor(height -height / goldenRatio), 1, 1).data;
  centerColors.push({
    color: pixelData,
    x: Math.floor(width - width / goldenRatio),
    y: Math.floor(height -height / goldenRatio)
  });


  // Draw

  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.fillStyle = `rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`;
  ctx.fill();


  var radius = width / 3;

  for (var key in centerColors) {
    var point = centerColors[key];

    var x0 = point.x;
    var y0 = point.y;
    //var r0 = radius / 2;
    var r0 = 0;
    var x1 = point.x;
    var y1 = point.y;
    var r1 = radius;

    //ctx.globalCompositeOperation = "color";
    //ctx.globalCompositeOperation = "luminosity";

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0.7)`);
    grd.addColorStop(1, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0)`);

    // Fill with gradient
    ctx.fillStyle = grd;
    //ctx.fillRect(point.x * radius, point.y * radius, point.x * radius + radius, point.y * radius + radius);
    ctx.fillRect(0, 0, width, height);

  }






  return null;








  var radius = 50;
  var colorArray = [];

  var numOfXPoints = Math.ceil(img.width / radius);
  var numOfYPoints = Math.ceil(img.height / radius);

  for (var y = 0; y < numOfYPoints; y++) {
    for (var x = 0; x < numOfXPoints; x++) {
      var pixelData = canvas.getContext('2d').getImageData(x * radius, y * radius, 1, 1).data;

      console.log('pixelData', numOfXPoints * radius, numOfYPoints * radius);

      colorArray.push({
        color: pixelData,
        x: x,
        y: y
      });
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var key in colorArray) {
    var point = colorArray[key];
    console.log('point', colorArray[key]);

    var x0 = point.x * radius;
    var y0 = point.y * radius;
    var r0 = radius - 1;
    //var r0 = 0;
    var x1 = point.x * radius;
    var y1 = point.y * radius;
    var r1 = radius * 1.5;

    //ctx.globalCompositeOperation = "color";
    //ctx.globalCompositeOperation = "luminosity";

    var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
    grd.addColorStop(0, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 1)`);
    grd.addColorStop(1, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0)`);

    // Fill with gradient
    ctx.fillStyle = grd;
    //ctx.fillRect(point.x * radius, point.y * radius, point.x * radius + radius, point.y * radius + radius);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  }



  /*
   var construct = function() {


   //var sceneHtml = '<canvas id="' + scene.id + '" width="' + public.options.size.width + '" height="' + public.options.size.height + '">';
   //sceneHtml += '</canvas>';
   //scene.elem = $(sceneHtml).appendTo(private.data.sceneContainer);
   //scene.ctx = scene.elem[0].getContext('2d');
   };


   var update = function() {
   requestAnimFrame(public.update);
   public.updateOptionValues();
   //public.drawScenes();
   public.draw();
   };

   var fixedUpdate = function() {

   };

   var draw = function() {
   //private.data.renderViewCtx.drawImage(movie.buffer.elem[0], 0, 0, movie.size.width, movie.size.height);
   }
   */


})(window, window.document);

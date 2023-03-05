<template>
  <div id="container">
    <canvas ref="canvas"></canvas>

    <div >

      <slot id="overlay"></slot>



    </div>
  </div>
</template>
<style scoped>
#container {
  position: relative;
}



canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: sans-serif;
  text-align: center;
}
</style>

<script>
export default {
  name: "AnimatedBackground",

  mounted() {
    // initialize canvas and context
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    // create a series of rectangles with random sizes and gray shades
    let rectangles = [];
    const createRectangles = () => {
      for (let i = 0; i < 50; i++) {
        const width = Math.random() * 50 + 10;
        const height = Math.random() * 50 + 10;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const gray = Math.floor(Math.random() * 200) + 55;
        rectangles.push({ x, y, width, height, gray });
      }
    };
    createRectangles();

    // update canvas dimensions to match browser window on resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight ;
      rectangles = []; // clear the rectangles array on resize
      createRectangles();
    };
    window.addEventListener("resize", resize);
    resize();

    // animate the rectangles by updating their positions and drawing them on each frame
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgb(50, 50, 50)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (const rect of rectangles) {
        context.save();
        context.translate(rect.x, rect.y);
        context.rotate((Date.now() / 1000) * Math.PI);
        context.scale(
          Math.sin(Date.now() / 1000) + 1,
          Math.sin(Date.now() / 1000) + 1
        );
        context.beginPath();
        context.strokeStyle = `rgb(${rect.gray}, ${rect.gray}, ${rect.gray})`;
        context.lineWidth = 1;
        context.rect(
          -rect.width / 2,
          -rect.height / 2,
          rect.width,
          rect.height
        );
        context.stroke();
        context.restore();

        rect.x += Math.sin(Date.now() / 1000) * 2;
        rect.y += Math.cos(Date.now() / 1000) * 2;

        // wrap rectangles around canvas edges
        if (rect.x - rect.width > canvas.width) {
          rect.x = -rect.width;
        } else if (rect.x + rect.width < 0) {
          rect.x = canvas.width + rect.width;
        }
        if (rect.y - rect.height > canvas.height) {
          rect.y = -rect.height;
        } else if (rect.y + rect.height < 0) {
          rect.y = canvas.height + rect.height;
        }
      }

      // request next animation frame
      requestAnimationFrame(animate);
    };

    // start the animation loop
    animate();
  },
};
</script>

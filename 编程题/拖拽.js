// draggable.js
function enableDrag(el) {
    let offsetX, offsetY, isDragging = false;
  
    el.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  
    function onMouseMove(e) {
      if (isDragging) {
        el.style.position = 'absolute'
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    }
  
    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }
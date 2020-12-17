(() => {
  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");

  for (let i = 0; i < stepElems.length; i++) {
    stepElems[i].dataset.index = i; // 말풍선마다 고유번호
    graphicElems[i].dataset.index = i;
  }

  window.addEventListener("scroll", () => {
    let step, boundingRect;
    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];

      // 현재 아이템의 위치
      boundingRect = step.getBoundingClientRect();

      // 현재 엘리먼트의 화면 상단부터 값 (.top)이 도구모음 크기 뺀 innerheight * 0.1이 크고
      // 현재 엘리먼트의 화면 상단부터 값이 도구모음 크기를 뺀 innerheight * 0.8보다 작으면
      if (boundingRect.top > window.innerHeight * 0.1 &&
          boundingRect.top < window.innerHeight * 0.8) {

      }
    }
  });
})();

(() => {

  const actions = {
    birdFlies(flag) {
      if (flag) {
        document.querySelector('[data-index="2"] .bird')
        .style.transform= `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector('[data-index="2"] .bird')
        .style.transform= `translateX(-100%)`;
      }
    },
    birdFlies2(flag) {
      if (flag) {
        document.querySelector('[data-index="5"] .bird')
        .style.transform= `translate(${window.innerWidth}px,
          ${-window.innerHeight * 0.7}px)`;
      } else {
        document.querySelector('[data-index="5"] .bird')
        .style.transform= `translateX(-100%)`;
      }
    }
  };

  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = graphicElems[0]; // 현재 활성화된 (visible 클래스가 붙음) .graphic-item을 지정하고있음
  let ioIndex;

  /**
   * 옵저버로 관찰하는 대상인 객체들이 사라지거나 나타날 때 그 시점마다 콜백함수가 실행된다.
   */
  const io = new IntersectionObserver((entries, observer) => {
    // * 1(number로 형변환 -> console 컬러 블랙 -> 블루)
    ioIndex = entries[0].target.dataset.index * 1; 
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]); // 모든 말풍선들이 관찰대상으로 등록된다.
    stepElems[i].dataset.index = i; // 말풍선마다 고유번호
    graphicElems[i].dataset.index = i;
  }

  function activated(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  }

  function inactivated(action) {
    currentItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step, boundingRect;
    // for (let i = 0; i < stepElems.length; i++) { // 전체 말풍선 개수만큼 for
    for (let i = ioIndex-1; i < ioIndex+2; i++) { // 현재 보이는 말풍선만 for문실행
    //      현재인덱스의 바로 전 것 / 현재 엘리먼트 -1, +1 까지
    
      step = stepElems[i];

      if (!step) continue; //step에 값이 없으면 continue로 패스
      // 현재 아이템의 위치
      boundingRect = step.getBoundingClientRect();


      // 말풍선이 화면 높이에서 10퍼센트에서 ~ 80퍼센트 사이에 들어왔을 때
      if (boundingRect.top > window.innerHeight * 0.1 &&
          boundingRect.top < window.innerHeight * 0.8) {
        if (currentItem) { inactivated(currentItem.dataset.action); }
        currentItem = graphicElems[step.dataset.index];
        activated(currentItem.dataset.action);
      }
    }
  });
  
  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100); // x, y방향 0으로 
  });

  activated();

})();

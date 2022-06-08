"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let select = document.querySelector(".form-select");
  select.addEventListener("change", function () {
    let x = Number(select.options[select.selectedIndex].value);

    //  удалить все блоки при выборе нового размера поля
    document.querySelectorAll(".primer").forEach((item) => {
      item.remove();
    });

    // формирование массива с цифрами
    let y = x / 2;
    console.log(x);
    let coob = [];

    for (let i = 1; i <= y; i++) {
      coob.push(i);
      coob.push(i);
    }
    let newCoob = coob.sort(() => Math.random() - 0.5);
    console.log(newCoob);

    // создание блоков
    for (let i = 0; i < x; i++) {
      let primer = document.createElement("div");
      // добавление нового свойства для написания делигирования событий
      primer.myname = "block";
      primer.mynamber = newCoob[i];
      primer.repiat = i + 1;
      primer.textContent = newCoob[i];

      let gamePlace = document.querySelector(".gamePlace");
      primer.classList.add("primer");
      gamePlace.append(primer);
    }
    generetCssStyle();
  });

  // добавление css свйства для разметки
  function generetCssStyle() {
    let x = document.querySelectorAll(".primer");
    let f = x.length;
    let gamePlace = document.querySelector(".gamePlace");
    let y = Math.sqrt(f);
    switch (y) {
      case 2:
        gamePlace.style.cssText = `
          grid-template-columns: repeat(${y}, 50px);`;
        break;
      case 4:
        gamePlace.style.cssText = `
          grid-template-columns: repeat(${y}, 50px);`;
      case 16:
        gamePlace.style.cssText = `
          grid-template-columns: repeat(${y}, 50px);`;
        break;
    }
  }

  //  функция удаления цвета блока при неверном выборе блоков
  function removeClass() {
    let primer = document.querySelectorAll(".primer");
    primer.forEach(function (item) {
      item.classList.remove("grey");
      item.style.color = "rgb(153, 143, 143)";
    });
  }

  // делигирование событий
  let x = [];
  let gamePlace = document
    .querySelector(".gamePlace")
    .addEventListener("click", function (event) {
      if (event.target && event.target.myname == "block") {
        event.target.style.color = "white";
        event.target.classList.add("grey");
        x.push(event.target.mynamber);
        console.log("номер на иконке:" + x);
      }
      // проверка условий при нажатии на блоки
      if (x.length === 2) {
        if (x[0] !== x[1]) {
          console.log("error");
          setTimeout(removeClass, 300);
          x = [];
        } else {
          console.log("ok");
          document.querySelectorAll(".primer").forEach(function (item, i) {
            if (Number(item.mynamber) === x[0]) {
              setTimeout(() => {
                item.style.pointerEvents = "none";
                item.style.opacity = 0;
              }, 300);
            }
            item.repiat = i;
          });
        }
        x = [];
      }
    });

  //перезагрузка страницы при нажатии на кнопку
  let buttonClickReset = document.querySelector(".removeClick");
  buttonClickReset.addEventListener("click", function () {
    location.reload();
  });
});

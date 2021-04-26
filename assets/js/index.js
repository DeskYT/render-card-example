"use strict";

const cardContainer = document.getElementById("root");

const HTMLLIElements = data.map((place) => createPlaceCards(place));

cardContainer.append(...HTMLLIElements);

function createPlaceCards(place) {
  const p = createElement(
    "p",
    { classNames: ["cardDescription"] },
    document.createTextNode(place.description)
  );

  const h3 = createElement(
    "h3",
    { classNames: ["cardName"] },
    document.createTextNode(place.name || "")
  );

  const article = createElement(
    "article",
    { classNames: ["cardContainer"] },
    createImageWrapper(place),
    h3,
    p
  );

  return createElement("li", { classNames: ["cardWrapper"] }, article);
}

function createImageWrapper(place) {
  const { name, id } = place;

  const imageWrapper = document.createElement("div");
  imageWrapper.setAttribute("id", `wrapper${id}`);
  imageWrapper.classList.add("cardImageWrapper");
  imageWrapper.style.backgroundColor = stringToColor(name);

  const initials = document.createElement("div");
  initials.classList.add("initials");
  initials.append(document.createTextNode(name.trim().charAt(0) || ""));

  const image = createImage(place, { className: "cardImage" });

  imageWrapper.append(initials);
  imageWrapper.append(image);
  return imageWrapper;
}

function createImage({ name, profilePicture, id }, { className }) {
  const img = document.createElement("img");
  img.classList.add(className);
  img.dataset.id = id;
  img.setAttribute("alt", name);
  img.setAttribute("src", profilePicture);
  img.addEventListener("error", handleImageError);
  img.addEventListener("load", handleImageLoad);
  return img;
}

/**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {function} options.onClick - click handler
 * @param {Node[]} children
 * @return {HTMLElement}
 */
 function createElement(type, { classNames, onClick }, ...children) {
  const elem = document.createElement(type);
  elem.classList.add(...classNames);
  elem.onclick = onClick;
  elem.append(...children);
  return elem;
}


/* 
  EVENT HANDLERS
*/

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({ target }) {
  target.hidden = false;
}

/* 
  UTILS
*/

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
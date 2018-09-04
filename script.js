/* Changing color */

var container = document.querySelector("#container5");
var zeros = "0000000";
container.addEventListener("click", changeColor, false);
function changeColor(e) {
    var color = "#" + Math.floor(Math.random() *
        0xFFFFFF).toString(16);
    var colorLength = color.length;
    if (colorLength < 7) {
        color += zeros.substring(0, zeros.length - colorLength);
    }
    container.style.backgroundColor = color;
}

/* Creating a Smooth Sliding Menu */

function showMenu(e) {
    flyoutMenu.classList.add("show");

    document.body.style.overflow = "hidden";
}

function hideMenu(e) {
    flyoutMenu.classList.remove("show");
    e.stopPropagation();

    document.body.style.overflow = "auto";
}

var roundButton = document.querySelector("#container8 #roundButton");
roundButton.addEventListener("click", showMenu, false);

var flyoutMenu = document.querySelector("#container8 #flyoutMenu");
flyoutMenu.addEventListener("click", hideMenu, false);


/* Scroll animations */

var isScrolling = false;

//se escucha el evento scroll
window.addEventListener("scroll", throttleScroll, false);

//se crea la funcion para monitorear los cambios en el scroll
function throttleScroll(e) {
    if (isScrolling == false) {
        window.requestAnimationFrame(function () {
            scrolling(e);
            isScrolling = false;
        });
    }
    isScrolling = true;
}

//se monitoria que el dom este creado
document.addEventListener("DOMContentLoaded",
    scrolling,
    false);

//selector de lista
var listItems = document.querySelectorAll(
    "#mainContent ol li");

//selector de cajas
var firstBox = document.querySelector("#firstBox");
var secondBox = document.querySelector("#secondBox");
var box = document.querySelector("#container9");

function scrolling(e) {
    //se verifica si la primera caja es parcialmente visible
    if (isPartiallyVisible(firstBox)) {
        firstBox.classList.add("active");
        box.classList.add("colorOne");
        box.classList.remove("colorTwo");
    } else {
        box.classList.remove("colorOne");
        box.classList.remove("colorTwo");
    }

    //se verifica si la segunda caja es parcialmente visible
    if (isFullyVisible(secondBox)) {
        secondBox.classList.add("active");
        box.classList.add("colorTwo");
        box.classList.remove("colorOne");
    }

    //se verifica si los elementos de la lista son visibles
    for (var i = 0; i < listItems.length; i++) {
        var listItem = listItems[i];
        if (isPartiallyVisible(listItem)) {
            listItem.classList.add("active");
        } else {
            listItem.classList.remove("active");
        }
    }
}

//funcion para verificar si el elemento es parcialmente visible
function isPartiallyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();
    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;
    return ((top + height >= 0) &&
        (height + window.innerHeight >= bottom));
}

//funcion para verificar si el elemento es totalmente visible
function isFullyVisible(el) {
    var elementBoundary = el.getBoundingClientRect();
    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    return ((top >= 0) && (bottom <= window.innerHeight));
}

/* parallax 
var bigYellowCircle = document.querySelector("#bigYellowCircle");
var blueSquare = document.querySelector("#blueSquare");
var greenPentagon = document.querySelector("#greenPentagon");
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, "
        + yPos + "px, 0)";
}
window.addEventListener("DOMContentLoaded", scrollLoop, false);
var xScrollPosition;
var yScrollPosition;
function scrollLoop() {
    xScrollPosition = window.scrollX;
    yScrollPosition = window.scrollY;
    setTranslate(0, yScrollPosition * -0.2, bigYellowCircle);
    setTranslate(0, yScrollPosition * -1.5, blueSquare);
    setTranslate(0, yScrollPosition * .5, greenPentagon);
    requestAnimationFrame(scrollLoop);
}

*/

/* slider */

// just querying the DOM...like a boss!
var links = document.querySelectorAll(".itemLinks");
var wrapper = document.querySelector("#wrapper");

// the activeLink provides a pointer to the currently displayed item
var activeLink = 0;

// setup the event listeners
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);
    
    // identify the item for the activeLink
    link.itemID = i;
}

// set first item as active
links[activeLink].classList.add("active");

function setClickedItem(e) {
    removeActiveLinks();

    var clickedLink = e.target;
    activeLink = clickedLink.itemID;
    
    changePosition(clickedLink);
}

function removeActiveLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
}

// Handle changing the slider position as well as ensure
// the correct link is highlighted as being active
function changePosition(link) {
    var position = link.getAttribute("data-pos");
    wrapper.style.left = position;
    
    link.classList.add("active");
}
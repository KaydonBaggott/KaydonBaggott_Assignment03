//Selects all elements that have the "reveal" class
const items = document.querySelectorAll(".reveal");

//Selects the element where the typing animation will appear
const typingText = document.getElementById("typing-text");

//Stores the message that will be typed onto the page
const message = "Welcome to My Game Development Portfolio";

//Selects the back-to-top button
const topButton = document.getElementById("top-button");



//Function that reveals elements when they enter the screen
function revealItems() {

    items.forEach(function (item) {

        const position = item.getBoundingClientRect().top;

        const screenHeight = window.innerHeight;

        if (position < screenHeight - 50) {

            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealItems);

//Runs the function when the page first loads
revealItems();



//Keeps track of which letter should be displayed next
let letterNumber = 0;

//Function that creates the typing animation
function typeMessage() {

    if (typingText && letterNumber < message.length) {

        typingText.textContent += message.charAt(letterNumber);

        letterNumber++;

        setTimeout(typeMessage, 70);
    }
}

//Starts the typing animation
typeMessage();



//Function that checks the user's scroll position
window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } 

    else {
        topButton.style.display = "none";
    }
});

//Function that runs when the back-to-top button is clicked
topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
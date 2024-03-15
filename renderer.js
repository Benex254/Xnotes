/*----get dom elements----*/

//controls
const font_name = document.getElementById("font-name");

const font_size = document.getElementById("font-size");
const word_spacing = document.getElementById("word-spacing");
const letter_spacing = document.getElementById("letter-spacing");
const line_height = document.getElementById("line-height");

const bold = document.getElementById("btn-bold");
const italic = document.getElementById("btn-italic");
const underline = document.getElementById("btn-underline");

//text box
const text_box = document.getElementById("text");

//color box
const color = document.getElementById("color")
const color_box = document.querySelector(".color-box>div")
const contrast_checker = document.getElementById("contrast-checker")

//alignment stuff
const left = document.getElementById("left")
const center = document.getElementById("center")
const justified = document.getElementById("justified")
const right = document.getElementById("right")


/*----handlers for operations on selected text----*/

const handleBold = (value) => `<bold>${value}</bold>`
const handleItalic = (value) => `<italic>${value}</italic>`
const handleUnderline = (value) => `<span style="text-decoration:underline">${value}</span>`
const handleFontSize = (value, size) => `<span style="font-size:${size}">${value}</span>`
const handleFontName = (value, name) => `<span style="font-name:${name}">${value}</span>`

/*----attatch event listeners----*/

bold.addEventListener("click", (e) => {
    text_box.style.fontWeight = text_box.style.fontWeight == "bold" ? "normal" : "bold";
    bold.classList.contains("btn-on") ? bold.classList.remove("btn-on") : e.target.classList.add("btn-on");

})

italic.addEventListener("click", (e) => {
    text_box.style.fontStyle = text_box.style.fontStyle == "italic" ? "normal" : "italic";
    console.log(e.target)
    italic.classList.contains("btn-on") ? italic.classList.remove("btn-on") : e.target.classList.add("btn-on");
})

underline.addEventListener("click", (e) => {
    text_box.style.textDecoration = text_box.style.textDecoration == "underline" ? "none" : "underline";
    underline.classList.contains("btn-on") ? underline.classList.remove("btn-on") : e.target.classList.add("btn-on");

})


font_name.addEventListener("change", (e) => { text_box.style.fontFamily = e.target.value })
font_size.addEventListener("input", (e) => { text_box.style.fontSize = e.target.value + "px" })
letter_spacing.addEventListener("input", (e) => { text_box.style.letterSpacing = e.target.value + "px" })
line_height.addEventListener("input", (e) => { text_box.style.lineHeight = e.target.value })
word_spacing.addEventListener("input", (e) => { text_box.style.wordSpacing = e.target.value + "px" })


//contrast checker
const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function luminance(r, g, b) {
    var a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, GAMMA);
    });
    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(rgb1, rgb2) {
    var lum1 = luminance(...rgb1);
    var lum2 = luminance(...rgb2);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

var getStyle = function (element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
};

function getRGB(str) {
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
        red: match[1],
        green: match[2],
        blue: match[3]
    } : {};
}

color.addEventListener("input", (e) => {
    text_box.style.color = e.target.value
    color_box.style.backgroundColor = e.target.value
    const rgb2 = getStyle(text_box, "color")
    contrast_checker.value = `Contrast: ${(contrast([41, 41, 41], [getRGB(rgb2)["red"], getRGB(rgb2)["green"], getRGB(rgb2)["blue"]])).toPrecision(2)}`;
})

right.addEventListener("click", (e) => {
    left.classList.contains("btn-on") && left.classList.remove("btn-on");
    justified.classList.contains("btn-on") && justified.classList.remove("btn-on");
    center.classList.contains("btn-on") && center.classList.remove("btn-on");
    right.classList.add("btn-on");

    text_box.style.textAlign = "right"
})
left.addEventListener("click", (e) => {
    right.classList.contains("btn-on") && right.classList.remove("btn-on");
    justified.classList.contains("btn-on") && justified.classList.remove("btn-on");
    center.classList.contains("btn-on") && center.classList.remove("btn-on");
    left.classList.add("btn-on");

    text_box.style.textAlign = "left"
})
center.addEventListener("click", (e) => {
    right.classList.contains("btn-on") && right.classList.remove("btn-on");
    justified.classList.contains("btn-on") && justified.classList.remove("btn-on");
    left.classList.contains("btn-on") && left.classList.remove("btn-on");
    center.classList.add("btn-on");
    text_box.style.textAlign = "center"
})
justified.addEventListener("click", (e) => {
    right.classList.contains("btn-on") && right.classList.remove("btn-on");
    left.classList.contains("btn-on") && left.classList.remove("btn-on");
    center.classList.contains("btn-on") && center.classList.remove("btn-on");
    justified.classList.add("btn-on");
    text_box.style.textAlign = "justified"
})


/*---- important events ----*/

//save file
window.electron.isSaving(() => {
    window.electron.saveFile(text_box.innerText)
})
let button = document.querySelector("button");
button.addEventListener("click", generateGallery);

function generateGallery() {
    let input = document.querySelector("input");
    if (input.files.length == 0) return;
    let files = input.files;
    let i;

    let wrap = document.querySelector(".wrap");
    document.body.removeChild(wrap);

    let slider = document.createElement("div");
    slider.className = "slider";
    document.body.appendChild(slider);

    for (i = 0; i < files.length; i++) {
        let file = files[i];
        let src = URL.createObjectURL(file);
        let name = file.name;
        /*let src = `img/${name}`;*/

        let figure = document.createElement("figure");
        slider.appendChild(figure);

        let figcaption = document.createElement("figcaption");
        let regexp = /.+(?=\.)/;
        name = name.match(regexp);
        figcaption.innerText = name[0];
        figure.appendChild(figcaption);

        let img = document.createElement("img");
        img.src = src;
        figure.appendChild(img);
    }

    let figures = document.querySelectorAll("figure");
    for (i = 0; i < figures.length; i++) {
        let figure = figures[i];
        figure.addEventListener("click", () => {
            generateSlider(figure);
        });
    }

    function generateSlider(figure) {
        darkenBack();

        function darkenBack() {
            if (document.querySelector(".darken") == null) {
                let div = document.createElement("div");
                div.className = "darken";
                document.body.appendChild(div);
            } else {
                let div = document.querySelector(".darken");
                document.body.removeChild(div);
            }
        }

        for (i = 0; i < figures.length; i++) {
            if (figures[i].hasAttribute("style")) {
                figures[i].removeAttribute("style");
            } else {
                figures[i].setAttribute(
                    "style",
                    "margin: 0; width: auto; position: absolute; opacity: 0;"
                );
            }
        }

        if (figure.hasAttribute("style")) {
            figure.style.opacity = 1;
            generateButtons();
        } else generateButtons();

        function generateButtons() {
            if (document.querySelector(".buttons") == null) {
                let buttons = document.createElement("div");
                buttons.className = "buttons";
                slider.appendChild(buttons);

                let leftButton = document.createElement("button");
                leftButton.className = "button left";
                let leftImg = document.createElement("img");
                leftImg.src =
                    "https://harryheman.github.io/imageGallerySliderMaker/assets/left.svg";
                leftButton.appendChild(leftImg);
                buttons.appendChild(leftButton);
                leftButton.addEventListener("click", () => changeSlide("-"));

                let rightButton = document.createElement("button");
                rightButton.className = "button right";
                let rightImg = document.createElement("img");
                rightImg.src =
                    "https://harryheman.github.io/imageGallerySliderMaker/assets/right.svg";
                rightButton.appendChild(rightImg);
                buttons.appendChild(rightButton);
                rightButton.addEventListener("click", () => changeSlide("+"));

                let closeButton = document.createElement("button");
                closeButton.className = "button close";
                let closeImg = document.createElement("img");
                closeImg.src =
                    "https://harryheman.github.io/imageGallerySliderMaker/assets/close.svg";
                closeButton.appendChild(closeImg);
                buttons.appendChild(closeButton);
                closeButton.addEventListener("click", () => generateSlider(figure));
            } else {
                let buttons = document.querySelector(".buttons");
                slider.removeChild(buttons);
            }
        }

        function changeSlide(e) {
            for (i = 0; i < figures.length; i++) {
                figures[i].style.opacity = 0;
            }
            if (e == "-") {
                if (figure == figures[0]) {
                    figure = figures[figures.length - 1];
                } else {
                    figure = figure.previousElementSibling;
                }
            } else if (e == "+") {
                if (figure == figures[figures.length - 1]) {
                    figure = figures[0];
                } else {
                    figure = figure.nextElementSibling;
                }
            }
            figure.style.opacity = 1;
        }

        document.addEventListener("keydown", e => {
            if (e.keyCode == 37 || e.keyCode == 189) {
                changeSlide("-");
            } else if (e.keyCode == 39 || e.keyCode == 187) {
                changeSlide("+");
            } else if (e.keyCode == 27) {
                generateSlider(figure);
            }
        });
    }
}

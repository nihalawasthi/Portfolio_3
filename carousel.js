(function () {
    "use strict";
    
    const projects = [
        { name: "Phablet", img: "public/phablet.png", src: "https://phablet.onrender.com/", target: "none" },
        { name: "Blog API", img: "public/blog.png", src: "https://github.com/nihalawasthi/Blog_api", target: "blank" },
        { name: "Weather App", img: "public/weather.png", src: "https://weather-app-32.vercel.app/", target: "none" },
        { name: "ToDo App", img: "public/todo.png", src: "https://github.com/nihalawasthi/ToDo", target: "blank" },
        { name: "Pokedex", img: "public/pokedex.png", src: "https://nihalawasthi.github.io/Pokedex/", target: "none" },
        { name: "OmniNexus", img: "public/omni.png", src: "https://nihalawasthi.github.io/OmniNexus/", target: "none" },
        { name: "Portfolio (2nd Year)", img: "public/me.png", src: "https://nihalawasthi.netlify.app/", target: "none" },
        { name: "Operation Smile", img: "public/smile.png", src: "https://nihalawasthi.github.io/OperationSmile/", target: "none" },
        { name: "Upwan Infra", img: "public/upwan.png", src: "https://www.upwaninfra.com/home/", target: "none" },
        { name: "Wednesday", img: "public/wed.png", src: "https://github.com/nihalawasthi/Wednesday", target: "blank" }
    ];

    const slider = document.getElementsByClassName('slider')[0];
    var iframe = document.getElementById('project-iframe');
    
    function createSliderItems() {
        slider.style.setProperty('--quantity', projects.length); // Dynamically set the number of slides

        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'item';
            item.style.setProperty('--position', index + 1);
            const hrefValue = project.target === "blank" ? project.src : "#frame";

            item.innerHTML = `
                <a href="${hrefValue}" target="${project.target === 'blank' ? '_blank' : '_self'}" data-src="${project.src}">
                    <img src="${project.img}" alt="${project.name}">
                </a>
            `;

            slider.appendChild(item);
        });
    }

    function bindEvents() {
        slider.addEventListener('click', function (e) {
            let target = e.target;
            while (target !== slider && target.tagName !== 'A') {
                target = target.parentNode;
            }
            if (target && target.tagName === 'A') {
                iframe.src = target.getAttribute('data-src');
            }
        });
    }

    function init() {
        createSliderItems();
        bindEvents();
        autoSlide();
    }

    // Automatic sliding logic
    var currIndex = 0;
    function autoSlide() {
        setInterval(() => {
            currIndex = (currIndex + 1) % projects.length;
            slider.style.transform = `translateX(${(-currIndex * 100)}%)`;
        }, 3000); // Adjust the timing here (3000ms for 3 seconds)
    }

    init();
})();

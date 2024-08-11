(function() {
    "use strict";
  
    const projects = [
        { name: "Phablet", img: "public/phablet.png", src: "https://phablet.onrender.com/", traget: "none"},
        { name: "Blog API", img: "public/blog.png", src: "https://github.com/nihalawasthi/Blog_api", traget: "blank"},
        { name: "Weather App", img: "public/weather.png", src: "https://weather-app-32.vercel.app/", traget: "none"},
        { name: "ToDo App", img: "public/todo.png", src: "https://github.com/nihalawasthi/ToDo", traget: "blank"},
        { name: "Pokedex", img: "public/pokedex.png", src: "https://nihalawasthi.github.io/Pokedex/", traget: "none"},
        { name: "OmniNexus", img: "public/omni.png", src: "https://nihalawasthi.github.io/OmniNexus/", traget: "none"},
        { name: "Portfolio (2nd Year)", img: "public/me.png", src: "https://nihalawasthi.netlify.app/", traget: "none"},
        { name: "Operation Smile", img: "public/smile.png", src: "https://nihalawasthi.github.io/OperationSmile/", traget: "none"},
        { name: "Upwan Infra", img: "public/upwan.png", src: "https://www.upwaninfra.com/home/", traget: "none"},
        { name: "Wednesday", img: "public/wed.png", src: "https://github.com/nihalawasthi/Wednesday", traget: "blank"},
        { name: "More", img: "public/more.png", src: "https://github.com/nihalawasthi/", traget: "blank"}
    ];

    var carousel = document.getElementsByClassName('carousel')[0],
        slider = carousel.getElementsByClassName('carousel__slider')[0],
        prevBtn = carousel.getElementsByClassName('carousel__prev')[0],
        nextBtn = carousel.getElementsByClassName('carousel__next')[0],
        iframe = document.getElementById('project-iframe');
    
    var width, height, totalWidth, margin = 20,
        currIndex = 0
    
    function init() {
        createCarouselItems();
        resize();
        move(1);
        bindEvents();
        timer();
    }

    function createCarouselItems() {
        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'carousel__slider__item';
            
            const hrefValue = project.traget === "blank" ? project.src : "#frame";
            
            item.innerHTML = `
                <div class="item__3d-frame">
                    <a href="${hrefValue}" target="${project.traget === 'blank' ? '_blank' : '_self'}" data-src="${project.src}">
                        <div class="item__3d-frame__box item__3d-frame__box--front" style="background: url('${project.img}') no-repeat black; background-size: contain; cursor: pointer;">
                        <h2>${project.name}</h2>
                        </div>
                    </a>
                    <div class="item__3d-frame__box item__3d-frame__box--left"></div>
                    <div class="item__3d-frame__box item__3d-frame__box--right"></div>
                </div>
            `;
            slider.appendChild(item);
        });
    }
    
    function resize() {
        width = Math.max(window.innerWidth * .25, 275),
        height = window.innerHeight * .5,
        totalWidth = width * projects.length;
      
        slider.style.width = totalWidth + "px";
      
        const items = carousel.getElementsByClassName('carousel__slider__item');
        for(var i = 0; i < items.length; i++) {
            let item = items[i];
            item.style.width = (width - (margin * 2)) + "px";
            item.style.height = height + "px";
        }
    }
    
    function move(index) {
        const items = carousel.getElementsByClassName('carousel__slider__item');

        if(index < 1) index = items.length;
        if(index > items.length) index = 1;
        currIndex = index;
      
        for(var i = 0; i < items.length; i++) {
            let item = items[i],
                box = item.getElementsByClassName('item__3d-frame')[0];
            if(i == (index - 1)) {
                item.classList.add('carousel__slider__item--active');
                box.style.transform = "perspective(1200px)"; 
            } else {
              item.classList.remove('carousel__slider__item--active');
                box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
            }
        }
      
        slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
    }
    
    function prev() {
      move(--currIndex);
      timer();
    }
    
    function next() {
      move(++currIndex);    
      timer();
    }
    
    function bindEvents() {
        window.onresize = resize;
        prevBtn.addEventListener('click', () => { prev(); });
        nextBtn.addEventListener('click', () => { next(); });    
        slider.addEventListener('click', function(e) {
            let target = e.target;
            while (target !== slider && target.tagName !== 'A') {
                target = target.parentNode;
            }
            if (target && target.tagName === 'A') {
                iframe.src = target.getAttribute('data-src');
            }
        });
        
    }
  
    init();
})();

let animationPlayed = false;

var DateDiff = {
 
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return Math.floor((t2-t1)/(24*3600*1000));
    },
 
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return parseInt((t2-t1)/(24*3600*1000*7));
    },
 
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
 
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
 
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

var bg_colors = {
    custom1 : { light: "#436850", dark: "#12372A"},
    custom2 : { light: "#474F7A", dark: "#1F2544"},
    custom3 : { light: "#40679E", dark: "#1B3C73"},
    custom4 : { light: "#2D9596", dark: "#265073"},
    custom5 : { light: "#436850", dark: "#12372A"},
    custom6 : { light: "#FC6736", dark: "#0C2D57"},
    custom7 : { light: "#59B4C3", dark: "#211C6A"},
    custom8 : { light: "#944E63", dark: "#0D9276"},
    custom9 : { light: "#B19470", dark: "#43766C"},
}

var bg_color_light = "";
var bg_color_dark = "";

function getRandomGradient()
{
    let random_bg = Math.floor(Math.random() * Object.keys(bg_colors).length)

    bg_color_light = Object.values(bg_colors)[random_bg].light;
    bg_color_dark = Object.values(bg_colors)[random_bg].dark;

    return "linear-gradient(180deg, "+ Object.values(bg_colors)[random_bg].light +" 51%, "+ Object.values(bg_colors)[random_bg].dark +" 100%)"
}


function setBgColor()
{
    let random_gradient = getRandomGradient();
    this.document.querySelector(".bg").style.background = random_gradient;
    this.document.querySelector(".contact").style.background = bg_color_light;
    this.document.getElementsByTagName('body')[0].style.background = bg_color_dark;

}

function computeWorkDate()
{
    let work_dates = this.document.querySelectorAll(".work-date")

    console.log(work_dates)

    work_dates.forEach((item, index) => {
       temp_date =  item.innerHTML.split("-")

        let date1 = new Date(temp_date[0]);
        let date2 = new Date(temp_date[1]);

        let yr =  DateDiff.inYears(date1, date2);

        let yr_str = yr > 1 ? "years" : "year"; 

        this.document.querySelectorAll(".work-date-diff")[index].innerHTML = yr + " " + yr_str 

    })
}

function fadeTextImage(scrollValue)
{  
    let num = scrollValue;
    //for fading text
    let intro_paragraphs =  this.document.querySelectorAll('.introduction .flex-box .text-img-box p');
    
    intro_paragraphs.forEach((item) => item.style.opacity = num * .99)

    const myselfImg =  this.document.querySelector('.introduction .flex-box .text-img-box .img .myself-img');
    
    
    if(num >= 0.45)
    {
        if(!animationPlayed)
        {
            myselfImg.style.animation =  "fade 1s, slideToLeft 1s";
            animationPlayed = true;
        }
       
    }
    
    if(animationPlayed)
        {
            myselfImg.style.opacity = num * .98;
            myselfImg.style.animationFillMode = "none";
        }
}

class Timer {
    constructor(fn, t) {
        var timerObj = setInterval(fn, t);

        this.stop = function () {
            if (timerObj) {
                clearInterval(timerObj);
                timerObj = null;
            }
            return this;
        };

        // start timer using current settings (if it's not already running)
        this.start = function () {
            if (!timerObj) {
                this.stop();
                timerObj = setInterval(fn, t);
            }
            return this;
        };

        // start with new or original interval, stop current interval
        this.reset = function (newT = t) {
            t = newT;
            return this.stop().start();
        };
    }
}


function imageCarousel(itemList, btnPrevSelect, btnNextSelect)
{
    let imgIndex = 0;

    let btnPrev = this.document.querySelector(btnPrevSelect);
    let btnNext = this.document.querySelector(btnNextSelect);

    let imgItems =  this.document.querySelectorAll(itemList);

    function playCarousel(isClicked)  {
        if(!isClicked) imgIndex = imgIndex + 1 >= imgItems.length  ? 0 : imgIndex += 1;
        
        imgItems.forEach((item) => {
            item.style.display = 'none';
            item.style.animation = 'fade 1s';
        })
    
        imgItems[imgIndex].style.display = 'block';
    }

    var timer = new Timer(playCarousel, 2500);

    btnPrev.addEventListener("click", () => {
        imgIndex = imgIndex - 1 < 0  ? imgItems.length - 1 : imgIndex -= 1;  
        playCarousel(true);

        timer.stop();
        timer.reset(2500);
    })

    btnNext.addEventListener("click", () => {
        imgIndex = imgIndex + 1 >= imgItems.length  ? 0 : imgIndex += 1;
        playCarousel(true);

        timer.stop();
        timer.reset(2500);
    })

    playCarousel(true);
    timer.start();
    
}

function displayNav(num){
    const nav =  this.document.querySelector('.nav');
    // nav.style.backgroundColor = bg_color_light;

    let bottomOffset = document.body.offsetHeight - (this.window.innerHeight + Math.round(this.window.scrollY));

    if(bottomOffset <= 150) {
        nav.style.display = "none";
        nav.style.opacity = 0; 
    }else{
        nav.style.opacity = num * .99; 

        if(num <= 0.5){
            nav.style.display = "none";
        }else{
            nav.style.display = "block";
        }
        
    }
}

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(".container").style.display = "none";
    } else {
        document.querySelector(".container").style.display = "block";
        document.querySelector(".loading-container").style.display = "none";
    }
};


window.addEventListener("DOMContentLoaded", function() {   
    setBgColor();
    computeWorkDate();

    imageCarousel('.image-item', '.img-btn-prev', '.img-btn-next');
    // document.querySelector(".loader").style.color = bg_color_light;
    // document.querySelector(".loader").style.background = bg_color_light;
}); 


window.addEventListener('scroll', function() {
    let num = this.window.scrollY / this.window.innerHeight;

    fadeTextImage(num);
    displayNav(num);

    // this.document.getElementById('ctr-text').innerHTML = "Counter : " + num;

    this.document.getElementById("intro-title").style.scale = num;
    this.document.getElementById("intro-text").style.scale = num + 1;
})
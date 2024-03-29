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
    custom7 : { light: "#944E63", dark: "#0D9276"},
    custom7 : { light: "#B19470", dark: "#43766C"},
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


function imageCarousel(itemList)
{
    var imgIndex = 0;

    function playCarousel()  {
        let imgItems =  this.document.querySelectorAll(itemList);

        imgItems.forEach((item) => {
            item.style.display = 'none';
            item.style.animation = 'fade 1s';
        })
    
        imgItems[imgIndex].style.display = 'block';
        
        imgIndex = imgIndex +1 >= imgItems.length  ? 0 : imgIndex += 1;
    }

    setInterval(playCarousel, 2000, itemList);
    
}

window.addEventListener("DOMContentLoaded", function() {   
    setBgColor();
    computeWorkDate();

    imageCarousel('.image-item')
  
}); 


window.addEventListener('scroll', function() {
    let num = this.window.scrollY / this.window.innerHeight;

    fadeTextImage(num);

    // this.document.getElementById('ctr-text').innerHTML = "Counter : " + num;

    this.document.getElementById("intro-title").style.scale = num;
    this.document.getElementById("intro-text").style.scale = num + 1;
})
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

window.addEventListener("DOMContentLoaded", function() {   
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
}); 


window.addEventListener('scroll', function() {
    let num = this.window.scrollY / this.window.innerHeight;

    // this.document.getElementById('ctr-text').innerHTML = num;
  
    // introduction

    //for fading text
    let intro_paragraphs =  this.document.querySelectorAll('.introduction .flex-box .text-img-box p');
    intro_paragraphs.forEach((item) => item.style.opacity = num * .95)

     //for fading images
    let img_items = this.document.querySelectorAll('.introduction .flex-box .text-img-box .img img');

    
    if(num >= 0.75)
    {
        if(!animationPlayed)
        {
            img_items.forEach((item, index) => {
                if(index % 2 == 0)
                {
                    item.style.animation =  "fade 1s, slideToLeft 1s";
                }else
                {
                    item.style.animation =  "fade 1s, slideToRight 1s";
                    
                }
                item.style.animationFillMode =  "forwards";
               })
               animationPlayed = true;
        }
       
    }else
    {
        if(animationPlayed)
        {
            img_items.forEach((item, index) => {
                item.style.opacity =  num;
                item.style.animationFillMode =  "none";
            })
        }
    }

    this.document.getElementById("intro-title").style.scale = num;
    this.document.getElementById("intro-text").style.scale = num + 1;
    this.document.getElementById("contact").style.scale = num * .5;

    // Work Date
    // const work_date = this.document.getElementById("work-date").innerHTML.split("-")
    // let date1 = new Date(work_date[0]);
    // let date2 = new Date(work_date[1]);

    // let yr =  DateDiff.inYears(date1, date2);

    // this.document.getElementById("work-date-diff").innerHTML = yr + "year/s"
    

    // work image
})
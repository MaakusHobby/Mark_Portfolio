let animationPlayed = false;

window.addEventListener('scroll', function() {
    let num = this.window.scrollY / this.window.innerHeight;

    this.document.getElementById('ctr-text').innerHTML = num;
  
    // introduction

    //for fading text
    let intro_paragraphs =  this.document.querySelectorAll('.introduction .flex-box .text-img-box p');
    intro_paragraphs.forEach((item) => item.style.opacity = num * .95)

     //for fading images
    let img_items = this.document.querySelectorAll('.introduction .flex-box .text-img-box .img img');

    
    if(num >= 0.9)
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



    // work image
})
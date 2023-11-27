const positions = [
    { top: "0%", left:"0%" },
    { top: "0%", left:"10%" },
    { top: "0%", left:"60%" },
    { top: "16%", left:"15%" },
    { top: "16%", left:"40%" },
    { top: "16%", left:"90%" },
    { top: "32%", left:"50%" },
    { top: "32%", left:"75%" },
    { top: "48%", left:"0%" },
    { top: "64%", left:"30%" },
    { top: "64%", left:"50%" },
    { top: "64%", left:"90%" },
    { top: "64%", left:"20%" },
    { top: "80%", left:"70%" },
];

const imgs = document.querySelector(".img");

gsap.set(".img",{
    top:"45%",
    left:"50%",
    transform:"translate(-50%, -50%) scale(0)",
});

gsap.from("p",{
    y:40,
    ease:"power4.inOut",
    duration: 1,
    stagger:{
        amount:0.15
    },
    delay: 0.5,
});

gsap.to(".img",{
    scale:1,
    width:"300px",
    height:"400px",
    stagger:0.15,
    duration:0.75,
    ease:"power2.out",
    delay:1,
    onComplete:scatterAndShrink,
});

gsap.to("p",{
    top:"40px",
    ease:"power4.inOut",
    duration:1,
    stagger:{
        amount:0.15
    },
    delay:3,
    onComplete: () => {
        document.querySelector(".header").remove();
    },
});

gsap.from("a",{
    y:20,
    opacity:0,
    ease:"power2.out",
    duration:1,
    stagger:{
        amount:0.15
    },
    delay:4,
});

function scatterAndShrink(){
    gsap.to(".img",{
        top:(i) => positions[i].top,
        left:(i) => positions[i].left,
        transform:"none",
        width:"75px",
        height:"100px",
        stagger:0.075,
        duration:0.75,
        ease:"powerr2.out",
    })
}

function applyBlurEffect(){
    const elementsToBlur = document.querySelector('.nav, .footer, .header, .text,.img:not([data-enlarged="true"])');
    gsap.to(elementsToBlur,{
        filter:'blur(20px)',
        duration:0.75,
        ease:"power2.out"
    });
}

function removeBlurEffect(){
    const elementsToBlur = document.querySelector('.nav, .footer, .header, .text,.img:not([data-enlarged="true"])');
    gsap.to(elementsToBlur,{
        filter:'blur(0px)',
        duration:1,
        ease:"power2.out"
    });
}

function toggleImageSize(event) {
    const img = event.currentTarget;
    const isEnlarged = img.getAttribute('data-enlarged') === 'true';
    const originalPosition = JSON.parse(img.getAttribute('data-original-position'));
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if(!isEnlarged){
        const enlargedWidth = 500;
        const enlargedHeight = 600;
        const centerdLeft = (viewportWidth - enlargedWidth) /2;
        const centerdTop = (viewportHeight - enlargedHeight) /2;
        const topCorrection = 75;
        const correctedTop = centerdTop - topCorrection;

        gsap.to(img,{
            zIndex:1000,
            top:centerdTop + 'px',
            left:centerdLeft + 'px',
            width:enlargedWidth + 'px',
            height:enlargedHeight + 'px',
            ease:"power4.out",
            duration:1,
        });
        img.setAttribute('data-enlarged','true');
        applyBlurEffect();
    } else{
        setTimeout(()=> removeBlurEffect(), 100);

        gsap.to(img,{
            top:originalPosition.top,
            left:originalPosition.left,
            width:'75px',
            height:'100px',
            ease:"power4.out",
            duration:1
        });
        img.setAttribute('data-enlarged','false');
    }
}

imgs.forEach((img, i) => {
    img.setAttribute('data-original-position', JSON.stringify(positions[i]));
    img.setAttribute('data-enlarged', 'false');
    img.addEventListener('click', toggleImageSize);
})
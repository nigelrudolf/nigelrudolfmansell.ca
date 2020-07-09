const portfolioApp = {};

portfolioApp.setWelcomeHeight = () => {
    let boxHeight = $('.box').height();
    let boxOffset = parseInt($('.box').css('top'), 10);

    let imageHeight = $('.box img').height();
    let imageOffset = parseInt($('.box img').css('top'), 10);

    let welcomeHeight = (boxHeight + boxOffset + (imageHeight - boxHeight) + imageOffset) + "px";

    $('.welcome').css('height', welcomeHeight);
}


portfolioApp.init = () => {
    portfolioApp.setWelcomeHeight();

    $( window ).on('resize', function(){
        portfolioApp.setWelcomeHeight();
    })
    
}

$(document).ready(function(){
    portfolioApp.init();
});
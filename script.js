const portfolioApp = {};

portfolioApp.state = {
    navIsVisible: false,
}

// Changes the navigation type to mobile or desktop
// depending on screen width
portfolioApp.toggleNavigationType = () => {
    const tabletBreakPoint = 768;
    $( window ).on('resize', function(){
        if( $( window ).width() < tabletBreakPoint ) {
           $('.header-nav').addClass('sr-only'); 
           $('.mobile-menu-button').removeClass('sr-only');
        } else {
            $('.header-nav').removeClass('sr-only');
            $('.mobile-menu-button').addClass('sr-only');

            // clearing toggleMobileNavigation effects
            $('.header-nav').removeClass('slide-in-bottom slide-out-bottom');
        }
    }).resize();
}

portfolioApp.toggleMobileNavigation = () => {    
    $('.header-nav').toggleClass(function(){
        if ( $( this ).hasClass('slide-in-bottom') ) {
            return (
                $( this ).addClass('slide-out-bottom').removeClass('slide-in-bottom')
            )
        } else {
            return (
                $( this ).addClass('slide-in-bottom').removeClass('sr-only slide-out-bottom')
            )
        }
    });
}

// Dynamically sets the .welcome element height
portfolioApp.setWelcomeHeight = () => {
    let boxHeight = $('.box').height();
    let boxOffset = parseInt($('.box').css('top'), 10);
 
    let imageHeight = $('.box img').height();
    let imageOffset = parseInt($('.box img').css('top'), 10);

    let welcomeHeight = (boxHeight + boxOffset + (imageHeight - boxHeight) + imageOffset) + "px";

    $('.welcome').css('height', welcomeHeight);
}

portfolioApp.init = () => {
        portfolioApp.toggleNavigationType();

        $('.mobile-menu-button').on('click', function(){
            portfolioApp.toggleMobileNavigation();
        });

        $( window ).on('resize', function(){
            portfolioApp.setWelcomeHeight();
        });    
}

$(document).ready(function(){
    portfolioApp.init();
});

$( window ).on('load', function(){
    portfolioApp.setWelcomeHeight();
});
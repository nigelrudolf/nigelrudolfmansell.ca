/*eslint-disable*/ 
const portfolioApp = {};

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
                $( this ).addClass('slide-out-bottom').removeClass('slide-in-bottom'),
                setTimeout(function(){
                    $( '.header-nav' ).css('height', "")
                    .removeClass('slide-out-bottom')
                    .addClass('sr-only')
                    .removeAttr('style');
                    $( 'body' ).removeClass('fixed-menu')
                    .removeAttr('class');
                }, 501)
            )
        } else {
            return (
                $( this ).addClass('slide-in-bottom').removeClass('sr-only slide-out-bottom'),
                $( this ).css('height', "100vh"),
                $( 'body' ).addClass('fixed-menu')
            )
        }
    });
}

// Dynamically sets the .welcome element height
portfolioApp.setWelcomeHeight = () => {
    const tabletBreakPoint = 768;

    if ( $( window ).width() < tabletBreakPoint ) {

        let greetingHeight = $('.greeting').height();
        let greetingMargin = parseInt($('.greeting').css('margin-bottom'), 10);
        let boxHeight = $('.box').height();

        let welcomeHeight = greetingHeight + greetingMargin + boxHeight;

        $('.welcome-section').css('height', welcomeHeight);

    } else if ( $( window ).width() > tabletBreakPoint ) {
        let boxHeight = $('.box').height();
        let boxOffset = parseInt($('.box').css('top'), 10);
    
        let imageHeight = $('.box img').height();
        let imageOffset = parseInt($('.box img').css('top'), 10);

        let welcomeHeight = (boxHeight + boxOffset + (imageHeight - boxHeight) + imageOffset) + "px";

        $('.welcome-section').css('height', welcomeHeight);
    }
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
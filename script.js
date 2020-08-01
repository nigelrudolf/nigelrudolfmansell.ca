/*eslint-disable*/ 
const portfolioApp = {};

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

portfolioApp.toggleMobileNavigation = (timer = 501) => {    
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
                }, timer)
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

portfolioApp.mobileMenuSelect = () => {
    const tabletBreakPoint = 768;
    let width = window.innerWidth;
    // toggleMobileNavigation will lock screen when larger than tabletBreakPoint
    width < tabletBreakPoint ? portfolioApp.toggleMobileNavigation(0) : null;
}

// encodeEmail(), decodeEmail(), updateAnchor() by:
// https://devsday.ru/blog/details/16449
portfolioApp.decodeEmail = (encodedString) => {
    // Holds the final output
    let email = ""; 

    // Extract the first 2 letters
    let keyInHex = encodedString.substr(0, 2);

    // Convert the hex-encoded key into decimal
    let key = parseInt(keyInHex, 16);

    // Loop through the remaining encoded characters in steps of 2
    for (let n = 2; n < encodedString.length; n += 2) {

        // Get the next pair of characters
        let charInHex = encodedString.substr(n, 2)

        // Convert hex to decimal
        let char = parseInt(charInHex, 16);

        // XOR the character with the key to get the original character
        let output = char ^ key;

        // Append the decoded character to the output
        email += String.fromCharCode(output);
    }
    return email;
}

portfolioApp.updateAnchor = (el) => {
    // fetch the hex-encoded string
    let encoded = el.target.dataset.key;

    // decode the email, using the decodeEmail() function from before
    let decoded = portfolioApp.decodeEmail(encoded);

    // Set the link to be a "mailto:" link
    el.target.href = 'mailto:' + decoded;
}

portfolioApp.updateCopyright = () => {
    let today = new Date();
    let year = today.getFullYear();

    document.querySelector('.copyright').innerHTML = year + ' Nigel Mansell';
}

portfolioApp.init = () => {
        portfolioApp.toggleNavigationType();

        $('.mobile-menu-button').on('click', function(){
            portfolioApp.toggleMobileNavigation();
        });

        document.querySelectorAll('.header-nav-links li').forEach((link)=>{
            link.addEventListener('click', portfolioApp.mobileMenuSelect);
        });

        $( window ).on('resize', function(){
            portfolioApp.setWelcomeHeight();
        });

        document.querySelector('.hire-me').addEventListener('click', function(e){
            portfolioApp.updateAnchor(e);
        });

        portfolioApp.updateCopyright();
}

$(document).ready(function(){
    portfolioApp.init();
});

$( window ).on('load', function(){
    portfolioApp.setWelcomeHeight();
});
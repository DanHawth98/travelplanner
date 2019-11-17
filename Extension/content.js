var waitForResults = function () {

    if( $('.FlightsDayView_results__1kZSn').length == true ) {
        var elm = $('.FlightsDayView_results__1kZSn div .Results_dayViewItems__3dVwy');
        watchList( elm[0] );
    } else {
        return false;
    }

}

function watchList( watchElm ) {
    alert(showingTimer);
    clearInterval( showingTimer );

    const targetNode = watchElm;

    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        /* for(let mutation of mutationsList) {
            console.log(mutation);
        } */
        addIconToListings();
    };

    //BpkTicket_bpk-ticket__Brlno

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // addIconToListings();

}


function addIconToListings() {


}

// Init Script
var showingTimer =  setInterval( waitForResults, 1000 );
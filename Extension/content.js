var waitForResults = function () {

    if( $('.FlightsDayView_results__1kZSn').length == true ) {
        var elm = $('.FlightsDayView_results__1kZSn div .Results_dayViewItems__3dVwy');
        watchList( elm[0] );
    } else {
        return false;
    }

}

function watchList( watchElm ) {
    
    clearInterval( showingTimer );

    addIconToListings();

    const targetNode = watchElm;

    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            var newElm = mutation.previousSibling;
            addIconToListings();
        }
    };

    //BpkTicket_bpk-ticket__Brlno

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    
}

function addIconToListings() {

    $('.EcoTicketWrapper_itineraryContainer__1VGlu .BpkTicket_bpk-ticket__paper__2gPSe.BpkTicket_bpk-ticket__stub__UMQSf').each(function(){
        if( !$(this).hasClass('addicon-added') ) {
            $(this).addClass('addicon-added').append('<div class="travel-add-flight">+</p>');
        }
    });

}

// Init Script
var showingTimer =  setInterval( waitForResults, 1000 );

$(document).on( 'click', '.travel-add-flight', function(e){

    e.preventDefault();

    var clickedElm = $(this);
    var parentElm = $(clickedElm).closest('.EcoTicketWrapper_itineraryContainer__1VGlu');

    var flightInfoArray = {};
    var postdata = {};

    // First setup array for the data to be submited
    // We will seperate this into mulitple legs
    $(parentElm).find(' .LegDetails_container__11hQT').each(function( key ) {

        var airline = $(this).find('.BpkImage_bpk-image__img__3HwXN').attr('alt');
        if( airline == false || airline == null ) {
            airline = $(this).find('.LegLogo_logoContainer__1LVpw span').text();
        }

        var dep_date = $('.searchDate-KNam4 .containerReturn-3xU6Z:nth-child(' + ( key + 1 ) + ') input').val();
        var dep_time = $(this).find('.LegInfo_routePartialDepart__37kr9 .LegInfo_routePartialTime__2HfzB span').text();
        var dep_airport = $(this).find('.LegInfo_routePartialDepart__37kr9 .LegInfo_routePartialCityTooltip__ZqOZK').text();
        var arv_time = $(this).find('.LegInfo_routePartialArrive__ZsZxc .LegInfo_routePartialTime__2HfzB span').text();
        var arv_airport = $(this).find('.LegInfo_routePartialArrive__ZsZxc .LegInfo_routePartialCityTooltip__ZqOZK').text();
        var flight_time = $(this).find('.LegInfo_stopsContainer__1XNWn .Duration_duration__1QA_S').text();
        var stops = {};

        $(this).find('.LegInfo_stopsLabelContainer__2dEdt .LegInfo_stopStation__Ec5OU').each(function( stopKey ) {

            stops[stopKey] = $(this).find('span').text();

        } );

        var legObj = {
            airline : airline,
            dep_date : dep_date,
            dep_time : dep_time,
            dep_airport : dep_airport,
            arv_time : arv_time,
            arv_airport : arv_airport,
            flight_time : flight_time,
            stops : stops,
        };

        flightInfoArray[key] = legObj;

    } );

    var link = location.protocol + '//' + location.host + location.pathname + $(parentElm).find('a.FlightsTicket_link__kl4DL').attr('href');
    postdata = { link : link, flights : flightInfoArray };


    $.post( 'http://localhost/exten_submit/test.php', postdata, function(data){

        console.log(data);

        $(clickedElm).addClass('addicon-item-added').text('-');

    });

});
//Special thanks to Andrew Chavez for putting up with my endless questions during the development of this app

var $container;

function initialize() {
        var query = "SELECT Name, Committee, Classification, 'Legislation Authored', Photo, Position, Office FROM " +
            '1mQXVY2fdbKqduhwyRpzywqqnfdS27k2YnBXAP9NE';
        var encodedQuery = encodeURIComponent(query);
        
        

        // Construct the base URL
        var url = ['https://www.googleapis.com/fusiontables/v1/query'];
        url.push('?sql=' + encodedQuery);
        url.push('&key=AIzaSyBpucsUNf8LQ9VMFS-9E_zRcdhcFlrNm4U');
        url.push('&callback=?');

        // Send JSONP request using jQuery
        $.ajax({
          url: url.join(''),
          dataType: 'jsonp',
          success: function (data) {
            var rows = data['rows'];
            
            for (var i in rows) {
            	              
              var panel = "panel" + i;
              
              var candidateOffice = rows[i][6];
              	
              
              //Create the panel and append it to div#panel-container, add data attribute for filtering. 
              $('<div></div>').attr({"id": panel, "data-office": candidateOffice}).addClass('panel panel-default').appendTo('#panel-container');
              
              panel = '#' + panel; //What does this do again?
              
              $(panel).data("office", candidateOffice);
              
              var office = "office" + i;                  
              
              //Create panel header for candidate name
              $('<div></div>').addClass('panel-heading').appendTo(panel);
              
              
              //Create panel body for candidate info
              $('<div></div>').addClass('panel-body').appendTo(panel);
              
              //Wrap panels in a div that allows it to function inside the Bootstrap grid
              $(panel).wrap('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 item"></div>');
              
              var name = rows[i][0];
              var $namevar = $('<h3 class="panel-title"></h3>');
              $namevar.text(name).appendTo(panel + " .panel-heading");
              
              	//Place FontAwesome Double Angle Right icon after candidate name 
              	//$("<span> <i class='fa fa-angle-double-right'></i></span>").appendTo($namevar);
              
              var photo = rows[i][4];
              var $photovar = $('<img />');
              $photovar.attr({src: "//assets.tcu360.com/sgaelections2014/headshots/" + photo}).addClass('img-responsive').insertBefore(panel + " .panel-heading");
              
              var committee = rows[i][1];
              var $committeevar = $('<div><span></span></div>');
              $committeevar.text(committee).appendTo(panel + " .panel-body");
              var $committeelabel = $('<strong></strong>');
              $committeelabel.text("Office seeking: ").prependTo($committeevar);
              
              var classification = rows[i][2];
              var $classvar = $('<div><span></span></div>');
              $classvar.text(classification).appendTo(panel + " .panel-body");
              var $classlabel = $('<strong></strong>');
              $classlabel.text("Classification: ").prependTo($classvar);
              
              var legislation = rows[i][3];
              var $legislationvar = $("<div><span></span></div>");
              $legislationvar.text(legislation).appendTo(panel + " .panel-body");
               
                            
            }
			//Implement Isotope.js
			$container = $('#panel-container');
			
			$container.imagesLoaded( function(){
			  $container.isotope({
			    itemSelector: '.item',
			    layoutMode: 'fitRows'
			  });
			});
          }
        });
        
      } 

//Create filters

$('.navfilter li').click(function () {
	var officeFilter = $(this).find("a").data('office');
		
	$('#office-label').text(officeFilter); //Add selected office to page header
	
	// Apply Bootstrap's active class to filters 
	$('.navfilter li').removeClass('active');
	$(this).addClass('active');
	
	//Close dropdown when filter is clicked
	$('[data-toggle="dropdown"]').parent().removeClass('open');
	
	$(document).attr('title', officeFilter + " | Voter's Guide: 2014 SGA Elections | TCU 360"); //Set page title to candidate office on click
	
	$container.isotope({
		filter: function () {
		if ($(this).find('.panel').data('office') != officeFilter) {
			return false;
		}
		else { 
			return true;
		}
	}
	
	});
		
	
	return false;

});

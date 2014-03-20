//Special thanks to Andrew Chavez for putting up with my endless questions during the development of this app

function initialize() {
        var query = "SELECT Name, Committee, Classification, 'Legislation Authored', Photo FROM " +
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
          	console.log(data);
            var rows = data['rows'];
            
            for (var i in rows) {
            	console.log(rows[i])
            	              
              var panel = "panel" + i;
              
              //Create the panel and append it to div#panel-container
              $('<div></div>').attr("id", panel).addClass('panel panel-default').appendTo('#panel-container');
                                          
              panel = '#' + panel;
              
              //Create panel header for candidate name
              $('<div></div>').addClass('panel-heading').appendTo(panel);
              
              
              //Create panel body for candidate info
              $('<div></div>').addClass('panel-body').appendTo(panel);
              
              //Place panels in a div that allows it to function inside the Bootstrap grid
              $(panel).wrap('<div class="col-lg-4"></div>');
              
              var name = rows[i][0];
              var $namevar = $('<h3 class="panel-title"></h3>');
              $namevar.text(name).appendTo(panel + " .panel-heading");
              
              	//Place FontAwesome Double Angle Right icon after candidate name 
              	$("<span> <i class='fa fa-angle-double-right'></i></span>").appendTo($namevar);
              
              var photo = rows[i][4];
              var $photovar = $('<img />');
              $photovar.attr('src', photo).appendTo(panel + " .panel-body");
                          
              var committee = rows[i][1];
              var $committeevar = $('<div><span></span></div>');
              $committeevar.text(committee).appendTo(panel + " .panel-body");
              
              var classification = rows[i][2];
              var $classvar = $('<div><span></span></div>');
              $classvar.text(classification).appendTo(panel + " .panel-body");
              
              var legislation = rows[i][3];
              var $legislationvar = $('<div><span></span></div>');
              $legislationvar.text(legislation).appendTo(panel + " .panel-body");
              
              
                            
            }
          }
        });
        
      }      
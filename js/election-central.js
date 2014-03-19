function initialize() {
        var query = "SELECT Name, Committee, Classification, 'Legislation Authored', Photo FROM " +
            '1mQXVY2fdbKqduhwyRpzywqqnfdS27k2YnBXAP9NE';
        var encodedQuery = encodeURIComponent(query);

        // Construct the URL
        var url = ['https://www.googleapis.com/fusiontables/v1/query'];
        url.push('?sql=' + encodedQuery);
        url.push('&key=AIzaSyBpucsUNf8LQ9VMFS-9E_zRcdhcFlrNm4U');
        url.push('&callback=?');

        // Send the JSONP request using jQuery
        $.ajax({
          url: url.join(''),
          dataType: 'jsonp',
          success: function (data) {
          	console.log(data);
            var rows = data['rows'];
            var ftData = document.getElementById('ft-data');
            
            for (var i in rows) {
            	console.log(rows[i])
            	              
              var panel = "panel" + i;
              
              $('<div></div>').addClass('panel panel-default').appendTo('#panel-container').attr("id", panel);
                                          
              panel = '#' + panel;
              
              $('<div></div>').addClass('panel-heading').appendTo(panel);
              
              $('<div></div>').addClass('panel-body').appendTo(panel);
              
              var name = rows[i][0];
              $('<h3 class="panel-title"></h3>').text(name).appendTo('.candidate-name');
              
              var committee = rows[i][1];
              $('<span></span>').text(committee).appendTo('.candidate-committee');
              
              var classification = rows[i][2];
              $('<span></span>').text(classification).appendTo('.candidate-classification');
              
              var legislation = rows[i][3];
              $('<span></span>').text(legislation).appendTo('.candidate-legislation')
              
              var photo = rows[i][4];
              $('<img />').attr('src', photo).appendTo('.candidate-headshot');
                            
            }
          }
        });
        
      }      
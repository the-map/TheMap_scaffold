$('ul.nav > li').click(function (e) {
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active');
        });

        $("#map-canvas").height('100%');
        $("#lefter").height('100%');
		
		$(document).ready(function(){
			var map = L.map('leaf-map', {
					zoomControl: false
				});

			map.setView([32.785903, -96.795903], 12);
			
			var mapboxTiles = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day.grey/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
						attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
						subdomains: '1234',
						mapID: 'newest',
						//app_id: 'Y8m9dK2brESDPGJPdrvs',
						//app_code: 'dq2MYIvjAotR8tHvY8Q_Dg',
						app_id: 'lZjh1sncXfyS5qTsuaPW',
						app_code: 'oV-bfHNn2rjbHt64jJ0TtA',
						base: 'base',
						minZoom: 0,
						maxZoom: 20
					});
			map.addLayer(mapboxTiles);
            
            L.marker([32.785903, -96.795903]).addTo(map);
            
		});
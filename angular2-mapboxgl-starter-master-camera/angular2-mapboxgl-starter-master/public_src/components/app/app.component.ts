import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {LngLat, Map} from 'mapbox-gl';

declare var d3: any;
declare var mapboxgl:any;

@Component({
    selector: 'app',
    template: require<any>('./app.component.html'),
    styles: [
        require<any>('./app.component.less')
    ],
    providers: []
})
export class AppComponent {
    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    map: any;

    ngOnInit() {

        let map = new Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            //style: 'mapbox://styles/mapbox/satellite-v9',
            center: [-73.5804, 45.534830],
            pitch: 60, // pitch in degrees
            bearing: -60, // bearing in degrees
            zoom: 10
        });

        this.mapService.map = map;

        this.map = map;


    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
        var _this=this;

        _this.map.on('load', function () {
                _this.map.addSource("points", {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-73.533518, 45.506537]
                                //45.506537, -73.533518
                            },
                            "properties": {
                                "title": "Mapbox DC",
                                "icon": "monument"
                            }
                        }, {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-73.533518, 45.506537]
                            },
                            "properties": {
                                "title": "Mapbox SF",
                                "icon": "harbor"
                            }
                        }]
                    }
                });

                _this.map.addLayer({
                    "id": "points",
                    "type": "symbol",
                    "source": "points",
                    "layout": {
                        "icon-image": "{icon}-15",
                        "text-field": "{title}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        "text-offset": [0, 0.6],
                        "text-anchor": "top"
                    }
                });
        });



    }



    
    

}

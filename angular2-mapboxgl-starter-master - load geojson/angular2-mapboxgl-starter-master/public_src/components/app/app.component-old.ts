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
            center: [-73.5804, 45.534830],
            pitch: 60, // pitch in degrees
            bearing: -60, // bearing in degrees
            zoom: 10
        });

        this.mapService.map = map;

        this.map = map;


        this.map.addSource('maine', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {
                'name': 'Maine'
            },
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[
                    [-67.13734351262877, 45.137451890638886],
                    [-66.96466, 44.8097],
                    [-68.03252, 44.3252],
                    [-69.06, 43.98],
                    [-70.11617, 43.68405],
                    [-70.64573401557249, 43.090083319667144],
                    [-70.75102474636725, 43.08003225358635],
                    [-70.79761105007827, 43.21973948828747],
                    [-70.98176001655037, 43.36789581966826],
                    [-70.94416541205806, 43.46633942318431],
                    [-71.08482, 45.3052400000002],
                    [-70.6600225491012, 45.46022288673396],
                    [-70.30495378282376, 45.914794623389355],
                    [-70.00014034695016, 46.69317088478567],
                    [-69.23708614772835, 47.44777598732787],
                    [-68.90478084987546, 47.184794623394396],
                    [-68.23430497910454, 47.35462921812177],
                    [-67.79035274928509, 47.066248887716995],
                    [-67.79141211614706, 45.702585354182816],
                    [-67.13734351262877, 45.137451890638886]]]
            }
        }
    })

    this.map.addLayer({
        'id': 'route',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    })
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
        var _this=this;
        //this.AddPoly();
        //this.mapDraw();
        // d3.json("public_src/components/app/ken.geojson", function (err, data) {
        //     debugger;
        //     //_this.mapDraw(data);


        // });
    }

AddPoly(){

}

}
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
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
        var _this=this;
        //this.mapDraw();
        d3.json("public_src/components/app/ken.geojson", function (err, data) {
            debugger;
            _this.mapDraw(data);
        });
    }

    mapDraw(geojson) {

        var _this=this;
        // svg要素をアペンドする
        var container = this.map.getCanvasContainer()
        var svg = d3.select(container).append("svg")


        //緯度経度->パスジェネレーター関数作成
        var transform = d3.geo.transform({ point: projectPoint });
        var path = d3.geo.path().projection(transform);

        var featureElement = svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr({
                "stroke": "red",
                "fill": "green",
                "fill-opacity": 0.4
            });

        //path要素のアップデート
        function update() {
            featureElement.attr("d", path);
        }

        //
        this.map.on("viewreset", update)
        this.map.on("movestart", function () {
            svg.classed("hidden", true);
        });
        this.map.on("rotate", function () {
            svg.classed("hidden", true);
        });
        this.map.on("moveend", function () {
            update()
            svg.classed("hidden", false);
        })

        //初期レンダリング
        update()

       function projectPoint(lon, lat) {
           debugger;
        var point = _this.map.project(new mapboxgl.LngLat(lon, lat));
        this.stream.point(point.x, point.y);
    }

    }
    

}

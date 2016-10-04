import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {LngLat, Map} from 'mapbox-gl';

declare var d3: any;
declare var mapboxgl: any;

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
    ngAfterViewInit() {
        //mapboxgs トークン
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpbWl6dSIsImEiOiI0cl85c2pNIn0.RefZMaOzNn-IistVe-Zcnw'

        //Setup mapbox-gl map
        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [141.15448379999998, 39.702053　],
            pitch: 60, // pitch in degrees
            bearing: -60, // bearing in degrees
            zoom: 4,
        });

        //Initializing Marker Component
        this.mapService.map = map;
        this.markerComponent.Initialize();

        var self = this;
        d3.json("public_src/components/app/ken.geojson", function (err, data) {
            self.mapDraw(data);
        });
    }
    mapDraw(geojson) {
        var map = this.mapService.map;
        map.addControl(new mapboxgl.Navigation());

        // svg要素をアペンドする
        var container = map.getCanvasContainer()
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
        map.on("viewreset", update)
        map.on("movestart", function () {
            svg.classed("hidden", true);
        });
        map.on("rotate", function () {
            svg.classed("hidden", true);
        });
        map.on("moveend", function () {
            update()
            svg.classed("hidden", false);
        })

        //初期レンダリング
        update()

        function projectPoint(lon, lat) {
            var point:any = map.project(new mapboxgl.LngLat(lon, lat));
            this.stream.point(point.x, point.y);
        }
    }
}

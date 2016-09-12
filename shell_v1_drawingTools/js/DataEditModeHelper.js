window.DataEditModeHelper = new function () {
    var self = this;
    var defaults = { mradius: 5, mfactor: 2, mweight: 2, mcolor: '#03f', mopacity: 1, mscolor: '#000', msopacity: 1, mselectedProps : "" };
    var drawControl;

    function resetStyles(feature) {
        if (feature.mapLayer.setStyle) {
            feature.mapLayer.setStyle({
                weight: feature.properties.mweight == 0 ? 0 : (feature.properties.mweight || defaults["mweight"]),
                fillColor: feature.properties.mcolor || defaults["mcolor"],
                fillOpacity: feature.properties.mopacity == 0 ? 0 : (feature.properties.mopacity || defaults["mopacity"]),
                color: feature.properties.mscolor || defaults["mscolor"],
                opacity: feature.properties.msopacity == 0 ? 0 : (feature.properties.msopacity || defaults["msopacity"])

            });
        }
        else if (feature.mapLayer.setIcon) {
            var coloredMarker = L.VectorMarkers.icon({
                icon: 'location-arrow',
                prefix: 'fa',
                markerColor: feature.properties.mcolor || defaults["mcolor"],
                iconColor: feature.properties.mscolor || "#fff"
            });
            feature.mapLayer.setIcon(coloredMarker);
        }
    }

    function checkFeatureSelections(layers, drawLayer) {
        var selectedFeatures = [];

        _.each(layers, function (layer) {
            var intersection;

            if (layer.Data) {
                _.each(layer.Data.features, function (feature) {

                    function checkIntersection(featureJSON)
                    {
                        if (featureJSON.type == 'FeatureCollection') {
                            _.each(featureJSON.features, function (subFeature) {
                                if (intersection) return;
                                intersection = window.turf.intersect(subFeature, drawLayer.toGeoJSON());
                            });
                        }
                        else {
                            intersection = window.turf.intersect(featureJSON, drawLayer.toGeoJSON());
                        }
                    }

                    try {
                        var featureJSON = feature.mapLayer.toGeoJSON();
                        checkIntersection(featureJSON);
                    }
                    catch (ex) {
                        if (ex.name == 'TopologyError')
                        {
                            var featureJSON = window.turf.simplify(feature.mapLayer.toGeoJSON());
                            checkIntersection(featureJSON);
                        }
                        else {
                            console.log(ex);
                            console.log(feature);
                        }
                    }
                    resetStyles(feature);

                    if (intersection) {
                        feature.parentLayer = layer;
                        selectedFeatures.push(feature);

                        if (feature.mapLayer.setStyle) {
                            feature.mapLayer.setStyle({
                                weight: 1,
                                fillColor: "#ff4d4d",
                                fillOpacity: 1,
                                color: "#000000",
                                opacity: 1

                            });
                        }
                        else if (feature.mapLayer.setIcon) {
                            var coloredMarker = L.VectorMarkers.icon({
                                icon: 'check',
                                prefix: 'fa',
                                markerColor: "#ff4d4d",
                                iconColor: "#ffffff"
                            });
                            feature.mapLayer.setIcon(coloredMarker);
                        }
                    }
                });
            }
        });
        
        return selectedFeatures;
    }
   
    this.addDrawControls = function addDrawControls(layers, map) {
        var drawGroup = L.geoJson().addTo(map);
        drawControl = new L.Control.Draw({
            edit: false,
            draw: {
                polyline: true,
                polygon : true,
                
                rectangle: {
                    shapeOptions: {
                        weight: 2,
                        fillColor: "#8080ff",
                        fillOpacity: 0.4,
                        color: "#8080ff",
                        opacity: 1
                    }
                },
                circle: true,
                marker: true
            }
        }).addTo(map);

        for (var toolbarId in drawControl._toolbars) {
            drawControl._toolbars[toolbarId]._modes['rectangle'].handler.enable();
        }

        map.on('draw:created', function (e) {
            //check for intersections between draw layer and base geometry
            e.layer.addTo(map);
            //var selectedFeatures = checkFeatureSelections(layers, e.layer);
            //self.OfferEditor(selectedFeatures, e.layer.getLatLngs()[0]);
        });
    };

    this.removeDrawControls = function removeDrawControls(layers, map) {
        if (drawControl._map) {
            drawControl.removeFrom(map);
        }

        _.each(layers, function (layer) {
            if (layer.Data) {
                _.each(layer.Data.features, function (feature) {
                    resetStyles(feature);
                });
            }
        });

        map.off('draw:created');

    };

    this.OfferEditor = function (features, latLng) {
        var dummyFeature = {
            mapLayer: L.marker([32.79, -96.79]),
            properties: {},
            bulkMode: true,
            targetFeatures: features,
            cancelFeature: function (feature) {
                _.each(feature.targetFeatures, function (feature) {
                    resetStyles(feature);
                });
            }
        };
        //DataEditor.EditBulk(dummyFeature, latLng);
    };
};
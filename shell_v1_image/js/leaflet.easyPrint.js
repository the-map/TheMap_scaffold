L.Control.EasyPrint = L.Control.extend({
    options: {
        position: 'topleft',
        title: 'Print map',
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar'),
        options = this.options;

        this.print = this._createButton("", "Print map!",
        'leaflet-printicon', container, function () {
            $("#loading").removeClass("ng-hide");


            function take(targetElem) {

                var elements = targetElem.find('svg').map(function () {
                    var svg = $(this);
                    var canvas = document.createElement('canvas');

                    canvg(canvas, svg[0].outerHTML);
                    svg.replaceWith(canvas);
                    return {
                        svg: svg,
                        canvas: canvas
                    };
                });

                html2canvas(targetElem, {
                    onrendered: function (canvas) {
                        var a = document.createElement('a');
                        var dataUrl = canvas.toDataURL('image/png');
                        a.setAttribute("href", dataUrl);
                        a.setAttribute("download", "map");

                        document.body.appendChild(a);
                        a.click();

                        elements.each(function () {
                            $(this.canvas).replaceWith(this.svg);
                        });
                        $("#loading").addClass("ng-hide");
                    },
                    useCORS: true,
                    logging: true
                });
            }
            setTimeout(function () { take($('#leaf-map')) }, 1000);
        });

        return container;
    },

    _createButton: function (html, title, className, container, fn) {
        var link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent
            .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);

        return link;
    }
});

L.easyPrint = function (map) {
    return new L.Control.EasyPrint(map);
};


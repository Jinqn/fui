/**
 * 容器类： Panel
 */

define( function ( require ) {

    var Utils = require( "base/utils" ),
        panelTpl = require( "tpl/panel" ),
        $ = require( "base/jquery" );

    return Utils.createClass( "Panel", {

        base: require( "widget/container" ),

        constructor: function ( options ) {

            var marker = Utils.getMarker();
            this.callBase( marker );

            var defaultOptions = {
                width: null,
                height: null,
                padding: null,
                margin: 0
            };

            this.__extendOptions( defaultOptions, options );

            this.widgetName = 'Panel';

            this.__tpl = panelTpl;

            if ( options !== marker ) {
                this.__render();
            }

        },

        appendWidget: function ( widget ) {

            var returnValue = this.callBase( widget );

            if ( this.__options.margin ) {
                widget.getElement().style.margin = this.__options.margin;
            }

            return returnValue;

        },

        insertWidget: function ( index, widget ) {

            var returnValue = this.callBase( index, widget );

            if ( this.__options.margin ) {
                widget.getElement().style.margin = this.__options.margin;
            }

            return returnValue;

        },

        __render: function () {

            var $content = null;

            if ( this.__rendered ) {
                return this;
            }

            this.__initOptions();

            this.callBase();

            $content = $( '<div class="fui-panel-content"></div>' );

            this.__contentElement.appendChild( $content[ 0 ] );

            this.__contentElement = $content[ 0 ];

        },

        __initOptions: function () {

            var cssMapping = {},
                options = this.__options,
                value = null;

            $.each( [ 'width', 'height', 'padding' ], function ( i, item ) {

                value = options[ item ];

                if ( value !== null && value !== undefined ) {
                    cssMapping[ item ] = value;
                }

            } );

            options.__css = cssMapping;

            // margin
            if ( typeof this.__options.margin === "number" ) {
                this.__options.margin += 'px';
            }

        }

    } );

} );

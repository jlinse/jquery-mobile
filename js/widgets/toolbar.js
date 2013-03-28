//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Behavior for "fixed" headers and footers - be sure to also include the item 'Browser specific workarounds for "fixed" headers and footers' when supporting Android 2.x or iOS 5
//>>label: Toolbars: Fixed
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "../jquery.mobile.core", "../jquery.mobile.navigation", "./page", "../jquery.mobile.zoom" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {


	$.widget( "mobile.toolbar", $.mobile.widget, {
		options: {
			theme: "a",
			addBackBtn: false,
			backBtnTheme: null,
			initSelector: ":jqmData(role='footer'), :jqmData(role='header')"
		},

		_create: function() {
			var leftbtn, rightbtn, backBtn,
				role =  this.element.is( ":jqmData(role='header')" ) ? "header" : "footer",
				theme = this.options.theme,
				$page = this.element.closest(".ui-page");

			this.element
				//add theme class
				.addClass( "ui-bar-" + theme ).addClass( "ui-" + role )
				// Add ARIA role
				.attr( "role", role === "header" ? "banner" : "contentinfo" );

			if ( role === "header") {
				// Right,left buttons
				$headeranchors	= this.element.children( "a, button" );
				leftbtn	= $headeranchors.hasClass( "ui-btn-left" );
				rightbtn = $headeranchors.hasClass( "ui-btn-right" );

				leftbtn = leftbtn || $headeranchors.eq( 0 ).not( ".ui-btn-right" ).addClass( "ui-btn-left" ).length;

				rightbtn = rightbtn || $headeranchors.eq( 1 ).addClass( "ui-btn-right" ).length;
			}
			this.element.children("a").buttonMarkup({ theme:theme});
			if ( this.options.addBackBtn &&
				role === "header" &&
				$( ".ui-page" ).length > 1 &&
				$page[ 0 ].getAttribute( attrPrefix + "url" ) !== $.mobile.path.stripHash( location.hash ) &&
				!leftbtn ) {

				backBtn = $( "<a href='javascript:void(0);' class='ui-btn-left' data-"+ $.mobile.ns +"rel='back' data-"+ $.mobile.ns +"icon='arrow-l'>"+ o.backBtnText +"</a>" )
					// If theme is provided, override default inheritance
					.attr( "data-"+ $.mobile.ns +"theme", o.backBtnTheme || theme )
					.prependTo( this.element );
			}
			// Page title
			this.element.children( "h1, h2, h3, h4, h5, h6" )
				.addClass( "ui-title" )
				// Regardless of h element number in src, it becomes h1 for the enhanced page
				.attr({
					"role": "heading",
					"aria-level": "1"
				});

		}

	

	});

	//auto self-init widgets
	$.mobile.document
		.bind( "pagecreate create", function( e ) {
			$.mobile.toolbar.prototype.enhanceWithin( e.target );
		});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

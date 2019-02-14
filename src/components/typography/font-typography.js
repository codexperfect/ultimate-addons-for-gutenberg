/**
 * WordPress dependencies
 */
const { __ } = wp.i18n

const {
	SelectControl
} = wp.components

// Extend component
const { Component, Fragment } = wp.element

/**
 * Internal dependencies
 */
import map from "lodash/map"
import googleFonts from "./fonts"

function FontFamilyControl( props ) {

	const fonts = [
		{ value: "", label: __( "Default" ), weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Arial", label: "Arial", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Helvetica", label: "Helvetica", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Times New Roman", label: "Times New Roman", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
		{ value: "Georgia", label: "Georgia", weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ], google: false },
	]

	let fontWeight = ""
	let fontSubset = ""

	//Push Google Fonts into stytem fonts object
	Object.keys( googleFonts ).map( ( k, v ) => {
		fonts.push(
			{ value: k, label: k, weight: googleFonts[k].weight }
		)

		if( k === props.fontFamily.value ) {
			fontWeight = googleFonts[k].weight
			fontSubset = googleFonts[k].subset
		}
	})

	// check if the font is a system font and then apply the font weight accordingly.
	if ( fontWeight === "" ) {
		fontWeight = fonts[0].weight
	}

	const fontWeightObj = []

	fontWeight.forEach(function(item) {
		fontWeightObj.push(
			{ value: item, label: item }
		)
	})

	const fontSubsetObj = []

	if( typeof fontSubset == "object" ) {
		fontSubset.forEach(function(item) {
			fontSubsetObj.push(
				{ value: item, label: item }
			)
		})
	}

	const onFontfamilyChange = ( value ) => {
		const { loadGoogleFonts, fontFamily, fontWeight, fontSubset } = props
		props.setAttributes( { [ fontFamily.label ]: value } )
		onLoadGoogleFonts( loadGoogleFonts, value )
		onFontChange( fontWeight, fontSubset, value )
	}

	const onFontChange = ( fontWeight, fontSubset, fontFamily ) => {

		let font_flag
		let new_value

		if( typeof googleFonts[fontFamily] == "object" ) {

			const gfontsObj = googleFonts[fontFamily].weight
			const gfontSubsetObj = googleFonts[fontFamily].subset

			if( typeof gfontsObj == "object" ) {

				gfontsObj.forEach(function(item) {

					if( fontWeight.value == item ) {
						font_flag = false
					} else {
						new_value  = item
						font_flag = true
						props.setAttributes( { [ props.fontWeight.label ]: new_value } )
						return
					}
				})

				gfontSubsetObj.forEach(function(item) {

					if( fontSubset.value == item ) {
						font_flag = false
					} else {
						new_value  = item
						font_flag = true
						props.setAttributes( { [ props.fontSubset.label ]: new_value } )
						return
					}
				})
			}
		}
	}

	const onLoadGoogleFonts = ( loadGoogleFonts, fontFamily ) => {

		let value

		if( fontFamily != "" && typeof googleFonts[fontFamily] != "object" ) {
			value = false
		} else {
			value = true
		}

		props.setAttributes( { [loadGoogleFonts.label]: value } )
	}

	return (
		<div className="uag-typography-options">
			<SelectControl
				label={ __( "Font Family" ) }
				value={ props.fontFamily.value }
				onChange={ onFontfamilyChange }
				options={ fonts	}
				placeholder={ __( "Font family" ) }
			/>
			<SelectControl
				label={ __( "Font Weight" ) }
				value={ props.fontWeight.value }
				onChange={ ( value ) => props.setAttributes( { [ props.fontWeight.label ]: value } ) }
				options={
					fontWeightObj
				}
			/>
			<SelectControl
				label={ __( "Font Subset" ) }
				value={ props.fontSubset.value }
				onChange={ ( value ) => props.setAttributes( { [ props.fontSubset.label ]: value } ) }
				options={
					fontSubsetObj
				}
			/>
		</div>
	)
}

export default FontFamilyControl

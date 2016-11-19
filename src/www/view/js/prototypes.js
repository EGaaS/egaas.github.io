$(function () {
	'use strict';
	
	jQuery("#nanoGallery").nanoGallery({
		breadcrumbAutoHideTopLevel: true,
		galleryToolbarHideIcons: true,
		breakpointSizeSM : 720, breakpointSizeME : 960, breakpointSizeLA : 1000, breakpointSizeXL : 1200,
		thumbnailWidth: '85 SM220 ME220 LA300 XL300',
		thumbnailHeight: '71 SM183 ME183 LA250 XL250',
		thumbnailLabel: {
			display:false,
			align:'center',
			position:'overImageOnMiddle'
		},
		thumbnailL1Label:{
			display:false,
			align:'center',
			position:'overImageOnMiddle',
			displayDescription: false,
			hideIcons: true
		},
		maxItemsPerLine: 3,
		paginationMaxLinesPerPage: 1,
		paginationDots: true,
		locationHash: false,
		imageTransition : 'slide',
		touchAnimationL1: true,
		touchAnimation:false,
		thumbnailHoverEffect:[{'name':'imageScale150', 'duration':700},{'name':'labelAppear75', 'duration':400},{'name':'descriptionAppear', 'duration':1000}],
		itemsBaseURL:'/images/'
	});
});
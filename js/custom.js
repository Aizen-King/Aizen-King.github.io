document.addEventListener('DOMContentLoaded', () => {
	const pageType = GLOBAL_CONFIG_SITE && GLOBAL_CONFIG_SITE.pageType
	const backgrounds = {
		home: '/img/home/home-bg.png',
		learning: '/img/learning/learning-bg.jpg',
		gallery: '/img/gallery/gallery-bg.png'
	}

	if (pageType) {
		document.body.classList.add(`page-${pageType}`)

		const pageBackground = backgrounds[pageType]

		if (pageBackground) {
			document.body.style.setProperty(
				'--page-bg',
				'linear-gradient(rgba(9,11,20,.52),rgba(9,11,20,.52)), url("' + pageBackground + '")'
			)
		}
	}
})

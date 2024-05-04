class Scroll {
	static getEasingScroll(pos) {
		if (pos === 0) return 0;
		if (pos === 1) return 1;
		if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
		return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
	}

	static scrollTo({
		x = 0.0,
		y = 0.0,
		offsetY = 0.0,
		offsetX = 0.0,
		duration = 0.8,
		cb
	}) {
		return new Promise((resolve) => {

			let
				offsetElX = x,
				offsetElY = y;

			if (typeof x !== 'number') {
				offsetElX = $(x).offset().left - offsetX;
			}

			if (typeof y !== 'number') {
				offsetElY = $(y).offset().top - offsetY;
			}

			// smooth scrolling plugin
			if (typeof window.SB !== 'undefined') {

				window.SB.scrollTo(offsetElX, offsetElY, duration * 1000, {
					easing: (pos) => Scroll.getEasingScroll(pos),
					callback: () => {
						if (typeof cb === 'function') {
							cb();
						}
						resolve(true);
					}
				});

			} else { // regular window scrolling

				$('html, body').stop().animate({
					scrollLeft: offsetElX,
					scrollTop: offsetElY
				}, duration * 1000, 'easeInOutExpo', () => {
					if (typeof cb === 'function') {
						cb();
					}
					resolve(true);
				});

			}
		});
	}

	static scrollToTop() {

		// safari fix
		try {
			window.top.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant'
			});
		} catch (error) {
			console.log(error);
		}

		if (typeof window.SB !== 'undefined') {
			window.SB.scrollTop = 0;
			window.pageYOffset = 0;
			window.pageXOffset = 0;
		} else {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant'
			});
		}

	}

	static getScrollTop() {
		if (typeof window.SB !== 'undefined') {
			window.lastTop = window.SB.scrollTop;
		} else {
			window.lastTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		}

		return window.lastTop;
	}

	static restoreScrollTop() {
		if (typeof window.SB !== 'undefined') {
			setTimeout(() => {
				window.SB.scrollTop = window.lastTop;
			}, 100);
		} else {
			window.$html.add(window.$body).animate({
				scrollTop: window.lastTop
			});
		}
	}

	static lock(lock = true) {
		const lockClass = 'body_lock-scroll';

		if (lock === true) {
			if (typeof window.SB !== 'undefined') {
				window.SB.updatePluginOptions('lockscroll', {
					lock: true
				});
			}

			window.$body.addClass(lockClass);
		}

		if (lock === false) {
			window.$body.removeClass(lockClass);

			if (typeof window.SB !== 'undefined') {
				window.SB.updatePluginOptions('lockscroll', {
					lock: false
				});
			}
		}
	}

	static scrollToAnchorFromHash(timeout = 1000) {
		if (window.location.hash) {
			const $scrollElement = $(window.location.hash);

			if ($scrollElement.length) {
				setTimeout(() => {
					Scroll.scrollTo({
						x: 0,
						y: $scrollElement.offset().top - 80
					});
				}, timeout);
			}
		}
	}

	static stop() {
		if (typeof window.SB !== 'undefined') {
			window.SB.setMomentum(0, 0);
		}
	}
}

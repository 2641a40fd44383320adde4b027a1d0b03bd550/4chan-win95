// ==UserScript==
// @name        4chan-win95 settings stuff
// @description Various actions with the settings dialog
// @version     0.3
// @author      (You)
//
// @namespace   https://github.com/2641a40fd44383320adde4b027a1d0b03bd550/4chan-win95
// @homepageURL https://github.com/2641a40fd44383320adde4b027a1d0b03bd550/4chan-win95
// @supportURL  https://github.com/2641a40fd44383320adde4b027a1d0b03bd550/4chan-win95/issues
// @downloadURL https://github.com/2641a40fd44383320adde4b027a1d0b03bd550/4chan-win95/raw/master/4chan-win95.user.js
// @updateURL   https://github.com/2641a40fd44383320adde4b027a1d0b03bd550/4chan-win95/raw/master/4chan-win95.user.js
//
// @match       *://boards.4channel.org/*
// @match       *://boards.4chan.org/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==

const $ = s => document.querySelector(s)
const makeStatusbar = t => `<footer class="statusbar">${t}</footer>`

document.documentElement.classList.add('win95-userscript')
document.addEventListener('OpenSettings', () => {
	let dialog = $('#fourchanx-settings')
	let settingsnav = $('#fourchanx-settings > nav')
	let changeloglink = $('[href="https://github.com/ccd0/4chan-x/blob/master/CHANGELOG.md"]')

	// Move credits (right hand links) to the bottom
	if (!$('#fourchanx-settings > .statusbar'))
		dialog.appendChild($('.credits'))

	// Show version in statusbar instead
	if (changeloglink.textContent != 'Changelog') {
		statusbar = document.createElement('footer')
		dialog.appendChild(statusbar)
		statusbar.outerHTML = makeStatusbar(changeloglink.textContent)

		changeloglink.textContent = 'Changelog'
	}

	// Make the dialog moveable
	dialog.style.position = 'absolute'
	dialog.style.left = '187px'
	dialog.style.top = '126px'
	dialog.style.touchAction = 'none'
	settingsnav.style.cursor = 'move'

	settingsnav.addEventListener('pointerdown', e => {
		const move = e => {
			let x = dialog.offsetLeft + e.movementX
			let y = dialog.offsetTop + e.movementY

			dialog.style.left = `${x <= 10 ? e.movementX : x >= 1920 ? 1920 : x}px`
			dialog.style.top = `${y <= 10 ? e.movementY : y >= 1080 ? 1080 : y}px`
		}

		const up = () => {
			removeEventListener('pointermove', move)
			removeEventListener('pointerup', up)
		}

		addEventListener('pointermove', move, { passive: true })
		addEventListener('pointerup', up, { passive: true })
	})
})

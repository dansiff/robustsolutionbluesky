/*!
* Color mode toggler for CoreUI's docs (https://coreui.io/)
* Copyright (c) 2023 creativeLabs Łukasz Holeczek
* Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

(() => {
  'use strict'

  const THEME = 'coreui-docs-theme'

  const storedTheme = localStorage.getItem(THEME)

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-coreui-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-coreui-theme', theme)
    }

    const event = new Event('ColorSchemeChange')
    document.documentElement.dispatchEvent(event)
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = theme => {
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-coreui-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('xlink:href')

    for (const element of document.querySelectorAll('[data-coreui-theme-value]')) {
      element.classList.remove('active')
    }

    btnToActive.classList.add('active')
    activeThemeIcon.setAttribute('xlink:href', svgOfActiveBtn)
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    for (const toggle of document.querySelectorAll('[data-coreui-theme-value]')) {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-coreui-theme-value')
        localStorage.setItem(THEME, theme)
        setTheme(theme)
        showActiveTheme(theme)
      })
    }
  })
})()
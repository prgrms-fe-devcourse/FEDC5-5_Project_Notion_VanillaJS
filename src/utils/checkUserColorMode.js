import { COLORMODE } from "../constants/constants.js"

export const checkUserColorMode = () => {
  const isDarkMode = window.navigator.userAgent.includes("{isDark property}") //유저가 사용하는 브라우저의 컬러모드 값
  return isDarkMode ? COLORMODE.dark : COLORMODE.light
}
export const switchColorMode = () => {
  const target = document.body
  const isLightMode = target.classList.contains(COLORMODE.light)
  if (isLightMode) {
    target.classList.remove(COLORMODE.light)
    target.classList.add(COLORMODE.dark)
  } else {
    target.classList.remove(COLORMODE.dark)
    target.classList.add(COLORMODE.light)
  }
}

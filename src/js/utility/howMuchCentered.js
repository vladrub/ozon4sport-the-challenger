import getScroll from "./getScroll";

export default function (el) {
    const elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const k = (2 * getScroll().y - 2 * elementOffsetTop + viewportHeight - rect.height) / (viewportHeight + rect.height)
    return k;
};
/**
 * ==========================================================
 *  Aizen Gallery
 *  相册灯箱：点击小图看大图，可左右切换 / 键盘操作 / Esc 关闭
 * ==========================================================
 */

;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.aizen-gallery-link'))

    if (!links.length) return

    var overlay = document.createElement('div')
    overlay.id = 'aizen-lightbox'
    overlay.innerHTML = '' +
      '<button class="aizen-lightbox-close" type="button" aria-label="关闭">×</button>' +
      '<button class="aizen-lightbox-prev" type="button" aria-label="上一张">‹</button>' +
      '<img class="aizen-lightbox-img" alt="">' +
      '<button class="aizen-lightbox-next" type="button" aria-label="下一张">›</button>' +
      '<div class="aizen-lightbox-caption"></div>'

    document.body.appendChild(overlay)

    var image = overlay.querySelector('.aizen-lightbox-img')
    var caption = overlay.querySelector('.aizen-lightbox-caption')
    var current = 0

    function show (index) {
      var total = links.length
      current = (index + total) % total

      var link = links[current]
      var thumb = link.querySelector('img')
      var name = thumb ? thumb.getAttribute('alt') || '' : ''

      image.src = link.getAttribute('href')
      image.alt = name
      caption.textContent = name

      var single = total < 2
      overlay.querySelector('.aizen-lightbox-prev').style.display = single ? 'none' : ''
      overlay.querySelector('.aizen-lightbox-next').style.display = single ? 'none' : ''
    }

    function open (index) {
      show(index)
      overlay.classList.add('is-open')
      document.body.style.overflow = 'hidden'
    }

    function close () {
      overlay.classList.remove('is-open')
      document.body.style.overflow = ''
      image.src = ''
    }

    links.forEach(function (link, index) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
        open(index)
      })
    })

    overlay.querySelector('.aizen-lightbox-close').addEventListener('click', close)
    overlay.querySelector('.aizen-lightbox-prev').addEventListener('click', function () { show(current - 1) })
    overlay.querySelector('.aizen-lightbox-next').addEventListener('click', function () { show(current + 1) })

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) close()
    })

    document.addEventListener('keydown', function (event) {
      if (!overlay.classList.contains('is-open')) return

      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') show(current - 1)
      if (event.key === 'ArrowRight') show(current + 1)
    })
  })
})()

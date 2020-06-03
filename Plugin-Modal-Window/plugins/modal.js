const $ = {}

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const defaultWidth = '400px'

    const modal = document.createElement('div')
    modal.classList.add('my-modal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width} || ${defaultWidth}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Window'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.appendChild(modal)
    return modal
}

$.modal = function (options) {
    const animationSpeed = 200
    const $modal = _createModal(options)
    let closed = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return
            };
            !closed && $modal.classList.add('open')
        },
        close() {
            closed = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closed = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, animationSpeed)
        },
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener(listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}

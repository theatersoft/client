import focus from './focus'
import {log} from '@theatersoft/bus'

let
    currIndex = 0, prevIndex, nextIndex,
    rate = 250, frame = 0,
    $host, $container, $panes, $left, $middle, $right,
    paneWidth

const
    url = location.origin + '/theatersoft/image/',
    sources = [],
    setDimensions = () => {
        paneWidth = $host.clientWidth
        for (let pane of $panes) pane.style.width = `${paneWidth}px`
        $container.style.width = `${paneWidth * 3}px`
    },
    setOffset = (delta, anim) => {
        $container.classList.remove('animate')
        if (anim) $container.classList.add('animate')
        $container.style.transform = `translateX(${delta}px)`
        if (typeof anim === 'function') {
            $container.addEventListener('transitionend', function onend () {
                $container.removeEventListener('transitionend', onend)
                anim()
            }, {once: true}) // TODO chrome 55 once?
        }
    },
    changeSource = delta => {
        localStorage.sourceIndex = currIndex = (currIndex + delta + sources.length) % sources.length
        prevIndex = (currIndex - 1 + sources.length) % sources.length
        nextIndex = (currIndex + 1 + sources.length) % sources.length
        sources[prevIndex].host($left).play(0)
        sources[currIndex].host($middle).play(1)
        sources[nextIndex].host($right).play(0)
        //log(sources.map(s => s.playing))
    },
    rotate = dir => setOffset(-dir * paneWidth, () => {
        log('transitionend rotate')
        setOffset(0);
        changeSource(dir)
    }),
    setSources = names => {
        //TODO sources change
        sources.concat(names.map(n => new Source(n)))
        if (!sources.length) return
        changeSource(Number(localStorage.sourceIndex) || 0)
    },
    imageError = () => {
        log("image error")
    },
    play = b => {
        sources.length && sources[currIndex].play(b)
        if (b) {
            $host.classList.remove('video-missing')
        }
        else {
            let i = $host.querySelector('.video-middle img')
            i.removeAttribute('src')
            i.style.display = 'none' // hide img border in chrome
            $host.classList.add('video-missing')
        }
    },
    toggle = () => {
        var source = sources.length && sources[currIndex]
        if (source)
            play(!source.playing)
    }

class Source {
    constructor (name) {
        this.name = name
        this.playing = false // if playing refresh on load
        this.parent = null // if attached to parent update on load
        this.img = null // cache loaded img
        this.refresh()
    }

    refresh () {
        var
            self = this,
            img = new Image()

        img.onload = function imageLoad () {
            self.retries = 0
            self.img && delete self.img.src
            self.img = this
            delete this.onload
            delete this.onerror

            if (self.parent) {
                self.parent.firstChild
                    ? self.parent.replaceChild(this, self.parent.firstChild)
                    : self.parent.appendChild(this)
            }
            if (self.playing)
                setTimeout(function () {
                    self.refresh()
                }, rate)
        }
        img.onerror = function onError () {
            if (self.playing && self.retries++ < 5)
                setTimeout(function () {
                    self.refresh()
                }, rate)
            else
                imageError() // TODO
        }
        img.src = url + self.name + '?f=' + frame++
    }

    play (b) {
        if (b && !this.playing)
            this.refresh()
        this.playing = b
        this.retries = 0
        return this
    }

    host ($host) {
        this.parent = $host
        if (this.parent.hasChildNodes())
            this.parent.removeChild(this.parent.firstChild)
        if (this.img)
            this.parent.appendChild(this.img)
        return this
    }
}

const video = new class {
    constructor () {
        this.name = 'video'
    }

    init (cameras = []) {
        log('video.init')
        $host = document.getElementById('video')
        $host.innerHTML = `<ul><li class="video-left"></li><li class="video-middle"></li><li class="video-right"></li></ul>`
        $container = $host.children[0]
        $panes = $container.children
        $left = $panes[0]
        $middle = $panes[1]
        $right = $panes[2]

        window.onresize = setDimensions
        setDimensions()
        focus.push(video)
        setSources(cameras)
        play(true)
    }
}

export default video

import {h, Component} from './ui'
import {mixinFocusable} from './focus'

export class Video extends mixinFocusable(Component) {
    render () {
        return <div></div>
    }

    onGesture (ev) {
        //log(ev.type, ev)
        ev.gesture.preventDefault()
        switch (ev.type) {
        case 'dragright':
        case 'dragleft':
            setOffset(ev.gesture.deltaX)
            sources[ev.type == 'dragright' ? prevIndex : nextIndex].play(1)
            break
        case 'dragend':
            if (Math.abs(ev.gesture.deltaX) > paneWidth / 2)
                rotate(ev.gesture.direction == 'left' ? 1 : -1)
            else {
                setOffset(0, function () {
                    sources[prevIndex].play(0)
                    sources[nextIndex].play(0)
                })
            }
            break
        case 'swiperight':
        case 'swipeleft':
            rotate(ev.type == 'swipeleft' ? 1 : -1)
            ev.gesture.stopDetect()
            break
        case 'tap':
            var pos = (ev.gesture.center.pageX - document.body.getBoundingClientRect().left) / paneWidth
            if (pos >= 0 && pos < 0.33)
                rotate(-1)
            else if (pos > 0.66 && pos <= 1.0)
                rotate(1)
            else
                focus.push('bar')
            break
        case 'hold':
            break
        }
    }

    onKeydown (ev) {
        log(ev.keyCode)
        switch (ev.keyCode) {
        case 37: // Left
            rotate(-1)
            break
        case 39: // Right
            rotate(1)
            break
        case 38: // Up
        case 40: // Down
            focus.push('bar')
            break
        }
    }
}

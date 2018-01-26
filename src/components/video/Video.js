import {h, Component} from 'preact'
import {focus, mixinFocusable} from '@theatersoft/focus'
import {log, debug, bus} from '@theatersoft/bus'
import './video.styl'

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
    setOffset = (delta, cb) => {
        $container.classList.remove('animate')
        $container.style.transform = `translateX(${delta}px)`
        if (cb) {
            $container.classList.add('animate')
            $container.addEventListener('transitionend', cb, {once: true})
        }
    },
    changeSource = delta => {
        localStorage.sourceIndex = currIndex = (currIndex + delta + sources.length) % sources.length
        prevIndex = (currIndex - 1 + sources.length) % sources.length
        nextIndex = (currIndex + 1 + sources.length) % sources.length
        sources[prevIndex].host($left).play(false)
        sources[currIndex].host($middle).play(true)
        sources[nextIndex].host($right).play(false)
        //log(sources.map(s => s.playing))
    },
    rotate = dir => setOffset(-dir * paneWidth, () => {
        setOffset(0);
        changeSource(dir)
    }),
    setSources = (names = []) => {
        //TODO sources change
        if (sources.push(...names.map(n => new Source(n))))
            changeSource(Number(localStorage.sourceIndex) || 0)
    },
    imageError = () => {
        log("image error")
        play(false)
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
        const
            self = this,
            img = new Image()
        img.onload = function imageLoad () {
            self.retries = 0
            self.img && delete self.img.src
            self.img = this
            delete this.onload
            delete this.onerror;
            (this.decode ? this.decode() : Promise.resolve())
                .then(() => {
                        if (self.parent) {
                            self.parent.firstChild
                                ? self.parent.replaceChild(this, self.parent.firstChild)
                                : self.parent.appendChild(this)
                        }
                    },
                    () => {log('decode rejected', this.src)}
                )
            if (self.playing)
                setTimeout(() => self.refresh(), rate)
        }
        img.onerror = function onError () {
            log('img.onerror', this.src)
            if (self.playing && self.retries++ < 100)
                setTimeout(() => self.refresh(), rate)
            else
                imageError()
        }
        img.src = `${url}${self.name}?f=${frame++}`
    }

    play (b) {
        //log('play', sources.map(s => s.playing))
        if (b && !this.playing)
            this.refresh()
        this.playing = b
        this.retries = 0
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

    init (cameras) {
        debug('video.init')
        $host = document.getElementById('video')
        $host.innerHTML = `<ul><li class="video-left"></li><li class="video-middle"></li><li class="video-right"></li></ul>`
        $container = $host.children[0]
        $panes = $container.children
        $left = $panes[0]
        $middle = $panes[1]
        $right = $panes[2]

        window.onresize = setDimensions
        setDimensions()
        setSources(cameras)
        play(true)
        bus.on('disconnect', () => {
            log('bus disconnect')
            play(false)
        })
        bus.on('reconnect', () => {
            log('bus reconnect')
            play(true)
        })
    }
}

export default video

export const Video = {
    onGesture (e) {
        if (!sources.length) return
        switch (e.type) {
        case 'panright':
        case 'panleft':
            if (e.srcEvent.defaultPrevented) break
            setOffset(e.deltaX)
            sources[e.type == 'panright' ? prevIndex : nextIndex].play(true)
            break
        case 'panend':
            if (e.srcEvent.defaultPrevented) break
            if (Math.abs(e.deltaX) > paneWidth / 2)
                rotate(e.direction == 2 ? 1 : -1)
            else {
                setOffset(0, () => {
                    sources[prevIndex].play(false)
                    sources[nextIndex].play(false)
                })
            }
            break
        case 'swiperight':
        case 'swipeleft':
            rotate(e.type == 'swipeleft' ? 1 : -1)
            e.preventDefault()
            break
        case 'tap':
            var pos = (e.center.x - document.body.getBoundingClientRect().left) / paneWidth
            if (pos >= 0 && pos < 0.33)
                rotate(-1)
            else if (pos > 0.66 && pos <= 1)
                rotate(1)
            else
                break
            e.preventDefault()
            break
        }
    },

    onKeydown (e) {
        //log(e.key)
        if (!sources.length) return
        e.key === 'ArrowLeft' ? rotate(-1) : e.key === 'ArrowRight' && rotate(1)
    }
}

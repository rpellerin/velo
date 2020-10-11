import leaflet from 'leaflet'
import 'leaflet-providers'
import 'leaflet.motion/dist/leaflet.motion.min'

const INIT_COORDS = [52.52971, 13.42661] // Berlin

const lineOptions = {
  color: '#FFF',
  weight: 2,
  opacity: 0.7,
  smoothFactor: 1,
}

export default class GpxMap {
  constructor() {
    this.map = leaflet.map('background-map', {
      center: INIT_COORDS,
      zoom: 12,
      preferCanvas: true,
      scrollWheelZoom: false,
    })

    const mapTiles = leaflet.tileLayer.provider('CartoDB.DarkMatterNoLabels')
    mapTiles.addTo(this.map, { detectRetina: true })
  }

  addTrack(track) {
    const line = leaflet.motion.polyline(
      track.points,
      {
        color: '#FFF',
        weight: 2,
        opacity: 0.7,
        smoothFactor: 1,
      },
      { auto: true, speed: 4000 },
      { icon: leaflet.divIcon({ className: 'display-none' }) }
    )

    function onEnd() {
      const initialOpacity = lineOptions.opacity
      let timeout = 100
      for (let opacity = initialOpacity; opacity > 0; opacity -= 0.05) {
        setTimeout(() => {
          this.setStyle({ opacity })
        }, timeout)
        timeout += 100
      }
      setTimeout(() => {
        this.setStyle({ opacity: initialOpacity })
        this.motionStart()
      }, timeout + 5000)
    }
    line.on(window.L.Motion.Event.Ended, onEnd)
    line.addTo(this.map)
  }
}

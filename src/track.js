// This file is adapted from taterbase/gpx-parser
//
// https://github.com/taterbase/gpx-parser
//
// See https://www.topografix.com/gpx/1/1 for details on the schema for
// GPX files.

import xml2js from 'xml2js'

function extractGPXTracks(gpx) {
  if (!gpx.trk && !gpx.rte) {
    console.log('GPX file has neither tracks nor routes!', gpx)
    throw new Error('Unexpected gpx file format.')
  }

  const parsedTracks = []

  gpx.trk &&
    gpx.trk.forEach((trk) => {
      let name = trk.name && trk.name.length > 0 ? trk.name[0] : 'untitled'
      let timestamp

      trk.trkseg.forEach((trkseg) => {
        let points = []
        for (let trkpt of trkseg.trkpt || []) {
          if (trkpt.time && typeof trkpt.time[0] === 'string') {
            timestamp = new Date(trkpt.time[0])
          }
          if (
            typeof trkpt.$ !== 'undefined' &&
            typeof trkpt.$.lat !== 'undefined' &&
            typeof trkpt.$.lon !== 'undefined'
          ) {
            points.push({
              lat: parseFloat(trkpt.$.lat),
              lng: parseFloat(trkpt.$.lon),
              // These are available to us, but are currently unused
              // elev: parseFloat(trkpt.ele) || 0,
            })
          }
        }

        if (points.length > 0) {
          parsedTracks.push({ timestamp, points, name })
        }
      })
    })

  gpx.rte &&
    gpx.rte.forEach((rte) => {
      let name = rte.name && rte.name.length > 0 ? rte.name[0] : 'untitled'
      let timestamp
      let points = []
      for (let pt of rte.rtept || []) {
        if (pt.time && typeof pt.time[0] === 'string') {
          timestamp = new Date(pt.time[0])
        }
        points.push({
          lat: parseFloat(pt.$.lat),
          lng: parseFloat(pt.$.lon),
        })
      }

      if (points.length > 0) {
        parsedTracks.push({ timestamp, points, name })
      }
    })

  return parsedTracks
}

export default function extractTracks(file) {
  return new Promise((resolve, reject) => {
    new xml2js.Parser().parseString(file.content, (err, result) => {
      if (err) {
        reject(err)
      } else if (result.gpx) {
        resolve(extractGPXTracks(result.gpx))
      } else {
        reject(new Error('Invalid file type.'))
      }
    })
  })
}

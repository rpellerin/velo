import extractTracks from './track'

const processFiles = (map, files) => {
  const handleFile = async (file) => {
    try {
      for (const track of await extractTracks(file)) {
        track.filename = file.name
        map.addTrack(track)
      }
    } catch (err) {
      console.error(err)
    }
  }

  for (let i = 0; i < files.length; i++) {
    setTimeout(() => {
      handleFile(files[i])
    }, i * 500)
  }
}

const downloadStravaRides = async () => {
  const stravaRides = await fetch('./concatenated.txt')
  const text = await stravaRides.text()
  const xmlRides = text
    .split('\n')
    .filter(Boolean)
    .map((line, index) => ({
      name: `${index}.gpx`,
      content: line,
    }))

  return xmlRides
}

export const initializeUi = async (map) => {
  const xmlRides = await downloadStravaRides()
  processFiles(map, xmlRides)
}

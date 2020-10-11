# Velo

## How to build the map with animated rides

### 1. Install GPSBabel

```shell
git clone from https://github.com/gpsbabel/gpsbabel
sudo apt install qtbase5-dev libusb-1.0-0-dev
./configure
make
```

### 2. Get the GPX files from your Strava account or elsewhere.

### 3. Install NodeJS through NVM and minify-xml

```shell
npm i -g minify-xml
```

### 4. Run the following and replace variables

```shell
GPX_INPUT_FILES=/home/you/Documents/gpx-files
TMP_FILES=/tmp/tmp-gpx

mkdir -p $TMP_FILES

# For privacy
WHERE_YOU_LIVE_LAT=51.123
WHERE_YOU_LIVE_LNG=12.123

ls "$GPX_INPUT_FILES"  | while read f; do
    lines=$(cat $GPX_INPUT_FILES/$f | wc -l)
    let "points_to_keep = $lines / 80"
    gpsbabel -r -i gpx -f $GPX_INPUT_FILES/$f -x transform,wpt=trk,del -x radius,distance=0.7K,lat=$[${WHERE_YOU_LIVE_LAT} + $[$[${RANDOM}%40 - 20] / 10000.0]],lon=$[${WHERE_YOU_LIVE_LNG} + $[$[${RANDOM}%40 - 20] / 10000.0]],nosort,exclude -x transform,trk=wpt,del -x simplify,count=$points_to_keep -o gpx -F "$TMP_FILES/$f"
    echo "processing $f with $lines lines, keeping $points_to_keep points"
    minify-xml --in-place $TMP_FILES/$f
done
ls -Srh $TMP_FILES | while read file; do echo "$(cat $TMP_FILES/$file)"; done >! ./public/concatenated.txt
```

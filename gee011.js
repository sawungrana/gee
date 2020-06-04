// Ambil Landsat 8 TOA
var l8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// Ambil citra yang sedikit awannya
var citral8 = ee.Image(
  l8toa.filterBounds(titik)
    .filterDate('2019-01-01', '2019-12-31')
    .sort('CLOUD_COVER')
    .first()
);

// Menamai band
var imdekat = citral8.select('B5');
var merah = citral8.select('B4');
// Membuat perhitungan ndvi
var ndvi = imdekat.subtract(merah).divide(imdekat.add(merah)).rename('NDVI');
// Memvisualisasikan ndvi
Map.centerObject(citral8, 10);
var visndvi = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, visndvi, 'Citra NDVI')
// panggil dulu landsat 8 toanya
var l8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// ambil nilai median
var median = l8toa.filterDate('2019-01-01', '2019-12-31').median();
// buat visualisasi warna nyata
var visualisasi = {bands: ['B5', 'B3', 'B2'], max: 0.3};
// tampilkan visualisasinya
Map.addLayer(median, visualisasi, 'median');
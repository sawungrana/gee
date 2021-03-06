var l8tumpang7 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')

//menyaring koleksi dengan menggunakan titik
var saringtitik = l8tumpang7.filterBounds(titik);
print('saringtitik', saringtitik);
//menyaring koleksi dengan menggunakan waktu
var saringwaktu = saringtitik.filterDate('2019-01-01', '2019-12-31');
print('saringwaktu', saringwaktu);

// perintah berikut akan mengurutkan data dari tutupan awan yang sedikit ke banyak 
var urutawan = saringwaktu.sort('CLOUD_COVER'); 
// ambil citra pertama yang paling sedikit awannya 
var citral8 = urutawan.first();

Map.centerObject(citral8, 11);
var visualisasi = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(citral8, visualisasi, 'komposit warna nyata');

// false color
//var visualisasi = {bands: ['B5', 'B4', 'B3'], max: 0.3};
//Map.addLayer(citral8, visualisasi, 'komposit false color');
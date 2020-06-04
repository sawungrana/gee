//Filter image collection menurut titik pilihan, tanggal, dan tutupan awan
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(titik_roi)
    .filterDate('2019-06-01', '2019-07-31')
    .sort('CLOUD_COVER')
    .first());

//Buat citra warna natural
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'Warna natural');

//Pilih band yang akan digunakan untuk feature collection
var subset = citra.select('B[1-7]')
var sampel = ee.FeatureCollection([air,pepohonan,lahan_terbangun,lahan_terbuka,sawah]);

//Buat grafik scatter
var grafik = ui.Chart.image.regions(
    subset, sampel, ee.Reducer.mean(), 10, 'label')
        .setChartType('ScatterChart');
print(grafik);

// Kustomisasi tampilan
var plotOptions = {
  title: 'Nilai Pantulan Landsat-8  SR',
  hAxis: {title: 'Panjang Gelombang (nm)'},
  vAxis: {title: 'Pantulan'},
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: 'blue'}, // Air
    1: {color: 'green'}, // Pepohonan
    2: {color: 'red'}, // Lahan Terbangun
    3: {color: 'yellow'}, // Lahan Terbuka
    4: {color: 'grey'}, // Sawah
}};

// Membuat keterangan panjang gelombang pada sumbu x
var pjgelombang = [443, 482, 562, 655, 865, 1609, 2201];

// Buat grafik kedua
var grafik2 = ui.Chart.image.regions(subset, sampel, ee.Reducer.mean(), 10, 'label', pjgelombang)
  .setChartType('ScatterChart') 
  .setOptions(plotOptions); 

// Tampilkan grafik kedua
print(grafik2);
// mengambil data SRTM 90 m
var tumpang7 = ee.Image('CGIAR/SRTM90_V4');

// menjalankan algoritma slope terhadap SRTM
var slope = ee.Terrain.slope(tumpang7);

// menampilkan hasil
Map.setCenter(114.0312857, -8.618189, 11); // menuju ke Gunung Tumpangpitu
Map.addLayer(slope, {min: 0, max :60}, 'slope'); //besaran slope yang divisualisasikan


// buat aspect dari Tumpangpitu
var aspect = ee.Terrain.aspect(tumpang7);

// konversi ke radian, gunakan sin sebagai dasar pembuatan aspect
var sintumpang7 = aspect.divide(180).multiply(Math.PI).sin();

// visualisasi hasil aspect sin
Map.addLayer(sintumpang7, {min: -1, max: 1}, 'sin');
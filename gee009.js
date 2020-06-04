var l8tumpang7 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')

//menampilkan image collection ingat image collection sebelumnya (l8tumpang7)
var l82018 = l8tumpang7.filterDate('2018-01-01', '2018-12-31');
Map.addLayer(l82018, visualisasi, 'koleksi l8 2018');
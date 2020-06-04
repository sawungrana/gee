var l8 = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2019-01-01', '2019-12-31')
    .sort('CLOUD_COVER')
    .first());
Map.addLayer(l8, {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'Warna nyata');

var kelas = perkotaan.merge(perairan).merge(hutan).merge(agrikultur);
print(kelas)

var bandcitra = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var training = l8.select(bandcitra).sampleRegions({
  collection: kelas,
  properties: ['tutupanlahan'],
  scale: 30
});
print(training);

var classifier = ee.Classifier.cart().train({
  features: training,
  classProperty: 'tutupanlahan',
  inputProperties: bandcitra
});

var terklasifikasi = l8.select(bandcitra).classify(classifier);

Map.centerObject(kelas, 11);
Map.addLayer(terklasifikasi,
{min: 0, max: 3, palette: ['red', 'blue', 'green','yellow']},
'klasifikasi cart');
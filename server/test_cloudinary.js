import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dcwwuzxsz',
  api_key: '689978828679473',
  api_secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI'
});

(async () => {
  try {
    const res = await cloudinary.api.ping();
    console.log('SUCCESS! This is the correct combination!');
    console.log('Ping Response:', res);
  } catch (err) {
    console.log('FAILED:', err.message || err.error?.message || err);
  }
})();

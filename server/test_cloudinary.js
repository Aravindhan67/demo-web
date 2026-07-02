import { v2 as cloudinary } from 'cloudinary';

const combos = [
  { name: 'devxtoev9', key: '689978828679473', secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI' },
  { name: 'renderserver', key: '689978828679473', secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI' },
  { name: 'render-server', key: '689978828679473', secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI' },
  { name: 'jac-medialand', key: '689978828679473', secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI' },
  { name: 'jacmedialand', key: '689978828679473', secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI' },
  { name: 'render', key: '689978828679473', secret: 'nLOMfjGas_QFE2wGDeI6sP9sUeI' },
];

(async () => {
  for (const combo of combos) {
    console.log(`\nTesting combo: CloudName="${combo.name}", APIKey="${combo.key}"`);
    cloudinary.config({
      cloud_name: combo.name,
      api_key: combo.key,
      api_secret: combo.secret
    });

    try {
      const res = await cloudinary.api.ping();
      console.log('SUCCESS! This is the correct combination!');
      console.log('Ping Response:', res);
      return;
    } catch (err) {
      console.log('FAILED:', err.message || err.error?.message || err);
    }
  }
})();

(async () => {
  try {
    const res = await fetch('http://localhost:4000/v1/public/sites/jac-medialand/collections/projects');
    const data = await res.json();
    console.log('Public projects fetch status:', res.status);
    console.log('First project title:', data[0]?.title);
    console.log('First project visual:', data[0]?.visual);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
})();

async function runSmokeTest() {
  const base = 'https://world-population-intelligence.vercel.app';
  const checks = [
    { name: 'Root Dashboard', url: base },
    { name: 'World Aggregates', url: base + '/api/demographics?country=WLD' },
    { name: 'Uzbekistan Profile', url: base + '/api/demographics?profile=true&country=UZB' },
    { name: 'Choropleth Map Data', url: base + '/api/demographics?map=true&indicator=SP.POP.TOTL' },
    { name: 'Comparison Engine', url: base + '/api/demographics?compare=true&countries=UZB,USA,DEU' },
    { name: 'Historical Series', url: base + '/api/demographics?historical=true&country=UZB&startYear=1960' }
  ];

  console.log('=== VERCEL PRODUCTION SMOKE TESTS ===');
  let passCount = 0;
  for (const c of checks) {
    const t0 = Date.now();
    try {
      const res = await fetch(c.url);
      const elapsed = Date.now() - t0;
      const contentType = res.headers.get('content-type') || 'unknown';
      if (res.status === 200) {
        passCount++;
        console.log(`[PASS] ${c.name.padEnd(25)} | HTTP ${res.status} | ${elapsed}ms | Type: ${contentType.split(';')[0]}`);
      } else {
        console.log(`[FAIL] ${c.name.padEnd(25)} | HTTP ${res.status} | ${elapsed}ms`);
      }
    } catch (e) {
      console.log(`[FAIL] ${c.name.padEnd(25)} | Error: ${e.message}`);
    }
  }
  console.log(`\nResult: ${passCount}/${checks.length} passed.`);
}
runSmokeTest();

const https = require('https');
const fs = require('fs');

const screens = [
  {
    name: 'landing.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2FhOWJkZWIwMWI0NzQ1NTM4YjI2ZDg4ZWU4NmM2OGQxEgsSBxCQufizkQoYAZIBIwoKcHJvamVjdF9pZBIVQhM5MDQ1NTI4NjE4NTQ0MTAyMTkz&filename=&opi=89354086'
  },
  {
    name: 'dashboard.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNiYTJlNTFlNDY5MDRmM2E5ZTA0NWIwZmUxYjRkMGFmEgsSBxCQufizkQoYAZIBIwoKcHJvamVjdF9pZBIVQhM5MDQ1NTI4NjE4NTQ0MTAyMTkz&filename=&opi=89354086'
  },
  {
    name: 'matches.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzVkOGQ0YTBmNzhkMjRmMjE5ZmE4ZTRlYjA1ZGMyYjdmEgsSBxCQufizkQoYAZIBIwoKcHJvamVjdF9pZBIVQhM5MDQ1NTI4NjE4NTQ0MTAyMTkz&filename=&opi=89354086'
  },
  {
    name: 'leaderboard.html',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzBhZjI0Nzg4ZGFiODRkZTBhMjI0OTI5MzU2YWZiNDE1EgsSBxCQufizkQoYAZIBIwoKcHJvamVjdF9pZBIVQhM5MDQ1NTI4NjE4NTQ0MTAyMTkz&filename=&opi=89354086'
  }
];

screens.forEach(screen => {
  https.get(screen.url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      fs.writeFileSync(`./raw_screens/${screen.name}`, data);
      console.log(`Downloaded ${screen.name}`);
    });
  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });
});

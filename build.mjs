import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for (const name of ["index.html", "fonts.css", "style.css", "work.css", "ambient.css", "space.css", "journey.css", "pink.css", "app.js", "work.js", "space.js", "ambient.js", "journey.js", "solar.js"]) await copyFile(name,'dist/'+name);
await cp('assets','dist/assets',{recursive:true});
await cp('images','dist/images',{recursive:true});
console.log('Portfolio ready in dist/');

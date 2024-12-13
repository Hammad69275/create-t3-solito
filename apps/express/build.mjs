import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['index.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    platform: 'node',
    minify: true
  })
  .catch(() => process.exit(1));

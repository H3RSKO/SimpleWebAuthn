import { build, emptyDir } from 'https://deno.land/x/dnt@0.38.0/mod.ts';

const outDir = './npm';

await emptyDir(outDir);

await build({
  entryPoints: [
    { name: '.', path: './src/index.ts' },
    { name: './helpers', path: './src/helpers/index.ts' },
  ],
  outDir,
  shims: {
    deno: "dev",
  },
  test: false,
  // package.json values
  package: {
    name: '@simplewebauthn/server',
    // version: Deno.args[0],
    version: '7.4.0',
    description: 'SimpleWebAuthn for Servers',
    license: 'MIT',
    author: 'Matthew Miller <matthew@millerti.me>',
    repository: {
      type: 'git',
      url: 'https://github.com/MasterKale/SimpleWebAuthn.git',
      directory: 'packages/server',
    },
    homepage: 'https://github.com/MasterKale/SimpleWebAuthn/tree/master/packages/server#readme',
    publishConfig: {
      access: 'public',
    },
    bugs: {
      url: 'https://github.com/MasterKale/SimpleWebAuthn/issues',
    },
    keywords: [
      'typescript',
      'webauthn',
      'passkeys',
      'fido',
      'node',
    ],
  },
  // Map from Deno package to NPM package for Node build
  mappings: {
    'https://deno.land/x/b64@1.1.27/src/base64.js': {
      name: '@hexagon/base64',
      version: '^1.1.25'
    }
  }
});

// Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', `${outDir}/README.md`);
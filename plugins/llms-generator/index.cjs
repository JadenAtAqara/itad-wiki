const fs = require('fs/promises');
const path = require('path');
const {generateLlmsArtifacts} = require('./generator.cjs');

async function copyLocalizedLlmsIntoZhOutput(siteDir, outDir) {
  const sourceRoot = path.join(siteDir, 'static', 'zh');
  const targetRoot = path.basename(outDir) === 'zh' ? outDir : path.join(outDir, 'zh');

  const filesToCopy = [
    'llms.txt',
    path.join('aqara-studio', 'llms.txt'),
    path.join('aqara-developer', 'llms.txt'),
    path.join('aqara-life', 'llms.txt'),
    path.join('aqara-openlink', 'llms.txt'),
  ];

  await Promise.all(
    filesToCopy.map(async (relativePath) => {
      const sourcePath = path.join(sourceRoot, relativePath);
      const targetPath = path.join(targetRoot, relativePath);
      await fs.mkdir(path.dirname(targetPath), {recursive: true});
      await fs.copyFile(sourcePath, targetPath);
    }),
  );
}

module.exports = function llmsGeneratorPlugin(context) {
  return {
    name: 'aqara-llms-generator',
    async loadContent() {
      await generateLlmsArtifacts(context.siteDir);
      return null;
    },
    async postBuild({outDir}) {
      await copyLocalizedLlmsIntoZhOutput(context.siteDir, outDir);
    },
  };
};

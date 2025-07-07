import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export async function runCodeSafely(
  language: string,
  wrappedCode: string,
  expectedOutputs: string[]
) {
  const langMap = {
    python: { ext: 'py', cmd: 'python3' },
    javascript: { ext: 'js', cmd: 'node' }
  };

  const config = langMap[language];
  if (!config) {
    throw new Error(`Unsupported Language! Supported languages: ${Object.keys(langMap).join(', ')}`);
  }

  const filePath = path.join('/tmp', `code-${Date.now()}.${config.ext}`);
  await fs.writeFile(filePath, wrappedCode);

  return new Promise((resolve) => {
    const start = Date.now();

    exec(`${config.cmd} ${filePath}`, { timeout: 5000 }, (err, stdout, stderr) => {
      const timeTaken = Date.now() - start;
      const output = stdout.trim();
      const actualOutputs = output.split('\n').map(line => line.trim());

      let passed = 0;
      for (let i = 0; i < expectedOutputs.length; i++) {
        if (expectedOutputs[i] === actualOutputs[i]) {
          passed++;
        }
      }

      resolve({
        stdout: output,
        stderr: stderr.trim(),
        success: !err && passed === expectedOutputs.length,
        passedTestCases: passed,
        executionTime: timeTaken
      });
    });
  });
} 

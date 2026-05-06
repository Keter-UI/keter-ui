import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

export const REGISTRY_URL = 'https://raw.githubusercontent.com/keter-ui/keter-ui/main/registry';
const FETCH_TIMEOUT = 3000; // 3 seconds

export interface RegistryEntry {
  files: string[];
  dependencies: string[];
  registryDependencies?: string[];
}

export interface Registry {
  utilities: Record<string, RegistryEntry>;
  components: Record<string, RegistryEntry>;
}

function getLocalRegistryPath() {
  // In CJS (which tsup is building), __dirname is available.
  // The structure is dist/index.js and registry/ is at the same level as dist/
  return path.resolve(__dirname, '..', 'registry');
}

async function fetchWithTimeout(url: string, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function fetchRegistry(): Promise<Registry> {
  // 1. Try Remote
  try {
    const response = await fetchWithTimeout(`${REGISTRY_URL}/index.json`);
    if (response.ok) {
      return await response.json() as Registry;
    }
  } catch (error) {
    // Ignore remote error, move to fallback
  }

  // 2. Try Local Fallback
  const localPath = path.join(getLocalRegistryPath(), 'index.json');
  if (fs.existsSync(localPath)) {
    try {
      const content = await fs.readFile(localPath, 'utf-8');
      return JSON.parse(content) as Registry;
    } catch (error) {
      // Ignore local error, move to fail
    }
  }

  // 3. Hard Fail
  throw new Error(
    '❌ Registry unavailable\n' +
    '  ✔ Tried: remote (GitHub) + local (bundled)\n' +
    '  💡 Try: check your internet connection or reinstall the CLI.'
  );
}

export async function copyRegistryFile(
  file: string,
  targetPath: string
) {
  // 1. Try Remote
  try {
    const response = await fetchWithTimeout(`${REGISTRY_URL}/${file}`);
    if (response.ok) {
      const content = await response.text();
      await fs.ensureDir(path.dirname(targetPath));
      await fs.writeFile(targetPath, content);
      return;
    }
  } catch (error) {
    // Ignore remote error, move to fallback
  }

  // 2. Try Local Fallback
  const localPath = path.join(getLocalRegistryPath(), file);
  if (fs.existsSync(localPath)) {
    try {
      await fs.ensureDir(path.dirname(targetPath));
      await fs.copy(localPath, targetPath);
      return;
    } catch (error) {
      // Ignore local error, move to fail
    }
  }

  // 3. Hard Fail
  throw new Error(
    `❌ Could not fetch registry file: ${file}\n` +
    '  ✔ Tried: remote (GitHub) + local (bundled)\n' +
    '  💡 Try: check your internet connection or reinstall the CLI.'
  );
}

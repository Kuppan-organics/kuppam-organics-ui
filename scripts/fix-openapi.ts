import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use process.cwd() as fallback for Node.js context
const rootDir = __dirname.includes('scripts') ? path.join(__dirname, '..') : process.cwd();

async function fetchAndFixOpenAPI() {
  try {
    const response = await fetch('https://kuppams-backend.vercel.app/api-docs.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
    }
    
    const spec = await response.json();
    
    // Recursively fix arrays without items
    function fixArraySchemas(obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map(fixArraySchemas);
      }
      
      if (obj && typeof obj === 'object') {
        // Fix arrays without items
        if (obj.type === 'array' && !obj.items) {
          console.warn(`Fixing array schema without items: ${JSON.stringify(obj)}`);
          obj.items = { type: 'string' }; // Default to string array
        }
        
        // Recursively fix nested objects
        const fixed: any = {};
        for (const [key, value] of Object.entries(obj)) {
          fixed[key] = fixArraySchemas(value);
        }
        return fixed;
      }
      
      return obj;
    }
    
    const fixedSpec = fixArraySchemas(spec);
    
    // Save to local file
    const outputPath = path.join(rootDir, 'openapi-fixed.json');
    fs.writeFileSync(outputPath, JSON.stringify(fixedSpec, null, 2));
    console.log(`Fixed OpenAPI spec saved to: ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.error('Error fetching/fixing OpenAPI spec:', error);
    throw error;
  }
}

fetchAndFixOpenAPI();

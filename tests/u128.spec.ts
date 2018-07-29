import * as fs    from 'fs';
import * as path  from 'path';
import * as util  from 'util';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  demangle,
  buildImports,
  camelToSpaced
} from './utils/helpers';

const readFile = util.promisify(fs.readFile);

const memory = new WebAssembly.Memory({ initial: 2 });
const buffer = new Uint8Array(memory.buffer);
const imports = buildImports('u128.spec.as', memory, buffer);

describe("u128", async () => {
  const file   = await readFile(path.join(__dirname, 'build/u128.wasm'));
  const result = await WebAssembly.instantiate(file, imports);
  const instance: any = demangle(result.instance.exports);

  for (const tests in instance) {
    describe(camelToSpaced(tests), () => {
      for (const test in instance[tests]) {
        it(camelToSpaced(test), () => {
          expect(instance[tests][test]()).to.be.eq(1);
        });
      }
    });
  }
});

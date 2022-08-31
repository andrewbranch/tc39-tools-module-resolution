# A Proposal For Module Resolution In TypeScript

[TypeScript issue](https://github.com/microsoft/TypeScript/issues/50152)

- How we got here
  - Output code has to run somewhere
    - Option #1: Arbitrary input format, transformed into runtime-valid output
    - Option #2: Runtime-valid format as input, output is identical
    - Both options require knowledge of runtime module resolution rules
  - 2015: Make module resolution configurable; add `node`, call old algorithm `classic`
  - 2022: Add `node16` and `nodenext`
    - What we should have said: “Models Node’s handling of CJS, ESM, and interop between them”
    - What we said: “ECMAScript Module Support in Node.js”
    - What people heard: “This is how you do ESM in TypeScript”
  - Meanwhile: browsers, bundlers, and TS-native runtimes

- Demo of a confused Webpack user
  1. Using `moduleResolution: node` and extensionless imports
  2. Add dependency of something with package.json `exports`
  3. TS resolution doesn’t work
  4. Try `nodenext`
  5. Can’t import because dependency is ESM
  6. Set `type: module` in own package.json
  7. Need to update import paths to use `.js`

- Proposal
  - New fine-grained options
    - package.json `exports`
      - Enable/disable
      - Custom conditions
    - allow `.ts` in import paths
      - Requires `noEmit` / `emitDeclarationOnly`
  - New `moduleResolution` modes
    - `moduleResolution: hybrid`
      - node_modules support
      - index file lookups
      - extensionless lookups
      - does not care about `"type": "module"`, `.mts`, `.cts`
      - `.cts` and `.cjs` maybe not allowed?
      - `require` maybe not resolved by TS?
      - Default options:
        - `esModuleInterop` enabled
        - `packageJsonExports` enabled
    - `moduleResolution: minimal`
      - no node_modules support
      - no index files
      - file extensions required
      - treat all module specifiers as URLs?
      - `.cts` and `.cjs` maybe not allowed?
      - `require` not resolved by TS
  - Deprecate `moduleResolution: node` / rename to `node-legacy`

- Questions for you (runtime and bundler folks)
  - What will module resolution in the wild look like in 5 years?
  - What TypeScript issues do your users hit the most?
  - Can we keep a dialog open?

- Questions for me?

import fs from 'fs';
import { resolve } from 'path';
import type { ResolvedConfig, PluginOption, LibraryOptions } from 'vite';

/** From https://github.com/ohbug-org/ohbug-extension-feedback/blob/main/libInjectCss.ts */

const fileRegex = /\.(css)$/;

const injectCode = (code: string) =>
  `function styleInject(css,ref){if(ref===void 0){ref={}}var insertAt=ref.insertAt;if(!css||typeof document==="undefined"){return}var head=document.head||document.getElementsByTagName("head")[0];var style=document.createElement("style");style.type="text/css";if(insertAt==="top"){if(head.firstChild){head.insertBefore(style,head.firstChild)}else{head.appendChild(style)}}else{head.appendChild(style)}if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}};styleInject(\`${code}\`)`;
const template = 'console.warn("__INJECT__")';

let viteConfig: ResolvedConfig;
const css: string[] = [];

export default function libInjectCss(): PluginOption {
  return {
    name: 'inject-css',
    apply: 'build',

    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig;
    },

    transform(code, id) {
      if (fileRegex.test(id)) {
        css.push(code);
        return null;
      }
      if (id.includes((viteConfig.build.lib as LibraryOptions).entry)) {
        return {
          code: `${code}
          ${template}`,
        };
      }
      return null;
    },

    async writeBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const { root } = viteConfig;
        const outDir = viteConfig.build.outDir;
        const filePath = resolve(root, outDir, fileName);

        try {
          let data = fs.readFileSync(filePath, {
            encoding: 'utf8',
          });

          if (data.includes(template)) {
            data = data.replace(template, injectCode(css.join('\n')));
          }

          fs.writeFileSync(filePath, data);
        } catch (e) {
          console.error(e);
        }
      }
    },
  };
}
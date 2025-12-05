// Script to bundle all lib files using Bun.

const VERSION = "1.2.0";
const BANNER = "// minecraft-enchantment-render v" + VERSION + "\n// \n// " + (await Bun.file("LICENSE.txt").text()).split("\n").join("\n// ");

const result = await Bun.build({
    entrypoints: ["./lib/index.js"],
    target: "browser",
    format: "esm",
    sourcemap: true,
    minify: false,
    throw: true,
    banner: BANNER,
    plugins: [
        {
            name: "Keep JSDocs",
            setup(build) {
                build.onLoad({ filter: /\.(js)$/ }, async ({ path }) => {
                    let text = await Bun.file(path).text();
                    let contents = text.replaceAll("/**", "/*!*");

                    return {
                        contents,
                        loader: "js",
                    };
                });
            },
        },
    ],
});

const output = await result.outputs[0].text()
await Bun.write(`minecraft-enchantment-render-${VERSION}.js`, output.replaceAll("/*!*", "/**"));

const minResult = await Bun.build({
    entrypoints: ["./lib/index.js"],
    target: "browser",
    format: "esm",
    sourcemap: false,
    minify: true,
    throw: true,
    banner: BANNER,
});
await Bun.write(`minecraft-enchantment-render-${VERSION}.min.js`, minResult.outputs[0]);

export {};
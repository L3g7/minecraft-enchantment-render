# minecraft-enchantment-render
A Minecraft WebGL renderer with focus on enchantments.

[![Preview](./example/preview.png)](https://l3g7.github.io/minecraft-enchantment-render/example/)
<br>

# [Full Example](https://l3g7.github.io/minecraft-enchantment-render/example/), [Documentation](https://l3g7.github.io/minecraft-enchantment-render/jsdoc/)

# Usage
```js
import { createRenderer, MODEL_CUBE } from "minecraft-enchantment-render-1.0.0.js";

createRenderer(document.querySelector("#exampleCanvas"), {
    modelType: MODEL_CUBE,
    textureURL: "./glass.png",
});
```
See [JSDoc](https://l3g7.github.io/minecraft-enchantment-render/jsdoc/) for details.

# Common Issues
<details>
<summary>My texture doesn't load when using an absolute URL / <code>DOMException: The operation is insecure</code></summary>
Loading textures from other servers may get blocked by the browser due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
Ensure that the right headers are set and you're using HTTPS.
</details>

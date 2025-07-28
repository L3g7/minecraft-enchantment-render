import { createRenderer, MODEL_ITEM, MODEL_CUBE, MODEL_SKULL_COMPACT, MODEL_SKULL_SKIN } from "./minecraft-enchantment-render-1.0.0.js";

let textures = {
    // https://mcasset.cloud/1.21.8/assets/minecraft/textures/item/wooden_sword.png
    woodenSword: "./textures/item_wooden_sword.png",
    // https://mcasset.cloud/1.21.8/assets/minecraft/textures/block/pumpkin_top.png
    // https://mcasset.cloud/1.21.8/assets/minecraft/textures/block/pumpkin_side.png
    // https://mcasset.cloud/1.21.8/assets/minecraft/textures/block/carved_pumpkin.png
    pumpkin: "./textures/cube_pumpkin.png",
    // https://mcasset.cloud/1.21.8/assets/minecraft/textures/block/glass.png
    glass: "./textures/cube_glass.png",
    // https://minecraft-heads.com/custom-heads/head/119984-bread
    skullCompact: "./textures/skull_compact.png",
    // https://minecraft-heads.com/custom-heads/head/113112-siamese-cat
    skullSkin: "./textures/skull_skin.png"
}

createRenderer(document.querySelector("#slot10"), {
    modelType: MODEL_ITEM,
    textureURL: textures.woodenSword,
});

createRenderer(document.querySelector("#slot11"), {
    modelType: MODEL_CUBE,
    textureURL: textures.pumpkin,
});

createRenderer(document.querySelector("#slot12"), {
    modelType: MODEL_CUBE,
    textureURL: textures.glass,
});

createRenderer(document.querySelector("#slot13"), {
    modelType: MODEL_SKULL_COMPACT,
    textureURL: textures.skullCompact,
    inInventory: true
});

createRenderer(document.querySelector("#slot14"), {
    modelType: MODEL_SKULL_SKIN,
    textureURL: textures.skullSkin,
    inInventory: true
});

createRenderer(document.querySelector("#slot15"), {
    modelType: MODEL_ITEM,
    textureURL: textures.woodenSword,
    enchanted: true
});

// All options:
createRenderer(document.querySelector("#slot16"), {
    modelType: MODEL_CUBE,
    textureURL: textures.pumpkin,
    inInventory: true,
    enchanted: true,
    glContext: {
        antialias: true
    }
});

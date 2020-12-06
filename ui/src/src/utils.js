const utils = {
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1))
}

export default utils
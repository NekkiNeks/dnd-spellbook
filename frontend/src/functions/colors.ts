const classColors: Record<string, string> = {
    artificer: "#ef767a",
    bard: "#986c6a",
    cleric: "#cc5803",
    druid: "#76b041",
    paladin: "#f4ac45",
    ranger: "#4a7856",
    sorcerer: "#197bbd",
    warlock: "#129490",
    wizard: "#8567fa"
}

const DEFAULT_COLOR = '#aaaaaa'

export function updateColorByClass(className: string) {
    const colorString = classColors[className]
    document.documentElement.style.setProperty('--class-color', colorString || DEFAULT_COLOR)
}

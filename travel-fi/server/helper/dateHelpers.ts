export function createDateString(date: string) {
    return new Date(date).toLocaleDateString('en-gb')
}

export function transformDate(date: string) {
    return createDateString(date).replaceAll("/", "-").split("-").map((i: string) => {
        if (i.length === 1) {
            return "0".concat(i)
        } else {
            return i
        }
    }).reverse().join("-")
}
export function transformPrice(p: string) {
    let newPrice = ''
    if (p.length > 9) {
        p = p.slice(0, p.length - (p.length - 9))
    }
    if (p.length == 0) {
        newPrice = '0.00'
    } else if (p.length == 1) {
        newPrice = '0.0'.concat(p)
    } else if (p.length == 2) {
        newPrice = '0.'.concat(p)
    } else {
        newPrice = [p.slice(0, p.length - 2), '.', p.slice(p.length - 2)].join('')
    }
    return newPrice
}

export function formatPrice(str: string) {
    const n = 3
    if (str.length == 0 || !str) {
        str = '000'
    }
    if (str.length > 5) {
        let firstPart = str.slice(0, str.length - 2)
        let secondPart = str.slice(str.length - 2)

        firstPart = firstPart.split('').reverse().join('')
        let strArr: string[] = []
        for (let i = 0; i < firstPart.length; i = i + 3) {
            strArr.push(firstPart.substring(i, i + n))
        }

        firstPart = strArr.join(',').split('').reverse().join('')
        return firstPart.concat('.').concat(secondPart);
    } else {
        return [str.slice(0, str.length - 2), '.', str.slice(str.length - 2)].join('')
    }

}
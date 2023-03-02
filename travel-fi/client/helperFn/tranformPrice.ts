export default function transformPrice(p: string) {
    let newPrice = ''
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
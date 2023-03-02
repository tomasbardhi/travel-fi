import { Prisma } from '@prisma/client'

export default function cleanPrice(price: Prisma.Decimal) {
    let cleanedPrice = price.toString()
    if (cleanedPrice === '0') {
        return ""
    }
    if (!cleanedPrice.includes('.')) {
        return cleanedPrice.concat('00')
    }
    if (cleanedPrice.at(cleanedPrice.length - 2) === '.') {
        cleanedPrice = cleanedPrice.concat('0')
    }
    cleanedPrice = cleanedPrice.replaceAll(".", "")
    return cleanedPrice
}
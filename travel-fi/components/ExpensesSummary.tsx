import { Experience } from '@prisma/client'
import styles from "@/styles/ExpensesSummary.module.scss"
import currency from "@/client/helperFn/currency"

function ExpensesSummary({ experiences }: { experiences: Experience[] }) {

    const expenses = experiences.reduce((prev: { [key: string]: number }, curr: Experience) => {
        if (!prev[curr.currency.toUpperCase()]) {
            prev[curr.currency.toUpperCase()] = 0
        }
        return { ...prev, [curr.currency.toUpperCase()]: Number((parseFloat(prev[curr.currency.toUpperCase()].toString()) + parseFloat(curr.price.toString())).toFixed(2)) }
    }, {})

    return (
        <div className={styles.main}>
            {
                Object.keys(expenses).length !== 0
                    ?
                    Object.keys(expenses).map((key) => {
                        return (
                            <div key={key} className={styles.container}>
                                <div>
                                    {
                                        currency.hasOwnProperty(key)
                                            ?
                                            <h1><span>{currency[key as keyof typeof currency].symbol + " "}</span>{expenses[key]}</h1>
                                            :
                                            <h1>{key + " " + expenses[key]}</h1>
                                    }
                                </div>
                            </div>
                        )
                    })
                    :
                    <></>
            }
        </div >
    )
}

export default ExpensesSummary
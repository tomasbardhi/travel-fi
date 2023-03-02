import { Experience } from '@prisma/client'

function ExpensesSummary({ experiences }: { experiences: Experience[] }) {

    const expenses = experiences.reduce((prev: { [key: string]: number }, curr: Experience) => {
        if (!prev[curr.currency.toUpperCase()]) {
            prev[curr.currency.toUpperCase()] = 0
        }
        return { ...prev, [curr.currency.toUpperCase()]: +prev[curr.currency.toUpperCase()] + +curr.price }
    }, {})

    return (
        <>
            {
                Object.keys(expenses).length !== 0
                    ?
                    Object.keys(expenses).map((key) => {
                        return (
                            <h1 key={key}>{expenses[key] + " " + key}</h1>
                        )
                    })
                    :
                    <h1>No expenses</h1>
            }
        </>
    )
}

export default ExpensesSummary
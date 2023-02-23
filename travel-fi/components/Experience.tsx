import { ExperienceType } from "@/models/experience"

function Experience(exp: ExperienceType) {

    return (
        <div style={{ display: "flex", margin: "30px", fontSize: "12px", justifyContent: "space-between", backgroundColor: "lightgray" }}>
            <h1>{exp.exp_id}</h1>
            <h1>{exp.exp_name}</h1>
            <h1>{exp.exp_price}</h1>
            <h1>{exp.exp_currency}</h1>
            <h1>{exp.exp_date}</h1>
        </div>
    )

}

export default Experience
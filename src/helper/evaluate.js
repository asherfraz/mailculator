import { create, all } from "mathjs";

const math = create(all, {});

export const standardEvaluate = (expression) => {
    try {
        if (expression.trim() === "") {
            return 0;
        }
        const evaluated = math.evaluate(expression);
        return evaluated;
    } catch (err) {
        console.log("Error evaluating expression:", err);
        return null;
    }
}

import { z } from "zod";

function issuesToErrors(issues) {
    return issues.reduce((errors, issue) => {
        const { path, message } = issue;
        errors[path[0]] = message;
        return errors;
    }, {});
}

export function extractSchema(schema, name) {
    const { shape } = schema;
    const extractedSchema = z.object({ [name]: shape[name] });
    return extractedSchema;
}

export function validateData(schema, data) {
    const validation = schema.safeParse(data);

    if (!validation.success) {
        const issues = validation.error.errors;
        const errors = issuesToErrors(issues);

        return { errors };
    }

    return { data: validation.data };
}

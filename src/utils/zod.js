export function issuesToErrors(issue) {
    return issue.reduce((acc, error) => {
        const { path, message } = error;
        acc[path[0]] = message;
        return acc;
    }, {});
}

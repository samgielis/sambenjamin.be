export function downloadJSON(fileName: string): Promise<any> {
    return fetch(fileName).then((response) => {
        return response.json();
    });
}
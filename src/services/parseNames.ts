interface iString {
    [key: string]: string;
}
export const parseNames = (string: string) => {
    const strings: iString = {
        name: "nome",
        telephone: "telefone"
    }
    return strings[string] || string;
}
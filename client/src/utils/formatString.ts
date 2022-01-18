export const s4t = (text: string) => {
    let result = text.toUpperCase();
    result = result.split(" ").join("_");
    return result;
};

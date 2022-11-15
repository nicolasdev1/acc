
export function generateRandomId(length: number) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function convertMonthsToYears(months: number) {
    if (months <= 11) {
        return months == 1 ? '1 mês' : `${months} meses`
    } else {
        let years: number = months / 12
        years = Math.floor(years)
        let rest = months % 12

        return rest == 0 ? years == 1 ? '1 ano' : `${years} anos`
        : rest == 1 ? `${years} ano(s) e ${rest} mês` : `${years} ano(s) e ${rest} meses`
    }
}
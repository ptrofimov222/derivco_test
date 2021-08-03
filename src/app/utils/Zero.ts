export class Zero {

    static addLeadingZero(input: string, length: number): string {
        while (input.length < length) {
            input = "0" + input;
        }
        return input;
    }
}

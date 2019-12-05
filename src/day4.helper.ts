
export const validPasswords = (range: number[], len: number): string[] => {
    let valid = [];

    for(let i = range[0]; i <= range[1]; i++) {
        let password = i.toString().split("").map(x => parseInt(x));
        if(isNonDecreasing(password) && hasDouble(password) && password.length === len) {
            valid.push(i.toString());
        }
    }

    return valid;
};


const isNonDecreasing = (password: number []): boolean => {
    let currentDigit = password[0];
    for(let i = 1; i < password.length; i++) {
        if(password[i] < currentDigit) {
            return false;
        }
        currentDigit = password[i];
    }

    return true;
};

const hasDouble = (password: number[]): boolean => {

    let currentDigit = password[0];
    for(let i = 1; i < password.length; i++) {
        if(password[i] == currentDigit) {
            return true;
        }
        currentDigit = password[i];
    }

    return false;
};


export const validPasswordsNoRepeating = (range: number[], len: number): string[] => {
    let valid = [];

    for(let i = range[0]; i <= range[1]; i++) {
        let password = i.toString().split("").map(x => parseInt(x));
        if(isNonDecreasing(password) && hasDoubleNoRepeating(password) && password.length === len) {
            valid.push(i.toString());
        }
    }

    return valid;
};

const hasDoubleNoRepeating = (password: number[]): boolean => {

    let currentDigit = password[0];
    let digitAppearance = 1;
    for(let i = 1; i < password.length; i++) {
        if(password[i] == currentDigit) {
            digitAppearance++;
        }
        else if(digitAppearance == 2){
            return true;
        }
        else {
            digitAppearance = 1;
        }
        currentDigit = password[i];
    }

    if(digitAppearance == 2) {
        return true;
    }

    return false;
};
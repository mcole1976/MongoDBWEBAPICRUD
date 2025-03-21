class Validator {
    static isValidDate(value) {
        if (!value) return false;
        const date = new Date(value);
        return !isNaN(date.getTime());
    }

    static isValidNumber(value) {
        if (value === null || value === undefined) return false;
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    static isEmptyString(value) {
        if (value === null || value === undefined) return true;
        return value.trim().length === 0;
    }

    static validate(data, rules) {
        const errors = {};

        for (const [key, rule] of Object.entries(rules)) {
            const value = data[key];

            switch (rule) {
                case 'date':
                    if (!this.isValidDate(value)) {
                        errors[key] = `Invalid date: ${value}`;
                    }
                    break;

                case 'number':
                    if (!this.isValidNumber(value)) {
                        errors[key] = `Invalid number: ${value}`;
                    }
                    break;

                case 'string':
                    if (this.isEmptyString(value)) {
                        errors[key] = `Empty string: ${value}`;
                    }
                    break;

                default:
                    errors[key] = `Unknown validation rule: ${rule}`;
                    break;
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }
}
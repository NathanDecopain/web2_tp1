export function initFormField() {
    return {
        value: "",
        success: false,
        error: false,
        message: ""
    }
}
export function setFormError(field = { success, error, message }, message) {
    field.success = false;
    field.error = true;
    field.message = message
}
export function clearFormError(field = { success, error, message }) {
    field.success = true;
    field.error = false;
    field.message = "";
}
// Field checks
export function checkFormField(field = { value, success, error, message }, checks = [{condition, message}]) {
    for (const check of checks) {
        const condition = check.condition;
        const message = check.message;

        if (!condition(field.value)) {
            setFormError(field, message)
            return false;
        }
    }

    clearFormError(field);
    return true;
}

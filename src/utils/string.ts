function isEmptyOrNull(value: string): boolean {
    if (value === undefined || value === null || value.length === 0) return true;
    return false;
}

export default { isEmptyOrNull };

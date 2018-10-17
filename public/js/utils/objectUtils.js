export function ensureArray(obj) {
	if (Array.isArray(obj) === false) {
		return [obj];
	}
	return obj;
}
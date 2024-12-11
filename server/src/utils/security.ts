import xss from "xss";

export const sanitizeInput = (data: any) => {
	if (typeof data === "string") {
		return xss(data.trim());
	}

	if (typeof data === "object" && data !== null) {
		const sanitized = {};
		for (const [key, value] of Object.entries(data)) {
			sanitized[key] = sanitizeInput(value);
		}
		return sanitized;
	}

	return data;
};

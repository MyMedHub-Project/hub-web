export const redactPhoneOrEmail = (type: string, value: string) => {
	if (type === "phone") {
		// Keep first 3 digits and last 2 digits, replace the rest with asterisks
		const parts = value.split(" ");
		if (parts.length > 1) {
			// Handle country code format like "+234 8012345678"
			const countryCode = parts[0];
			const phoneNumber = parts[1];
			if (phoneNumber.length > 4) {
				const firstTwo = phoneNumber.substring(0, 2);
				const lastTwo = phoneNumber.substring(phoneNumber.length - 2);
				const middle = "*".repeat(phoneNumber.length - 4);
				return `${countryCode} ${firstTwo}${middle}${lastTwo}`;
			}
		}
		// Simple format without country code
		if (value.length > 4) {
			const firstTwo = value.substring(0, 2);
			const lastTwo = value.substring(value.length - 2);
			const middle = "*".repeat(value.length - 4);
			return `${firstTwo}${middle}${lastTwo}`;
		}
		return value.replace(/\d/g, "*");
	} else if (type === "email") {
		// For email, show first 2 characters of username and first 2 of domain
		const [username, domain] = value.split("@");
		if (username && domain) {
			const redactedUsername =
				username.length > 2
					? `${username.substring(0, 2)}${"*".repeat(username.length - 2)}`
					: username;

			const domainParts = domain.split(".");
			if (domainParts.length > 1) {
				const domainName = domainParts[0];
				const extension = domainParts.slice(1).join(".");
				const redactedDomain =
					domainName.length > 2
						? `${domainName.substring(0, 2)}${"*".repeat(domainName.length - 2)}`
						: domainName;

				return `${redactedUsername}@${redactedDomain}.${extension}`;
			}
		}
	}

	return value;
};

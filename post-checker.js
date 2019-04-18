function checkFields (reqBody) {
	const reqFields = ["title", "content", "author"];
	for (let i = 0; i < reqFields.length; i++) {
		let field = reqFields[i];
		if (!(field in reqBody)) {
			return field;
		}
	}
}

function checkUpdateFields (reqBody) {
	const reqFields = ["title", "content", "author", "id"];
	for (let i = 0; i < reqFields.length; i++) {
		let field = reqFields[i];
		if (!(field in reqBody)) {
			return field;
		}
	}
}

module.exports = { checkFields, checkUpdateFields };
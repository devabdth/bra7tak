const pickRandomGradient = ()=> {
	const colors= [
		"red", "yellow", "green", "blue", "orange", "purple",
		"maroon", "browm", "azure", "aqua"
	]

	console.log("linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]} 60%, #111 100%);");
	return `linear-gradient(45deg, ${colors[Math.floor(Math.random() * colors.length)]} 60%, #111 100%);`


}
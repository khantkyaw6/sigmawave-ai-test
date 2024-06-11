import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "User System Server",
			version: "1.0.0",
			description: "A user management system server.",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Local server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["./src/routes/dashboard/api_docs/*.js"],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };

declare module 'swagger-jsdoc' {
    import { OpenAPIObject } from 'openapi3-ts';

    interface SwaggerJSDocOptions {
        definition: OpenAPIObject;
        apis: string[];
    }

    export default function swaggerJSDoc(
        options: SwaggerJSDocOptions
    ): OpenAPIObject;
}

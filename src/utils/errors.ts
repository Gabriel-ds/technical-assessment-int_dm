export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    static badRequest(message: string) {
        return new AppError(message, 400);
    }

    static notFound(message: string) {
        return new AppError(message, 404);
    }

    static internalServerError(message: string) {
        return new AppError(message, 500);
    }

    // Adicione outros métodos de erro conforme necessário
}
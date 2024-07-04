export interface IRepository<T> {
    create(object: T): Promise<T>
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
}

export interface IServiceRepository<T> {
    
}
export interface validatorRule {
    validate(input: string | number): boolean;
    getMessage(): string; 
}

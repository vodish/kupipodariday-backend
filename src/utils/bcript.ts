import bcrypt from "bcrypt";

// хешировать строку
export function bcryptHash(password: string) {
    return bcrypt.hashSync(password, 'secret_salt');
}

// сравнить строку пароля со стракой хеша
export function bcryptCheck(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

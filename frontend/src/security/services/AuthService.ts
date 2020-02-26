

export interface User {
    name: string
}

export class AuthService {

    private current: User | null = null;

    public isAuthorized(): boolean {

        return this.current !== null;
    }

    public currentUser(): User | null {
        if (!this.isAuthorized()) {
            return null;
        }

        return this.current;
    }

    public authorize(name: string) {
        this.current = { name: name };

        return true;
    }

}
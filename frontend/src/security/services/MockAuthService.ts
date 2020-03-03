import { User, AuthService } from "./AuthService";

export class MockAuthService extends AuthService {

    public isAuthorized(): boolean {

        return true;
    }

    public currentUser(): User | null {

        return { name: "test" };
    }

    public authorize(name: string) {
        return true;
    }

}
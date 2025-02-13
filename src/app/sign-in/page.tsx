import { redirectIfAuthenticated } from "~/server/actions/auth-actions";
import { LoginForm } from "../_components/login-form";

export default async function SigninPage() {
    await redirectIfAuthenticated()
    return <>
        <div className="flex min-h-screen justify-center items-center">
            <LoginForm />
        </div>
    </>
}
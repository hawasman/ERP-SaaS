import SignIn from "~/app/_components/sign-in";
import { redirectIfAuthenticated } from "~/server/actions/auth-actions";

export default async function SigninPage() {
    await redirectIfAuthenticated()
    return <>
        <div className="flex min-h-screen justify-center items-center">
            <SignIn />
        </div>
    </>
}
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { loginWithGoogleFromLoginPage } from "@/lib/login-google"

export default function LoginForm() {
  // 111827
  return (
    <Card className="mx-auto max-w-md bg-[#1e2739] text-gray-50">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Login to continue to Active Apply
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form className="grid gap-4">
            <Button
              variant="blue"
              className="w-full"
              type="submit"
              formAction={loginWithGoogleFromLoginPage}
            >
              <Icons.google className="mr-2 h-4 w-4" /> Login with Google
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

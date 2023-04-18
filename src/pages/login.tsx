import { type GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Icons } from "~/components/ui/icons";
import { getServerAuthSession } from "~/server/auth";

const Login = () => {
  const loginWithDiscord = () => {
    void signIn("discord", {
      callbackUrl: "/channels/@me",
    });
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="p-2">
        <CardHeader className="text-center">
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            We&apos;re so excited to see you again!
          </CardDescription>
        </CardHeader>
        <CardContent className="gird gap-6">
          <Button className="w-full font-bold" onClick={loginWithDiscord}>
            <Icons.discord className="mr-2 h-6 w-6" />
            Login with discord
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/channels/@me",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

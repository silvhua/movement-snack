'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getUser } from "./_libs/clientCrud";
import { ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} 
  from "@clerk/nextjs";

import Button from "./_components/Button/Button";
import FormField from "./_components/FormField/FormField";
import { checkForSuccess } from "./_libs/ApiClient";
import Video from "./_components/Video/Video";

export default function Home() {
  const router = useRouter();
  const [userObject, setUserObject] = useState(null);

  const verifyUser = async (event) => {
    event.preventDefault();
    const formUsername = event.target.username.value || 'silvhua'; /////
    
    if (formUsername?.length > 1) {
      const response = await getUser(formUsername);
      if (checkForSuccess(response))  {
        setUserObject(response);
      } else {
        router.push('/redirect');
      }
    }
  }

  useEffect(() => {
    // useEffect is required to access localStorage
    if (userObject) {
      localStorage.setItem('userDetails', JSON.stringify(userObject));
      router.push('/dashboard');
    }
  }, [userObject]);

  const buttonProps = {
    text: 'Login',
    className: 'login-button'
  }

  const usernameInputProps = {
    type: 'text',
    className: 'input--wide',
    name: 'username',
    placeholder: 'username'
  }
  const passwordInputProps = {
    type: 'password',
    className: 'input--wide',
    name: 'password',
    placeholder: 'password'
  }
  return (
    <>
      <header className="header--login">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main className="main--flush-to-top">
        <section className="login">
          <div className="login__div">
            <form onSubmit={verifyUser}
            >
              <FormField formFieldProps={usernameInputProps} />
              <FormField formFieldProps={passwordInputProps} />
              <Button buttonProps={buttonProps} />
            </form>
            <p>
              Tip: If you just want to browse, leave the fields blank.
            </p>
          </div>
          <div className="login__div">
            {/* <h2 className="headline6">Demo Video</h2> */}
            <Video
              src='./videos/app-demo.mp4'
              title='app demo video'
              className='app-demo__video'
              poster='./images/dashboard-page.png'
            />
          </div>
        </section>
      </main>
    </>
  );
}

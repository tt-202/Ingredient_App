'use server';

export async function signIn(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('Attempting sign in with:');
    console.log('Email:', email);
    console.log('Password:', password);

}

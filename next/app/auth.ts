'use server';

import { SignJWT, jwtVerify } from 'jose';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

const saltRounds = 10;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const secretKey = new TextEncoder().encode(jwtSecretKey);
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

// 30 minutes
const sessionDuration = 1000 * 60 * 30;

export async function hashPassword(password: string) {
  const bcrypt = require('bcrypt');
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return { message: hashedPassword, status: 200 };
  } catch(err) {
    return { message: 'Hashing failed.', status: 500 };
  }
}

export async function encrypt(payload: any) {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30 min from now')
      .sign(secretKey);
  } catch(err) {
    return '';
  }
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, secretKey, {
        algorithms: ['HS256']
    });
    return payload;
  } catch(err) {
    return {};
  }
}

export async function signIn(prevState: any, formData: FormData) {
  const bcrypt = require('bcrypt');
  try {
    if(!(await bcrypt.compare(formData.get('password') as string, adminPasswordHash as string)))
      throw new Error('Authentication failed.'); 

    const user = { name: 'Admin' };

    const expires = new Date(Date.now() + sessionDuration);
    const session = await encrypt({ user, expires });

    cookies().set('session', session, { expires, httpOnly: true, sameSite: 'strict', secure: true });
  } catch(err) {
    return { message: 'Forbidden.', status: 403 }; 
  }
}

export async function signOut() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  try {
    const session = cookies().get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
  } catch(err) {
    return {};
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const response = NextResponse.next();

  if(!session) return response;

  try {
    const decrypted = await decrypt(session);
    decrypted.expires = new Date(Date.now() + sessionDuration);

    response.cookies.set({
      name: 'session',
      value: await encrypt(decrypted),
      expires: decrypted.expires,
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });

    return response;
  } catch(err) {
    return null;
  }
}

export async function authorized(): Promise<boolean> {
  let isAuthorized = false;

  try {
    const session = (await getSession()) as { user?: { name: string } };
    console.log(session);
    if(session.user && session.user.name === 'Admin')
      isAuthorized = true;
  } catch(err) {}

  return isAuthorized;
}

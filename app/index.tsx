import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/auth/inicio_sesion" />;
}
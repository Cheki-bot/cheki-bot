import { ButtonComponent, InputComponent } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-between w-full max-w-5xl mb-8">
        <h1 className="text-4xl font-bold">Bienvenido a Cheki Bot</h1>
        <p className="mt-4">
          Tu asistente de IA para todo lo relacionado con el proceso electoral.
        </p>
      </div>
      <div className="w-1/2 flex gap-4">
        <InputComponent
          placeholder="Pregunta lo que quieras sobre el proceso electoral"
          alt="Buscar"
        />
        <ButtonComponent>Consultar</ButtonComponent>
      </div>
    </main>
  );
}

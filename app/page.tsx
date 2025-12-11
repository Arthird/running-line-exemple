import RunningLine from "@/components/RunningLine";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen bg-emerald-900 flex-1 flex-row relative">
        <div className="p-3 space-y-2">
          <h1 className="font-extrabold text-3xl text-white mb-1">
            Просто заголовок как пример
          </h1>
          <p className="text-justify">
            Пример какой-то маленькой статьи про похудение в условиях
            бесконечного массанабора и сохранения сырной диеты в сочетании с
            проживанием на 15-м этаже той самой многоэтажки
          </p>
          
        </div>
        <div className="text-white p-1 bg-green-950 absolute bottom-0 w-dvw">
          <RunningLine>
            <p>Лол прикол пипец как лол просто кек мемный</p>
          </RunningLine>
        </div>
      </main>
    </div>
  );
}

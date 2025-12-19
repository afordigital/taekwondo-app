export const Exams = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="p-4 bg-white rounded-lg shadow-sm">
          <h2 className="mb-2 font-semibold text-gray-800">Sección {i}</h2>
          <p className="text-sm text-gray-600">
            Haz clic en los tabs para ver la animación del indicador
          </p>
        </div>
      ))}
    </div>
  );
};

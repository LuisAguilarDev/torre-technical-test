import {
  FiExternalLink,
  FiBook,
  FiCpu,
  FiZap,
  FiNavigation,
} from "react-icons/fi";

const TrainingRecommendations = () => {
  return (
    <div className="space-y-8">
      {/* Sección de Ruta de Aprendizaje y Consejos */}
      <div className="rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">
          Ruta de Aprendizaje Prioritaria
        </h2>
        <p className="text-text-primary mb-6">
          Concéntrate en las habilidades para cerrar primero las brechas más
          grandes. Ordena los recursos según su efectividad para tu nivel
          actual.
        </p>
        <h3 className="text-lg font-semibold text-text-primary mb-3">
          💡 Consejos de Aprendizaje
        </h3>
        <ul className="space-y-2 text-text-primary">
          <li className="flex items-start gap-3">
            <span className="text-text-primary mt-1">•</span>
            <span>
              Enfócate en una habilidad a la vez para una mejor retención.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-text-primary mt-1">•</span>
            <span>
              Practica inmediatamente después de aprender nuevos conceptos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-text-primary mt-1">•</span>
            <span>Establece metas semanales para seguir tu progreso.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-text-primary mt-1">•</span>
            <span>Únete a comunidades para aprender de otros.</span>
          </li>
        </ul>
      </div>

      {/* Nueva Sección: Herramientas de IA */}
      <div className="rounded-lg shadow-sm border p-6 ">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-text-primary mb-4">
          <FiCpu className="text-text-primary" />
          <span>Herramientas de IA para Potenciar tu Aprendizaje</span>
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <FiBook className="text-text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-text-primary">
                Usa NotebookLM como tu asistente de investigación
              </h4>
              <p className="text-text-primary">
                Sube tus documentos, apuntes y fuentes. NotebookLM te ayudará a
                generar resúmenes, explicar conceptos complejos y encontrar
                información clave en tus propios materiales de estudio.
              </p>
              <a
                href="https://notebooklm.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline inline-flex items-center gap-1 mt-1"
              >
                Ir a NotebookLM <FiExternalLink size={14} />
              </a>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <FiZap className="text-text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-text-primary">
                Acelera tu comprensión con Gemini
              </h4>
              <p className="text-text-primary">
                Usa Gemini como un tutor personal para resolver dudas, generar
                ejemplos de código, brainstorm de ideas para proyectos o pedir
                que te explique temas difíciles con analogías simples.
              </p>
              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline inline-flex items-center gap-1 mt-1"
              >
                Probar Gemini <FiExternalLink size={14} />
              </a>
            </div>
          </li>
        </ul>
      </div>

      {/* Nueva Sección: Plan de Carrera con IA */}
      <div className="rounded-lg shadow-sm border border-green-200  p-6">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-text-primary mb-4">
          <FiNavigation className="text-text-primary" />
          <span>Diseña tu Plan de Carrera con IA</span>
        </h3>
        <p className="text-text-primary">
          Utiliza un asistente de IA como Gemini para actuar como tu mentor de
          carrera. Pídele que te ayude a crear una hoja de ruta personalizada.
          <br />
          <strong className="font-semibold">Ejemplo de prompt:</strong>
          <span className="font-mono text-sm  text-text-primary p-1 rounded">
            "Actúa como un experto en desarrollo de software. Quiero convertirme
            en un desarrollador Frontend Senior en 2 años. Crea un plan de
            estudio trimestral que incluya habilidades técnicas, blandas y
            proyectos para mi portafolio."
          </span>
        </p>
      </div>
    </div>
  );
};

export default TrainingRecommendations;
